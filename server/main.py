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
        # DELETE method to delete a community
    def delete(self, id):
        community = Community.query.get_or_404(id)
        db.session.delete(community)
        db.session.commit()
        return jsonify({'message': 'Community deleted successfully'})
       
    @app.route('/communities/<int:id>/like', methods=['POST'])
    def like_community(id):
     data = request.json
     user_id = data.get('user_id') 
     like = Like(user_id=user_id, community_id=id)
     db.session.add(like)
     db.session.commit()
     return jsonify({'message': 'Community liked successfully'})

    # @app.route('/communities/<int:id>/follow', methods=['POST'])
    # def follow_community(id):
    #  data = request.json
    #  user_id = data.get('user_id')  # Assuming the user ID is passed in the request body
    #  follow = CommunityFollowers(user_id=user_id, community_id=id)
    #  db.session.add(follow)
    #  db.session.commit()
    #  return jsonify({'message': 'Community followed successfully'})


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