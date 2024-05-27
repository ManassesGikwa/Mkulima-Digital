"""Add optional fields to Notification model

Revision ID: 22c54f6e6997
Revises: bf80ffcbda36
Create Date: 2024-05-18 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '22c54f6e6997'
down_revision = 'bf80ffcbda36'
branch_labels = None
depends_on = None

def upgrade():
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.add_column(sa.Column('message_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('community_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('expert_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('blog_post_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_notification_message', 'message', ['message_id'], ['id'])
        batch_op.create_foreign_key('fk_notification_community', 'community', ['community_id'], ['id'])
        batch_op.create_foreign_key('fk_notification_expert', 'expert', ['expert_id'], ['id'])
        batch_op.create_foreign_key('fk_notification_blog_post', 'blog_post', ['blog_post_id'], ['id'])

def downgrade():
    with op.batch_alter_table('notification', schema=None) as batch_op:
        batch_op.drop_constraint('fk_notification_blog_post', type_='foreignkey')
        batch_op.drop_constraint('fk_notification_expert', type_='foreignkey')
        batch_op.drop_constraint('fk_notification_community', type_='foreignkey')
        batch_op.drop_constraint('fk_notification_message', type_='foreignkey')
        batch_op.drop_column('blog_post_id')
        batch_op.drop_column('expert_id')
        batch_op.drop_column('community_id')
        batch_op.drop_column('message_id')
