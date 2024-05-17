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
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token
import os
import jwt.exceptions

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

            if not username or not email or not password:
                return {'message': 'Username, email, and password are required'}, 400

            # Check if the username or email already exists
            if User.query.filter_by(username=username).first():
                return {'message': 'Username already exists'}, 400

            if User.query.filter_by(email=email).first():
                return {'message': 'Email already exists'}, 400

            # Hash the password before storing it
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            new_user = User(username=username, email=email, password=hashed_password)
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

# Community Resources
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
        return jsonify(new_community.to_dict()), 201

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

# Message Resources
class Messages(Resource):
    def get(self):
        messages = Message.query.all()
        serialized_messages = [message.to_dict() for message in messages]
        return jsonify(serialized_messages)

    def post(self):
        data = request.json
        new_message = Message(**data)
        db.session.add(new_message)
        db.session.commit()
        return jsonify(new_message.to_dict()), 201

class MessageDetails(Resource):
    def get(self, id):
        message = Message.query.get_or_404(id)
        return jsonify(message.to_dict())

    def put(self, id):
        message = Message.query.get_or_404(id)
        data = request.json
        for key, value in data.items():
            setattr(message, key, value)
        db.session.commit()
        return jsonify(message.to_dict())

    def delete(self, id):
        message = Message.query.get_or_404(id)
        db.session.delete(message)
        db.session.commit()
        return jsonify({'message': 'Message deleted successfully'})

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

# Like Resources
class Likes(Resource):
    def get(self):
        likes = Like.query.all()
        serialized_likes = [like.to_dict() for like in likes]
        return jsonify(serialized_likes)

    def post(self):
        data = request.json
        new_like = Like(**data)
        db.session.add(new_like)
        db.session.commit()
        return jsonify(new_like.to_dict()), 201

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

# Add routes for all resources
api.add_resource(UserRegistration, '/register')
api.add_resource(UserLogin, '/login')
api.add_resource(BlogPosts, '/blogposts')
api.add_resource(BlogPostDetails, '/blogposts/<int:id>')
api.add_resource(Communities, '/communities')
api.add_resource(CommunityDetails, '/communities/<int:id>')
api.add_resource(Experts, '/experts')
api.add_resource(ExpertDetails, '/experts/<int:id>')
api.add_resource(Messages, '/messages')
api.add_resource(MessageDetails, '/messages/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentDetails, '/comments/<int:id>')
api.add_resource(Likes, '/likes')
api.add_resource(LikeDetails, '/likes/<int:id>')


if __name__ == '__main__':
    app.run(debug=True, port=5555)
