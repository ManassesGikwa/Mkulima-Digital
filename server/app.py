from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, CommunityFollowers,Notification
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import os
import jwt.exceptions
from datetime import datetime
from werkzeug.security import generate_password_hash

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'secret key'
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')

db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

class UserRegistration(Resource):
    def post(self):
        try:
            data = request.json
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            role = data.get('role')  # New field for role

            if not username or not email or not password or not role:
                return {'message': 'Username, email, password, and role are required'}, 400

            # Check if the username or email already exists
            if User.query.filter_by(username=username).first():
                return {'message': 'Username already exists'}, 400

            if User.query.filter_by(email=email).first():
                return {'message': 'Email already exists'}, 400

            # Hash the password before storing it
            hashed_password = generate_password_hash(password)
            
            if role == 'expert':
                new_expert = Expert(username=username, email=email, password=hashed_password)
                db.session.add(new_expert)
            else:
                new_user = User(username=username, email=email, password=hashed_password, role=role)
                db.session.add(new_user)

            db.session.commit()

            return {'message': 'User created successfully!'}, 201
        except jwt.exceptions.DecodeError as e:
            return {'message': 'Registration failed. Error: {}'.format(str(e))}, 500
        
class UserLogin(Resource):
    def post(self):
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity=user.id)
            return {'access_token': access_token}, 200
        else:
            return {'message': 'Invalid username or password'}, 401

class BlogPosts(Resource):
    def get(self):
        blogposts = BlogPost.query.all()
        serialized_blogposts = [blogpost.to_dict() for blogpost in blogposts]
        return jsonify(serialized_blogposts)

    def post(self):
        data = request.json
        new_blogpost = BlogPost(**data)
        db.session.add(new_blogpost)
        db.session.commit()
        return jsonify(new_blogpost.to_dict()), 201

class BlogPostDetails(Resource):
    def get(self, id):
        blogpost = BlogPost.query.get_or_404(id)
        return jsonify(blogpost.to_dict())
   
    def put(self, id):
        blogpost = BlogPost.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(blogpost, key, value)
        db.session.commit()
        return jsonify(blogpost.to_dict())

    def delete(self, id):
        blogpost = BlogPost.query.get_or_404(id)
        db.session.delete(blogpost)
        db.session.commit()
        return jsonify({'message': 'Blog post deleted successfully'})

class Communities(Resource):
    def get(self):
        communities = Community.query.all()
        serialized_communities = [community.to_dict() for community in communities]
        return jsonify(serialized_communities)

    def post(self):
        data = request.json
        new_community = Community(**data)
        db.session.add(new_community)
        db.session.commit()

        # Notify all users about the new community
        self.notify_all_users('new_community', f"A new community '{new_community.name}' has been created")

        return jsonify(new_community.to_dict()), 201

    def notify_all_users(self, notification_type, content):
        users = User.query.all()
        for user in users:
            notification = Notification(
                user_id=user.id,
                type=notification_type,
                content=content
            )
            db.session.add(notification)
        db.session.commit()

class CommunityDetails(Resource):
    def get(self, id):
        community = Community.query.get_or_404(id)
        return jsonify(community.to_dict())

    def put(self, id):
        community = Community.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(community, key, value)
        db.session.commit()
        return jsonify(community.to_dict())

    def delete(self, id):
        community = Community.query.get_or_404(id)
        db.session.delete(community)
        db.session.commit()
        return jsonify({'message': 'Community deleted successfully'})

class CommunityFollowersResource(Resource):
    def get(self):
        followers = CommunityFollowers.query.all()
        return jsonify([follower.to_dict() for follower in followers])

    def post(self):
        data = request.get_json()
        new_follower = CommunityFollowers(
            community_id=data['community_id'],
            user_id=data['user_id']
        )
        db.session.add(new_follower)
        db.session.commit()
        return new_follower.to_dict(), 201

    def delete(self, id):
        follower = CommunityFollowers.query.get(id)
        if follower:
            db.session.delete(follower)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Follower not found'}, 404


# Expert Resources
class Experts(Resource):
    def get(self):
        experts = Expert.query.all()
        serialized_experts = [expert.to_dict() for expert in experts]
        return jsonify(serialized_experts)

    def post(self):
        data = request.json
        new_expert = Expert(**data)
        db.session.add(new_expert)
        db.session.commit()
        return jsonify(new_expert.to_dict()), 201

class ExpertDetails(Resource):
    def get(self, id):
        expert = Expert.query.get_or_404(id)
        return jsonify(expert.to_dict())

    def put(self, id):
        expert = Expert.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(expert, key, value)
        db.session.commit()
        return jsonify(expert.to_dict())

    def delete(self, id):
        expert = Expert.query.get_or_404(id)
        db.session.delete(expert)
        db.session.commit()
        return jsonify({'message': 'Expert deleted successfully'})

    # Notify all users when a new expert is added
    def notify_all_users_new_expert(self, expert):
        content = f'A new expert {expert.name} has been added. Check out their profile!'
        self.notify_all_users('new_expert', content)

    # Notify all users when a new message is received
    def notify_all_users_new_message(self, message):
        content = f'You have received a new message: {message.content}'
        self.notify_all_users('message', content)

    # Notify all users
    def notify_all_users(self, notification_type, content):
        users = User.query.all()
        for user in users:
            notification = Notification(
                user_id=user.id,
                type=notification_type,
                content= content
            )
            db.session.add(notification)

class MessageDetails(Resource):
    def get(self, user_id):
        messages = Message.query.filter_by(sender_id=user_id).all()
        return [message.to_dict() for message in messages]

    def post(self):
        data = request.get_json()
        new_message = Message(
            sender_id=data['sender_id'],
            receiver_id=data['receiver_id'],
            content=data['content'],
            created_at=datetime.utcnow()
        )
        db.session.add(new_message)
        db.session.commit()

        # Notify all users about the new message
        expert_details = ExpertDetails()
        expert_details.notify_all_users_new_message(new_message)

        return new_message.to_dict(), 201

    def put(self, message_id):
        data = request.get_json()
        message = Message.query.get(message_id)
        if message:
            message.content = data['content']
            db.session.commit()
            return message.to_dict(), 200
        else:
            return {'error': 'Message not found'}, 404

    def delete(self, message_id):
        message = Message.query.get(message_id)
        if message:
            db.session.delete(message)
            db.session.commit()
            return '', 204
        else:
            return {'error': 'Message not found'}, 404
        
# Comment Resources
class Comments(Resource):
    def get(self):
        comments = Comment.query.all()
        serialized_comments = [comment.to_dict() for comment in comments]
        return jsonify(serialized_comments)

    def post(self):
        data = request.json
        new_comment = Comment(**data)
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict()), 201

class CommentDetails(Resource):
    def get(self, id):
        comment = Comment.query.get_or_404(id)
        return jsonify(comment.to_dict())

    def put(self, id):
        comment = Comment.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(comment, key, value)
        db.session.commit()
        return jsonify(comment.to_dict())

    def delete(self, id):
        comment = Comment.query.get_or_404(id)
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted successfully'})

class Likes(Resource):
    def get(self):
        likes = Like.query.all()
        serialized_likes = [like.to_dict() for like in likes]
        return jsonify(serialized_likes)

    def post(self):
        data = request.json
        post_id = data.get('blog_post_id')
        user_id = data.get('user_id')
        
        # Check if both post_id and user_id are provided
        if not (post_id and user_id):
            return jsonify({'error': 'Both post_id and user_id are required'}), 400
        
        # Check if the blog post and user exist
        post = BlogPost.query.get(post_id)
        if not post:
            return jsonify({'error': 'Blog post not found'}), 404
        user = User.query.get(user_id)
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        # Check if the user has already liked the post
        existing_like = Like.query.filter_by(user_id=user_id, blog_post_id=post_id).first()
        if existing_like:
            return jsonify({'message': 'User already liked this post'}), 400
        
        # Create a new Like instance
        new_like = Like(user_id=user_id, blog_post_id=post_id, created_at=datetime.utcnow())
        
        # Add the like to the database session and commit
        db.session.add(new_like)
        db.session.commit()
        
        return jsonify({'message': 'Post liked successfully'}), 201

class LikeDetails(Resource):
    def get(self, id):
        like = Like.query.get_or_404(id)
        return jsonify(like.to_dict())

    def put(self, id):
        like = Like.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(like, key, value)
        db.session.commit()
        return jsonify(like.to_dict())

    def delete(self, id):
        like = Like.query.get_or_404(id)
        db.session.delete(like)
        db.session.commit()
        return jsonify({'message': 'Like deleted successfully'})
class Users(Resource):
    def get(self):
        users = User.query.all()
        serialized_users =  [user.to_dict() for user in users]
        return jsonify(serialized_users)

    def post(self):
        data = request.json
        new_user = User(**data)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(new_user.to_dict()), 201

class UserDetails(Resource):
    def get(self, id):
        user = User.query.get_or_404(id)
        return jsonify(user.to_dict())

    def put(self, id):
        user = User.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return jsonify(user.to_dict())

    def delete(self, id):
        user = User.query.get_or_404(id)
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    
class CommunityFollowersResource(Resource):
    def get(self, community_id):
        # Query the database to retrieve followers of the specified community
        followers = CommunityFollowers.query.filter_by(community_id=community_id).all()

        # Serialize the follower data into JSON format
        serialized_followers = [follower.to_dict() for follower in followers]

        # Return the serialized follower data as the response
        return jsonify(serialized_followers)
class BlogPostCommentsResource(Resource):
    def get(self, blogpost_id):
        # Query the database to retrieve comments associated with the specified blog post
        comments = Comment.query.filter_by(blog_post_id=blogpost_id).all()

        # Serialize the comment data into JSON format
        serialized_comments = [comment.to_dict() for comment in comments]

        # Return the serialized comment data as the response
        return jsonify(serialized_comments)

class BlogPostLikes(Resource):
    def get(self, blog_post_id):
        # Query the database to retrieve likes associated with the specified blog post
        likes = Like.query.filter_by(blog_post_id=blog_post_id).all()

        # Serialize the likes into JSON format
        serialized_likes = [like.to_dict() for like in likes]

        # Return the serialized likes as the response
        return jsonify(serialized_likes)

class ExpertBlogPosts(Resource):
    def get(self, expert_id):
        # Query the database to retrieve blog posts associated with the specified expert
        blogposts = BlogPost.query.filter_by(user_id=expert_id).all()

        # Serialize the blog post data into JSON format
        serialized_blogposts = [blogpost.to_dict() for blogpost in blogposts]

        # Return the serialized blog post data as the response
        return jsonify(serialized_blogposts)

    def post(self, expert_id):
        data = request.json
        title = data.get('title')
        content = data.get('content')

        if not title or not content:
            return {'message': 'Title and content are required'}, 400

        # Create a new blog post
        new_blogpost = BlogPost(
            user_id=expert_id,
            title=title,
            content=content,
            created_at=datetime.utcnow()
        )
        db.session.add(new_blogpost)
        db.session.commit()

        # Notify users who follow the expert about the new blog post
        self.notify_followers(expert_id, 'blog_post', f"A new blog post '{title}' has been added by Expert ID: {expert_id}")

        # Return response indicating successful addition of blog post
        return jsonify(new_blogpost.to_dict()), 201

    def notify_followers(self, expert_id, notification_type, content):
        # Retrieve followers of the expert
        followers = CommunityFollowers.query.filter_by(expert_id=expert_id).all()

        # Create notification for each follower
        for follower in followers:
            notification = Notification(
                user_id=follower.user_id,
                type=notification_type,
                content=content
            )
            db.session.add(notification)
        
        # Commit the changes to the database
        db.session.commit()


class Notifications(Resource):
    def get(self, user_id=None, notification_id=None):
        if user_id is not None:
            # Retrieve notifications for the specified user
            notifications = Notification.query.filter_by(user_id=user_id).all()
            serialized_notifications = [notification.to_dict() for notification in notifications]
            return serialized_notifications, 200
        elif notification_id is not None:
            # Retrieve a specific notification by ID
            notification = Notification.query.get(notification_id)
            if notification:
                return notification.to_dict(), 200
            else:
                return {"message": "Notification not found"}, 404
        else:
            # Retrieve all notifications
            notifications = Notification.query.all()
            serialized_notifications = [notification.to_dict() for notification in notifications]
            return serialized_notifications, 200

    def post(self):
        data = request.json
        user_id = data.get('user_id')
        message_id = data.get('message_id')
        community_id = data.get('community_id')
        expert_id = data.get('expert_id')
        blog_post_id = data.get('blog_post_id')
        notification_type = data.get('type')
        content = data.get('content')

        if not user_id or not notification_type or not content:
            return {'message': 'User ID, type, and content are required'}, 400

        # Create a new notification
        new_notification = Notification(
            user_id=user_id,
            message_id=message_id,
            community_id=community_id,
            expert_id=expert_id,
            blog_post_id=blog_post_id,
            type=notification_type,
            content=content,
            timestamp=datetime.utcnow()
        )
        db.session.add(new_notification)
        db.session.commit()

        return jsonify(new_notification.to_dict()), 201

    def delete(self, notification_id):
        # Retrieve and delete the specified notification
        notification = Notification.query.get_or_404(notification_id)
        db.session.delete(notification)
        db.session.commit()
        return jsonify({'message': 'Notification deleted successfully'}), 200

def create_notification(user_id, notification_type, content, message_id=None, community_id=None, expert_id=None, blog_post_id=None):
    new_notification = Notification(
        user_id=user_id,
        type=notification_type,
        content=content,
        message_id=message_id,
        community_id=community_id,
        expert_id=expert_id,
        blog_post_id=blog_post_id,
        timestamp=datetime.utcnow()
    )
    db.session.add(new_notification)
    db.session.commit()

@app.route('/blog_posts', methods=['POST'])
def add_blog_post():
    data = request.json
    title = data.get('title')
    content = data.get('content')
    image = data.get('image')
    user_id = data.get('user_id')
    expert_id = data.get('expert_id')

    if not title or not content or not user_id or not expert_id:
        return {'message': 'Title, content, user_id, and expert_id are required'}, 400

    new_blog_post = BlogPost(
        title=title,
        content=content,
        image=image,
        user_id=user_id,
        expert_id=expert_id,
        created_at=datetime.utcnow()
    )
    db.session.add(new_blog_post)
    db.session.commit()

    # Send notification to the expert
    expert = Expert.query.get(expert_id)
    expert_notification_content = f"Your post '{title}' has been created successfully. Click here to view."
    create_notification(
        user_id=user_id,
        notification_type='blog_post',
        content=expert_notification_content,
        blog_post_id=new_blog_post.id,
        expert_id=expert_id
    )

    # Send notification to all users
    users = User.query.all()
    for user in users:
        if user.id != user_id:
            user_notification_content = f"Expert {expert.name} has added a new post. Click here to check it out."
            create_notification(
                user_id=user.id,
                notification_type='blog_post',
                content=user_notification_content,
                blog_post_id=new_blog_post.id,
                expert_id=expert_id
            )

    return jsonify(new_blog_post.to_dict()), 201

# Add routes for the Notifications resource
api.add_resource(Notifications, '/notifications', '/notifications/<int:id>', '/users/<int:user_id>/notifications')


# Add routes for all resources
api.add_resource(UserRegistration, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(BlogPosts, '/blogposts')
api.add_resource(BlogPostDetails, '/blogposts/<int:id>')
api.add_resource(Communities, '/communities')
api.add_resource(CommunityDetails, '/communities/<int:id>')
api.add_resource(Experts, '/experts')
api.add_resource(ExpertDetails, '/experts/<int:id>')
#api.add_resource(MessageDetails, '/messages')
api.add_resource(Comments, '/comments')
api.add_resource(CommentDetails, '/comments/<int:id>')
api.add_resource(Likes, '/likes')
api.add_resource(LikeDetails, '/likes/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(UserDetails, '/users/<int:id>')
api.add_resource(CommunityFollowersResource, '/communities/<int:community_id>/followers')
api.add_resource(BlogPostCommentsResource, '/blogposts/<int:blogpost_id>/comments')
api.add_resource(BlogPostLikes, '/blogposts/<int:blog_post_id>/likes')
api.add_resource(MessageDetails, '/messages', '/messages/<int:message_id>')
api.add_resource(ExpertBlogPosts, '/experts/<int:expert_id>/blogposts')


if __name__ == '__main__':
    app.run(debug=True, port=5555)
