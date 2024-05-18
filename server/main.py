# from flask import Flask
# from flask_cors import CORS
# from flask_migrate import Migrate
# from models import db, User, Like, BlogPost, Community, Expert, Message, Comment

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db.init_app(app)
# migrate = Migrate(app, db)
# CORS(app)

# @app.route('/')
# def index():
#     return '<h1>Project Server successfully created</h1>'

# if __name__ == '__main__':
#     app.run(port=5555, debug=True)

# from flask import Flask,jsonify
# from flask import Flask,jsonify,request
# from flask_restful import Resource, Api
# from flask_cors import CORS
# from flask_migrate import Migrate
# from models import db, User, Like, BlogPost, Community, Expert, Message, Comment
# from config import app 
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager, create_access_token
# import os
# import jwt.exceptions

# app = Flask(__name__)
# CORS(app, origins='http://localhost:3000')
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.secret_key = 'secret key'
# app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')

# db.init_app(app)
# migrate = Migrate(app, db)
# api = Api(app)
# bcrypt = Bcrypt(app)
# jwt = JWTManager(app)


# class UserRegistration(Resource):
#     def post(self):
#         try:
#             data = request.json
#             username = data.get('username')
#             email = data.get('email')
#             password = data.get('password')

#             if not username or not email or not password:
#                 return {'message': 'Username, email, and password are required'}, 400

#             # Check if the username or email already exists
#             if User.query.filter_by(username=username).first():
#                 return {'message': 'Username already exists'}, 400

#             if User.query.filter_by(email=email).first():
#                 return {'message': 'Email already exists'}, 400

#             # Hash the password before storing it
#             hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
#             new_user = User(username=username, email=email, password=hashed_password)
#             db.session.add(new_user)
#             db.session.commit()

#             return {'message': 'User created successfully!'}, 201
#         except jwt.exceptions.DecodeError as e:
#             return {'message': 'Registration failed. Error: {}'.format(str(e))}, 500

# class UserLogin(Resource):
#     def post(self):
#         data = request.json
#         username = data.get('username')
#         password = data.get('password')

#         user = User.query.filter_by(username=username).first()
#         if user and bcrypt.check_password_hash(user.password, password):
#             access_token = create_access_token(identity=user.id)
#             return {'access_token': access_token}, 200
#         else:
#             return {'message': 'Invalid username or password'}, 401


# # get all users 
# # Routes for User model
# @app.route('/users', methods=['GET'])
# def get_all_users():
#     users = User.query.all()
#     user_list = [user.to_dict() for user in users]
#     return jsonify(user_list)

# # get all BlogPost
# @app.route('/blogposts')
# @app.route('/users/<int:user_id>', methods=['GET'])
# def get_user(user_id):
#     user = User.query.get_or_404(user_id)
#     return jsonify(user.to_dict())

# @app.route('/users', methods=['POST'])
# def create_user():
#     data = request.json
#     new_user = User(**data)
#     db.session.add(new_user)
#     db.session.commit()
#     return jsonify(new_user.to_dict()), 201

# @app.route('/users/<int:user_id>', methods=['PUT'])
# def update_user(user_id):
#     user = User.query.get_or_404(user_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(user, key, value)
#     db.session.commit()
#     return jsonify(user.to_dict())

# @app.route('/users/<int:user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     user = User.query.get_or_404(user_id)
#     db.session.delete(user)
#     db.session.commit()
#     return jsonify({'message': 'User deleted successfully'})


# # blog posts

# # Get all blog posts
# @app.route('/blogposts', methods=['GET'])
# def get_all_blogposts():
#     blogposts = BlogPost.query.all()
#     blogposts_list = [blogposts.to_dict() for blogpost in blogposts]
#     return jsonify(blogposts_list)
#     blogpost_list = [blogpost.to_dict() for blogpost in blogposts]
#     return jsonify(blogpost_list)

# # Get a specific blog post by ID
# @app.route('/blogposts/<int:blogpost_id>', methods=['GET'])
# def get_blogpost(blogpost_id):
#     blogpost = BlogPost.query.get_or_404(blogpost_id)
#     return jsonify(blogpost.to_dict())

# # Create a new blog post
# @app.route('/blogposts', methods=['POST'])
# def create_blogpost():
#     data = request.json
#     new_blogpost = BlogPost(**data)
#     db.session.add(new_blogpost)
#     db.session.commit()
#     return jsonify(new_blogpost.to_dict()), 201

# # Update a blog post
# @app.route('/blogposts/<int:blogpost_id>', methods=['PUT'])
# def update_blogpost(blogpost_id):
#     blogpost = BlogPost.query.get_or_404(blogpost_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(blogpost, key, value)
#     db.session.commit()
#     return jsonify(blogpost.to_dict())

# # Partially update a blog post
# @app.route('/blogposts/<int:blogpost_id>', methods=['PATCH'])
# def patch_blogpost(blogpost_id):
#     blogpost = BlogPost.query.get_or_404(blogpost_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(blogpost, key, value)
#     db.session.commit()
#     return jsonify(blogpost.to_dict())

# # Delete a blog post
# @app.route('/blogposts/<int:blogpost_id>', methods=['DELETE'])
# def delete_blogpost(blogpost_id):
#     blogpost = BlogPost.query.get_or_404(blogpost_id)
#     db.session.delete(blogpost)
#     db.session.commit()
#     return jsonify({'message': 'Blog post deleted successfully'})


# # Get all communities
# @app.route('/communities', methods=['GET'])
# def get_all_communities():
#     communities = Community.query.all()
#     community_list = [community.to_dict() for community in communities]
#     return jsonify(community_list)

# # Get a specific community by ID
# @app.route('/communities/<int:community_id>', methods=['GET'])
# def get_community(community_id):
#     community = Community.query.get_or_404(community_id)
#     return jsonify(community.to_dict())

# # Create a new community
# @app.route('/communities', methods=['POST'])
# def create_community():
#     data = request.json
#     new_community = Community(**data)
#     db.session.add(new_community)
#     db.session.commit()
#     return jsonify(new_community.to_dict()), 201

# # Update a community
# @app.route('/communities/<int:community_id>', methods=['PUT'])
# def update_community(community_id):
#     community = Community.query.get_or_404(community_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(community, key, value)
#     db.session.commit()
#     return jsonify(community.to_dict())

# # update a community partially
# @app.route('/communities/<int:community_id>', methods=['PATCH'])
# def patch_community(community_id):
#     community = Community.query.get_or_404(community_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(community, key, value)
#     db.session.commit()
#     return jsonify(community.to_dict())

# # Delete a community
# @app.route('/communities/<int:community_id>', methods=['DELETE'])
# def delete_community(community_id):
#     community = Community.query.get_or_404(community_id)
#     db.session.delete(community)
#     db.session.commit()
#     return jsonify({'message': 'Community deleted successfully'})


# # Get all experts
# @app.route('/experts', methods=['GET'])
# def get_all_experts():
#     experts = Expert.query.all()
#     expert_list = [expert.to_dict() for expert in experts]
#     return jsonify(expert_list)

# # Get a specific expert by ID
# @app.route('/experts/<int:expert_id>', methods=['GET'])
# def get_expert(expert_id):
#     expert = Expert.query.get_or_404(expert_id)
#     return jsonify(expert.to_dict())

# # Create a new expert
# @app.route('/experts', methods=['POST'])
# def create_expert():
#     data = request.json
#     new_expert = Expert(**data)
#     db.session.add(new_expert)
#     db.session.commit()
#     return jsonify(new_expert.to_dict()), 201

# # Update an expert
# @app.route('/experts/<int:expert_id>', methods=['PUT'])
# def update_expert(expert_id):
#     expert = Expert.query.get_or_404(expert_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(expert, key, value)
#     db.session.commit()
#     return jsonify(expert.to_dict())

# # Partially update an expert
# @app.route('/experts/<int:expert_id>', methods=['PATCH'])
# def patch_expert(expert_id):
#     expert = Expert.query.get_or_404(expert_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(expert, key, value)
#     db.session.commit()
#     return jsonify(expert.to_dict())

# # Delete an expert
# @app.route('/experts/<int:expert_id>', methods=['DELETE'])
# def delete_expert(expert_id):
#     expert = Expert.query.get_or_404(expert_id)
#     db.session.delete(expert)
#     db.session.commit()
#     return jsonify({'message': 'Expert deleted successfully'})



# # Get all messages
# @app.route('/messages', methods=['GET'])
# def get_all_messages():
#     messages = Message.query.all()
#     message_list = [message.to_dict() for message in messages]
#     return jsonify(message_list)

# # Get a specific message by ID
# @app.route('/messages/<int:message_id>', methods=['GET'])
# def get_message(message_id):
#     message = Message.query.get_or_404(message_id)
#     return jsonify(message.to_dict())

# # Create a new message
# @app.route('/messages', methods=['POST'])
# def create_message():
#     data = request.json
#     new_message = Message(**data)
#     db.session.add(new_message)
#     db.session.commit()
#     return jsonify(new_message.to_dict()), 201

# # Update a message
# @app.route('/messages/<int:message_id>', methods=['PUT'])
# def update_message(message_id):
#     message = Message.query.get_or_404(message_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(message, key, value)
#     db.session.commit()
#     return jsonify(message.to_dict())

# # Partially update a message
# @app.route('/messages/<int:message_id>', methods=['PATCH'])
# def patch_message(message_id):
#     message = Message.query.get_or_404(message_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(message, key, value)
#     db.session.commit()
#     return jsonify(message.to_dict())

# # Delete a message
# @app.route('/messages/<int:message_id>', methods=['DELETE'])
# def delete_message(message_id):
#     message = Message.query.get_or_404(message_id)
#     db.session.delete(message)
#     db.session.commit()
#     return jsonify({'message': 'Message deleted successfully'})


# # Get all comments
# @app.route('/comments', methods=['GET'])
# def get_all_comments():
#     comments = Comment.query.all()
#     comment_list = [comment.to_dict() for comment in comments]
#     return jsonify(comment_list)

# # Get a specific comment by ID
# @app.route('/comments/<int:comment_id>', methods=['GET'])
# def get_comment(comment_id):
#     comment = Comment.query.get_or_404(comment_id)
#     return jsonify(comment.to_dict())

# # Create a new comment
# @app.route('/comments', methods=['POST'])
# def create_comment():
#     data = request.json
#     new_comment = Comment(**data)
#     db.session.add(new_comment)
#     db.session.commit()
#     return jsonify(new_comment.to_dict()), 201

# # Update a comment
# @app.route('/comments/<int:comment_id>', methods=['PUT'])
# def update_comment(comment_id):
#     comment = Comment.query.get_or_404(comment_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(comment, key, value)
#     db.session.commit()
#     return jsonify(comment.to_dict())

# # Partially update a comment
# @app.route('/comments/<int:comment_id>', methods=['PATCH'])
# def patch_comment(comment_id):
#     comment = Comment.query.get_or_404(comment_id)
#     data = request.json
#     for key, value in data.items():
#         setattr(comment, key, value)
#     db.session.commit()
#     return jsonify(comment.to_dict())

# # Delete a comment
# @app.route('/comments/<int:comment_id>', methods=['DELETE'])
# def delete_comment(comment_id):
#     comment = Comment.query.get_or_404(comment_id)
#     db.session.delete(comment)
#     db.session.commit()
#     return jsonify({'message': 'Comment deleted successfully'})


# # Get all likes
# @app.route('/likes', methods=['GET'])
# def get_all_likes():
#     likes = Like.query.all()
#     like_list = [like.to_dict() for like in likes]
#     return jsonify(like_list)

# # Get a specific like by ID
# @app.route('/likes/<int:like_id>', methods=['GET'])
# def get_like(like_id):
#     like = Like.query.get_or_404(like_id)
#     return jsonify(like.to_dict())

# # Create a new like
# @app.route('/likes', methods=['POST'])
# def create_like():
#     data = request.json
#     new_like = Like(**data)
#     db.session.add(new_like)
#     db.session.commit()
#     return jsonify(new_like.to_dict()), 201

# # Update a like (not typically used for likes)
# @app.route('/likes/<int:like_id>', methods=['PUT'])
# def update_like(like_id):
#     return jsonify({'message': 'Updating a like is not supported'})

# # Delete a like
# @app.route('/likes/<int:like_id>', methods=['DELETE'])
# def delete_like(like_id):
#     like = Like.query.get_or_404(like_id)
#     db.session.delete(like)
#     db.session.commit()
#     return jsonify({'message': 'Like deleted successfully'})

# api.add_resource(UserRegistration, '/register')
# api.add_resource(UserLogin, '/login')
# if __name__ == '__main__':
#     app.run(port=5555, debug=True)

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
            serialized_notifications = [notification.serialize() for notification in notifications]
            return serialized_notifications, 200
        elif notification_id is not None:
            # Retrieve a specific notification by ID
            notification = Notification.query.get(notification_id)
            if notification:
                return notification.serialize(), 200
            else:
                return {"message": "Notification not found"}, 404
        else:
            # Handle invalid requests
            return {"message": "Invalid request"}, 400

    def post(self):
        data = request.json
        user_id = data.get('user_id')
        notification_type = data.get('type')
        content = data.get('content')

        if not user_id or not notification_type or not content:
            return {'message': 'User ID, type, and content are required'}, 400

        # Create a new notification
        new_notification = Notification(
            user_id=user_id,
            type=notification_type,
            content=content,
            created_at=datetime.utcnow()
        )
        db.session.add(new_notification)
        db.session.commit()

        return jsonify(new_notification.to_dict()), 201

    def delete(self, notification_id):
    # Retrieve and delete the specified notification
        notification = Notification.query.get_or_404(notification_id)
        db.session.delete(notification)
        db.session.commit()
        return jsonify({'message': 'Notification deleted successfully'})



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
