from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, CommunityFollowers, ExpertFollowers, CommunityLikes, Conversation
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
import os

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


class UserAuthentication(Resource):
    def post(self):
        data = request.json
        action = data.get('action')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email') if action == 'register' else None
        role = data.get('role') if action == 'register' else None

        if action == 'register':
            if not username or not email or not password or not role:
                return {'message': 'Username, email, password, and role are required'}, 400

            if User.query.filter_by(username=username.lower()).first():
                return {'message': 'Username already exists'}, 400

            if User.query.filter_by(email=email).first():
                return {'message': 'Email already exists'}, 400

            hashed_password = generate_password_hash(password)

            new_user = User(username=username, email=email, password=hashed_password, role=role)
            db.session.add(new_user)
            db.session.commit()

            if role == 'expert':
                new_expert = Expert(name=username, user_id=new_user.id, created_at=datetime.utcnow())
                db.session.add(new_expert)
                db.session.commit()

            return {'message': 'User created successfully!'}, 201

        elif action == 'login':
            if not username or not password:
                return {'message': 'Username and password are required'}, 400

            # Check if the user exists in either the users or experts table
            user = User.query.filter_by(username=username.lower()).first()
            if not user:
                user = Expert.query.filter_by(name=username.lower()).first()

            if not user:
                print("User not found")

            # If user is found and password matches, generate access token
            if user and check_password_hash(user.password, password):
                access_token = create_access_token(identity=user.id)
                return {'access_token': access_token}, 200
            else:
                return {'message': 'Invalid username or password'}, 401

        else:
            return {'message': 'Invalid action specified'}, 400


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


class Messages(Resource):
    def get(self):
        sender_id = request.args.get('sender_id')
        receiver_id = request.args.get('receiver_id')

        if sender_id and receiver_id:
            messages = Message.query.filter(
                ((Message.sender_id == sender_id) & (Message.receiver_id == receiver_id)) |
                ((Message.sender_id == receiver_id) & (Message.receiver_id == sender_id))
            ).order_by(Message.created_at).all()
            serialized_messages = [message.to_dict() for message in messages]
            return jsonify(serialized_messages)

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


class Conversation(Resource):
    def get(self):
        sender_id = request.args.get('sender_id')
        receiver_id = request.args.get('receiver_id')

        if not sender_id or not receiver_id:
            return {'message': 'Sender ID and Receiver ID are required'}, 400

        messages = Message.query.filter(
            ((Message.sender_id == sender_id) & (Message.receiver_id == receiver_id)) |
            ((Message.sender_id == receiver_id) & (Message.receiver_id == sender_id))
        ).order_by(Message.created_at).all()

        serialized_messages = [message.to_dict() for message in messages]
        return jsonify(serialized_messages)


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


class Users(Resource):
    def get(self):
        users = User.query.all()
        serialized_users = [user.to_dict() for user in users]
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
        followers = CommunityFollowers.query.filter_by(community_id=community_id).all()
        serialized_followers = [follower.to_dict() for follower in followers]
        return jsonify(serialized_followers)


class BlogPostCommentsResource(Resource):
    def get(self, blogpost_id):
        comments = Comment.query.filter_by(blog_post_id=blogpost_id).all()
        serialized_comments = [comment.to_dict() for comment in comments]
        return jsonify(serialized_comments)


class BlogPostLikes(Resource):
    def get(self, blog_post_id):
        likes = Like.query.filter_by(blog_post_id=blog_post_id).all()
        serialized_likes = [like.to_dict() for like in likes]
        return jsonify(serialized_likes)


class ExpertFollowResource(Resource):
    def post(self, expert_id):
        user_id = request.json.get('user_id')
        if not user_id:
            return {'message': 'User ID is required'}, 400
        expert_follower = ExpertFollowers(expert_id=expert_id, follower_id=user_id)
        db.session.add(expert_follower)
        db.session.commit()
        return jsonify(expert_follower.to_dict()), 201


class CommunityLikeResource(Resource):
    def post(self, community_id):
        user_id = request.json.get('user_id')
        if not user_id:
            return {'message': 'User ID is required'}, 400
        community_like = CommunityLikes(community_id=community_id, user_id=user_id)
        db.session.add(community_like)
        db.session.commit()
        return jsonify(community_like.to_dict()), 201


class BlogPostFollows(Resource):
    def post(self, blog_post_id):
        data = request.json
        follow = data.get('follow')

        if follow is None:
            return {'message': 'Invalid request, follow status is required.'}, 400

        # Implement the logic for following/unfollowing a blog post here
        # This can include checking if the user is already following the post
        # and toggling the follow status accordingly.

        # Placeholder response
        return jsonify({'isFollowed': follow})


class BlogPostComments(Resource):
    def post(self, blog_post_id):
        data = request.json
        text = data.get('text')

        if not text:
            return {'message': 'Comment text is required.'}, 400

        new_comment = Comment(text=text, blog_post_id=blog_post_id)
        db.session.add(new_comment)
        db.session.commit()

        return jsonify(new_comment.to_dict()), 201


class BlogPostLikesToggle(Resource):  # Renamed resource
    def post(self, blog_post_id):
        data = request.json
        like = data.get('like')

        if like is None:
            return {'message': 'Invalid request, like status is required.'}, 400

        # Implement the logic for liking/unliking a blog post here
        # This can include checking if the user has already liked the post
        # and toggling the like status accordingly.

        # Placeholder response
        return jsonify({'isLiked': like, 'count': 1 if like else 0})


# Serve React app from 'client/build' folder
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != '' and os.path.exists("client/build/" + path):
        return send_from_directory('client/build', path)
    else:
        return send_from_directory('client/build', 'index.html')


# Add routes for all resources
api.add_resource(UserAuthentication, '/auth')
api.add_resource(BlogPosts, '/blogposts')
api.add_resource(BlogPostDetails, '/blogposts/<int:id>')
api.add_resource(Communities, '/communities')
api.add_resource(CommunityDetails, '/communities/<int:id>')
api.add_resource(Experts, '/experts')
api.add_resource(ExpertDetails, '/experts/<int:id>')
api.add_resource(Comments, '/comments')
api.add_resource(CommentDetails, '/comments/<int:id>')
api.add_resource(Likes, '/likes')
api.add_resource(LikeDetails, '/likes/<int:id>')
api.add_resource(Users, '/users')
api.add_resource(UserDetails, '/users/<int:id>')
api.add_resource(CommunityFollowersResource, '/communities/<int:community_id>/followers')
api.add_resource(BlogPostCommentsResource, '/blogposts/<int:blogpost_id>/comments')
api.add_resource(BlogPostLikes, '/blogposts/<int:blog_post_id>/likes')
api.add_resource(Messages, '/messages')
api.add_resource(MessageDetails, '/messages/<int:id>')
api.add_resource(Conversation, '/conversations/<int:sender_id>/<int:receiver_id>')
api.add_resource(ExpertFollowResource, '/follow/expert/<int:expert_id>')
api.add_resource(CommunityLikeResource, '/like/community/<int:community_id>')
api.add_resource(BlogPostFollows, '/blogposts/<int:blog_post_id>/follows')
api.add_resource(BlogPostComments, '/blogposts/<int:blog_post_id>/comments')
api.add_resource(BlogPostLikesToggle, '/blogposts/<int:blog_post_id>/likes')


if __name__ == '__main__':
    app.run(debug=True, port=5555)