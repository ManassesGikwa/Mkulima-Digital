from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    bio = db.Column(db.String)
    profile_picture = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String, unique=True)
    username = db.Column(db.String, unique=True)
    
    blog_posts = db.relationship('BlogPost', backref='author', lazy=True)
    communities = db.relationship('Community', backref='creator', lazy=True)
    experts = db.relationship('Expert', backref='user', lazy=True)
    messages_sent = db.relationship('Message', foreign_keys='Message.sender_id', backref='sender', lazy=True)
    messages_received = db.relationship('Message', foreign_keys='Message.receiver_id', backref='receiver', lazy=True)
    comments = db.relationship('Comment', backref='user', lazy=True)
    likes = db.relationship('Like', backref='user', lazy=True)

    def to_dict(self):
        return{
            'id':self.id,
            'created_at':self.created_at.isoformat(),
            'bio':self.bio,
            'profile_picture':self.profile_picture,
            'password': self.password,
            'email': self.email,
            'username':self.username

        
        }

class BlogPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    content = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    comments = db.relationship('Comment', backref='blog_post', lazy=True)
    likes = db.relationship('Like', backref='blog_post', lazy=True)

    def to_dict(self):
        return{
            'id':self.id,
            'title': self.title,
            'content':self.content,
            'image': self.image,
            'created_at':self.created_at.isoformat(),

        }

class Community(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    description = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return{
            'id':self.id,
            'name':self.name,
            'description':self.description,
            'image': self.image,
            'created_at':self.created_at.isoformat()
        }

class Expert(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    expertise_area = db.Column(db.String)
    image = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def to_dict(self):
        return{
            'id':self.id,
            'name':self.name,
            'expertise_area':self.expertise_area,
            'image':self.image ,
            'created_at':self.created_at.isoformat()



        }

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    receiver_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime)

    def to_dict(self):
        return{
            'id':self.id,
            'content':self.content,
            'created_at':self.created_at.isoformat()
        }

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
    created_at = db.Column(db.DateTime)

    def to_dict(self):
        return{
            'id':self.id,
            'content':self.content,
            'created_at':self.created_at.isoformat()
        }

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    blog_post_id = db.Column(db.Integer, db.ForeignKey('blog_post.id'), nullable=False)
    created_at = db.Column(db.DateTime)
    
    def to_dict(self):
        return{
            'id':self.id,
            'created_at':self.created_at.isoformat()
            
        }

