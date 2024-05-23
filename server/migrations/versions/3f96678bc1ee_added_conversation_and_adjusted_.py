from alembic import op
import sqlalchemy as sa


revision = '3f96678bc1ee'
down_revision = 'bf80ffcbda36'
branch_labels = None
depends_on = None


def upgrade():
    # Check if the _alembic_tmp_message table exists
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if not inspector.has_table('_alembic_tmp_message'):
        # Create _alembic_tmp_message table
        with op.batch_alter_table('message', schema=None) as batch_op:
            batch_op.add_column(sa.Column('conversation_id', sa.Integer(), nullable=False))
            batch_op.create_foreign_key('fk_message_conversation_id', 'conversation', ['conversation_id'], ['id'])
    else:
        # Modify existing _alembic_tmp_message table
        with op.batch_alter_table('_alembic_tmp_message', schema=None) as batch_op:
            batch_op.alter_column('conversation_id', existing_type=sa.Integer(), nullable=False)

    # Check if the conversation table exists
    if not inspector.has_table('conversation'):
        # Create conversation table
        op.create_table('conversation',
            sa.Column('id', sa.Integer(), nullable=False),
            sa.Column('sender_id', sa.Integer(), nullable=False),
            sa.Column('receiver_id', sa.Integer(), nullable=False),
            sa.ForeignKeyConstraint(['receiver_id'], ['user.id'], name='fk_conversation_receiver_id'),
            sa.ForeignKeyConstraint(['sender_id'], ['user.id'], name='fk_conversation_sender_id'),
            sa.PrimaryKeyConstraint('id')
        )

    # Check if the community_likes table exists
    if inspector.has_table('community_likes'):
        # Drop the community_likes table if it exists
        op.drop_table('community_likes')

    # Create community_likes table
    op.create_table('community_likes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('community_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['community_id'], ['community.id'], name='fk_community_likes_community_id'),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], name='fk_community_likes_user_id'),
        sa.PrimaryKeyConstraint('id')
    )

    # Check if the expert_followers table exists
    if inspector.has_table('expert_followers'):
        # Drop the expert_followers table if it exists
        op.drop_table('expert_followers')

    # Create the expert_followers table
    op.create_table('expert_followers',
        sa.Column('expert_id', sa.Integer(), nullable=False),
        sa.Column('follower_id', sa.Integer(), nullable=False),
        sa.Column('followed_at', sa.DateTime(), nullable=True),
        sa.PrimaryKeyConstraint('expert_id', 'follower_id'),
        sa.ForeignKeyConstraint(['expert_id'], ['expert.id'], name='fk_expert_followers_expert_id'),
        sa.ForeignKeyConstraint(['follower_id'], ['user.id'], name='fk_expert_followers_follower_id')
    )

def downgrade():
    # Check if the conversation table exists
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    if inspector.has_table('conversation'):
        # Drop conversation table if it exists
        op.drop_table('conversation')

    # Check if the community_likes table exists
    if inspector.has_table('community_likes'):
        # Drop the community_likes table if it exists
        op.drop_table('community_likes')

    # Check if the expert_followers table exists
    if inspector.has_table('expert_followers'):
        # Drop the expert_followers table if it exists
        op.drop_table('expert_followers')

    # Remove conversation_id column and its foreign key from message table
    with op.batch_alter_table('message', schema=None) as batch_op:
        batch_op.drop_column('conversation_id')
        batch_op.drop_constraint('fk_message_conversation_id', type_='foreignkey')
