from flask import Flask,jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from models import db, User, Like, BlogPost, Community, Expert, Message, Comment

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
migrate = Migrate(app, db)
CORS(app)

@app.route('/')
def index():
    return '<h1>Project Server successfully created</h1>'

# get all users 
@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_list = [user.to_dict() for user in users]
    return jsonify(user_list)

# get all BlogPost
@app.route('/blogposts')
def get_all_blogposts():
    blogposts = BlogPost.query.all()
    blogposts_list = [blogposts.to_dict() for blogpost in blogposts]
    return jsonify(blogposts_list)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
