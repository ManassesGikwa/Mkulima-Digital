"""Add Conversation model and message relationship

Revision ID: f0270406da2a
Revises: 3f96678bc1ee
Create Date: 2024-05-22 22:15:48.692244

"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.exc import OperationalError


# revision identifiers, used by Alembic.
revision = 'f0270406da2a'
down_revision = '3f96678bc1ee'
branch_labels = None
depends_on = None


def upgrade():
    # Add 'conversation_id' column to 'message' table
    with op.batch_alter_table('message') as batch_op:
        batch_op.add_column(sa.Column('conversation_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key('fk_message_conversation_id', 'conversation', ['conversation_id'], ['id'])
        
    # Create 'conversation' table
    try:
        op.create_table(
            'conversation',
            sa.Column('id', sa.Integer(), primary_key=True),
            sa.Column('title', sa.String(), nullable=False)
        )
    except OperationalError as e:
        print("Error:", e)

def downgrade():
    # Drop 'conversation_id' column from 'message' table
    with op.batch_alter_table('message') as batch_op:
        batch_op.drop_constraint('fk_message_conversation_id', type_='foreignkey')
        batch_op.drop_column('conversation_id')

    # Drop Conversation table
    op.drop_table('conversation')
