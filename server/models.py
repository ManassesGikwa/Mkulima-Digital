# from flask_sqlalchemy import SQLAlchemy
# from datetime import datetime
# from sqlalchemy.orm import relationship

# db = SQLAlchemy()

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     created_at = db.Column(db.DateTime, default=datetime.utcnow)
#     profile_picture = db.Column(db.String)
#     password = db.Column(db.String)
#     email = db.Column(db.String, unique=True)
#     username = db.Column(db.String, unique=True)
#     role = db.Column(db.String)  # Add role field
    
#     blog_posts = db.relationship('BlogPost', backref='author', lazy=True)
#     communities = db.relationship('Community', backref='creator', lazy=True)
#     experts = db.relationship('Expert', backref='user', lazy=True)
#     messages_sent = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)
#     messages_received = db.relationship('Message', foreign_keys='Message.receiver_id', backref='receiver', lazy=True)
#     comments = db.relationship('Comment', backref='user', lazy=True)
#     liked_posts = db.relationship('Like', backref='liked_user', lazy=True)  # Adjusted backref name

#     def to_dict(self):
#         return{
#             'id': self.id,
#             'created_at': self.created_at.isoformat(),
#             'profile_picture': self.profile_picture,
#             'email': self.email,
#             'username': self.username
#         }


# class BlogPost(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     title = db.Column(db.String)
#     content = db.Column(db.String)
#     image = db.Column(db.String)
#     created_at = db.Column(db.DateTime)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     expert_id = db.Column(db.Integer, db.ForeignKey('expert.id'), nullable=False)

#     expert = db.relationship('Expert', backref='blog_posts', lazy=True)
    
#     comments = db.relationship('Comment', backref='blog_post', lazy=True)
#     likes = db.relationship('Like', backref='liked_blog_post', lazy=True,overlaps="blog_post,likes")

#     def to_dict(self):
#         # Calculate the total number of comments for this blog post
#         total_comments = len(self.comments)

#         # Query the database to count the total number of likes for this blog post
#         total_likes = Like.query.filter_by(blog_post_id=self.id).count()
#         return {
#             'id': self.id,
#             'title': self.title,
#             'content': self.content,
#             'image': self.image,
#             'created_at': self.created_at.isoformat(),
#             'total_comments': total_comments,
#             'total_likes': total_likes
#         }

# class Community(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     description = db.Column(db.String)
#     image = db.Column(db.String)
#     created_at = db.Column(db.DateTime)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'description': self.description,
#             'image': self.image,
#             'created_at': self.created_at.isoformat()
#         }

# class Expert(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String)
#     expertise_area = db.Column(db.String)
#     bio = db.Column(db.Text)
#     image = db.Column(db.String)
#     created_at = db.Column(db.DateTime)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'expertise_area': self.expertise_area,
#             'bio': self.bio,
#             'image': self.image,
#             'created_at': self.created_at.isoformat()
#         }

# class Message(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.String)
#     sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     created_at = db.Column(db.DateTime)

    

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'content': self.content,
#             'sender_id': self.sender_id,
#             'receiver_id': self.receiver_id,
#             'created_at': self.created_at.isoformat()
#         }

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     content = db.Column(db.String)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
#     created_at = db.Column(db.DateTime)

#     blog_post = relationship("BlogPost", back_populates="comments")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'content': self.content,
#             'created_at': self.created_at.isoformat(),
#             'user_id': self.user_id,
#             'blog_post_id': self.blog_post_id
#         }

# class Like(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
#     total = db.Column(db.Integer, nullable=False)

#     user = db.relationship('User', backref=db.backref('likes', lazy=True))
#     blog_post = db.relationship('BlogPost', backref='liked_blog_post', lazy=True, overlaps="likes,liked_blog_post")

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'created_at': self.created_at.isoformat(),
#             'user_id': self.user_id,
#             'blog_post_id': self.blog_post_id,
#             'total': self.total
#         }

# class CommunityFollowers(db.Model):
#     __tablename__ = 'community_followers'

#     community_id = db.Column(db.Integer, db.ForeignKey('community.id'), primary_key=True)
#     follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
#     followed_at = db.Column(db.DateTime, default=datetime.utcnow)

#     community = db.relationship('Community', backref=db.backref('followers', lazy='dynamic'))
#     follower = db.relationship('User', backref=db.backref('followed_communities', lazy='dynamic'))

#     def to_dict(self):
#         return {
#             'community_id': self.community_id,
#             'follower_id': self.follower_id,
#             'followed_at': self.followed_at.isoformat()
#         }
# # Define Notification Model
# class Notification(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
#     type = db.Column(db.String)  # Type of notification (e.g., 'blog_post', 'new_expert', 'message')
#     content = db.Column(db.String)
#     read = db.Column(db.Boolean, default=False)
#     timestamp = db.Column(db.DateTime, default=datetime.utcnow)

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'user_id': self.user_id,
#             'type': self.type,
#             'content': self.content,
#             'read': self.read,
#             'timestamp': self.timestamp
#         }
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.orm import relationship

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    profile_picture = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, unique=True)
    role = db.Column(db.String)  # Add role field

    blog_posts = db.relationship('BlogPost', backref='author', lazy=True)
    communities = db.relationship('Community', backref='creator', lazy=True)
    experts = db.relationship('Expert', backref='user', lazy=True)
    messages_sent = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)
    messages_received = db.relationship('Message', foreign_keys='Message.receiver_id', backref='receiver', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    likes = db.relationship('Like', backref='liked_user', lazy=True)  # Adjusted backref name

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at.isoformat(),
            'profile_picture': self.profile_picture,
            'email': self.email,
            'username': self.username
        }

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    expert_id = db.Column(db.Integer, db.ForeignKey('expert.id'), nullable=False)

    expert = db.relationship('Expert', back_populates='blog_posts', lazy=True)
    comments = db.relationship('Comment', back_populates='blog_post', lazy=True)
    likes = db.relationship('Like', back_populates='blog_post', lazy=True)

    def to_dict(self):
        # Calculate the total number of comments for this blog post
        total_comments = len(self.comments)
        # Query the database to count the total number of likes for this blog post
        total_likes = Like.query.filter_by(blog_post_id=self.id).count()
        return {
            'id': self.id,
            'title': self.title,
            'content': self.content,
            'image': self.image,
            'created_at': self.created_at.isoformat(),
            'total_comments': total_comments,
            'total_likes': total_likes
        }

class Community(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'created_at': self.created_at.isoformat()
        }

class Expert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    expertise_area = db.Column(db.String)
    bio = db.Column(db.Text)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    blog_posts = db.relationship('BlogPost', back_populates='expert', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'expertise_area': self.expertise_area,
            'bio': self.bio,
            'image': self.image,
            'created_at': self.created_at.isoformat()
        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'created_at': self.created_at.isoformat()
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    blog_post = db.relationship('BlogPost', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id,
            'blog_post_id': self.blog_post_id
        }

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    total = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='likes')
    blog_post = db.relationship('BlogPost', back_populates='likes')

    def to_dict(self):
        return {
            'id': self.id,
            'created_at': self.created_at.isoformat(),
            'user_id': self.user_id,
            'blog_post_id': self.blog_post_id,
            'total': self.total
        }

class CommunityFollowers(db.Model):
    __tablename__ = 'community_followers'

    community_id = db.Column(db.Integer, db.ForeignKey('community.id'), primary_key=True)
    follower_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    followed_at = db.Column(db.DateTime, default=datetime.utcnow)

    community = db.relationship('Community', backref=db.backref('followers', lazy='dynamic'))
    follower = db.relationship('User', backref=db.backref('followed_communities', lazy='dynamic'))

    def to_dict(self):
        return {
            'community_id': self.community_id,
            'follower_id': self.follower_id,
            'followed_at': self.followed_at.isoformat()
        }

# Define Notification Model
class Notification(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    type = db.Column(db.String)  # Type of notification (e.g., 'blog_post', 'new_expert', 'message')
    content = db.Column(db.String)
    read = db.Column(db.Boolean, default=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'type': self.type,
            'content': self.content,
            'read': self.read,
            'timestamp': self.timestamp
        }