# # #!/usr/bin/env python3

# # # Standard library imports
# # from random import choice as rc

# # # Remote library imports
# # from faker import Faker

# # # Local imports
# # from app import app
# # from models import db, User, BlogPost, Community, Expert, Message, Comment, Like

# # if __name__ == '__main__':
# #     fake = Faker()
# #     with app.app_context():
# #         print("Starting seed...")

# #         # Generate fake users
# #         num_users = 10
# #         users = []
# #         for _ in range(num_users):
# #             user = User(
# #                 username=fake.user_name(),
# #                 email=fake.email(),
# #                 created_at=fake.date_time_this_decade()
# #             )
# #             users.append(user)
# #         db.session.add_all(users)
# #         db.session.commit()

# #         # Generate fake blog posts
# #         num_blog_posts = 20
# #         for _ in range(num_blog_posts):
# #             blog_post = BlogPost(
# #                 title=fake.sentence(),
# #                 content=fake.paragraph(),
# #                 created_at=fake.date_time_this_decade(),
# #                 user_id=rc(users).id
# #             )
# #             db.session.add(blog_post)

# #         # Generate fake communities
# #         num_communities = 5
# #         communities = []
# #         for _ in range(num_communities):
# #             community = Community(
# #                 name=fake.word(),
# #                 description=fake.sentence(),
# #                 image=fake.image_url(),
# #                 created_at=fake.date_time_this_decade(),
# #                 user_id=rc(users).id
# #             )
# #             communities.append(community)
# #         db.session.add_all(communities)

# #         # Generate fake experts
# #         num_experts = 5
# #         experts = []
# #         for _ in range(num_experts):
# #             expert = Expert(
# #                 name=fake.name(),
# #                 expertise_area=fake.word(),
# #                 image=fake.image_url(),
# #                 created_at=fake.date_time_this_decade(),
# #                 user_id=rc(users).id
# #             )
# #             experts.append(expert)
# #         db.session.add_all(experts)

# #         # Generate fake messages
# #     num_messages = 50
# #     messages = []
# #     for _ in range(num_messages):
# #         sender = rc(users)
# #         receiver = rc(users)
# #         while receiver == sender:  # Ensure sender and receiver are different
# #             receiver = rc(users)
# #         message = Message(
# #             content=fake.paragraph(),
# #             sender_id=sender.id,
# #             receiver_id=receiver.id,
# #             created_at=fake.date_time_this_decade()
# #         )
# #         messages.append(message)
# #     db.session.add_all(messages)

# # # Generate fake comments
# #     num_comments = 50
# #     comments = []
# #     for _ in range(num_comments):
# #         comment = Comment(
# #             content=fake.paragraph(),
# #             user_id=rc(users).id,
# #             blog_post_id=rc(BlogPost).id,  # Replace rc(users).id with rc(blog_posts).id
# #             created_at=fake.date_time_this_decade()
# #         )
# #         comments.append(comment)
# #     db.session.add_all(comments)

# # # Generate fake likes
# #     num_likes = 100
# #     likes = []
# #     for _ in range(num_likes):
# #         like = Like(
# #             user_id=rc(users).id,
# #             blog_post_id=rc(BlogPost).id,  # Replace rc(users).id with rc(blog_posts).id
# #             created_at=fake.date_time_this_decade()
# #         )
# #         likes.append(like)
# #     db.session.add_all(likes)


# #         # Commit changes to the database
# #     db.session.commit()

# #     print("Seed completed successfully!")
# #!/usr/bin/env python3

# # Standard library imports
# from random import choice as rc

# # Remote library imports
# from faker import Faker

# # Local imports
# from app import app
# from models import db, User, BlogPost, Community, Expert, Message, Comment, Like

# #clear all data from tables
# def clear_data():
#     db.session.query(User).delete()
#     db.session.query(BlogPost).delete()
#     db.session.query(Community).delete()
#     db.session.query(Expert).delete()
#     db.session.query(Message).delete()
#     db.session.query(Comment).delete()
#     db.session.query(Like).delete()
#     db.session.commit()



#         # Generate fake users
# def seed_data():
#         print("Starting seed...")
#         fake= Faker()
#         num_users = 10
#         users = []
#         for _ in range(num_users):
#             user = User(
#                 username=fake.user_name(),
#                 email=fake.email(),
#                 created_at=fake.date_time_this_decade()
#             )
#             users.append(user)
#         db.session.add_all(users)
#         db.session.commit()

#         # Generate fake blog posts
#         num_blog_posts = 20
#         for _ in range(num_blog_posts):
#             blog_post = BlogPost(
#                 title=fake.sentence(),
#                 content=fake.paragraph(),
#                 created_at=fake.date_time_this_decade(),
#                 user_id=rc(users).id
#             )
#             db.session.add(blog_post)

#         # Generate fake communities
#         num_communities = 5
#         communities = []
#         for _ in range(num_communities):
#             community = Community(
#                 name=fake.word(),
#                 description=fake.sentence(),
#                 image=fake.image_url(),
#                 created_at=fake.date_time_this_decade(),
#                 user_id=rc(users).id
#             )
#             communities.append(community)
#         db.session.add_all(communities)

#         # Generate fake experts
#         num_experts = 5
#         experts = []
#         for _ in range(num_experts):
#             expert = Expert(
#                 name=fake.name(),
#                 expertise_area=fake.word(),
#                 image=fake.image_url(),
#                 created_at=fake.date_time_this_decade(),
#                 user_id=rc(users).id
#             )
#             experts.append(expert)
#         db.session.add_all(experts)

#         # Generate fake messages
#         num_messages = 50
#         messages = []
#         for _ in range(num_messages):
#             sender = rc(users)
#             receiver = rc(users)
#             while receiver == sender:  # Ensure sender and receiver are different
#                 receiver = rc(users)
#             message = Message(
#                 content=fake.paragraph(),
#                 sender_id=sender.id,
#                 receiver_id=receiver.id,
#                 created_at=fake.date_time_this_decade()
#             )
#             messages.append(message)
#         db.session.add_all(messages)

#         # Generate fake comments
#         num_comments = 50
#         comments = []
#         for _ in range(num_comments):
#             comment = Comment(
#                 content=fake.paragraph(),
#                 user_id=rc(users).id,
#                 blog_post_id=rc(BlogPost.query.all()).id,
#                 created_at=fake.date_time_this_decade()
#             )
#             comments.append(comment)
#         db.session.add_all(comments)

#         # Generate fake likes
#         num_likes = 100
#         likes = []
#         for _ in range(num_likes):
#             like = Like(
#                 user_id=rc(users).id,
#                 blog_post_id=rc(BlogPost.query.all()).id,
#                 created_at=fake.date_time_this_decade()
#             )
#             likes.append(like)
#         db.session.add_all(likes)

#         # Commit changes to the database
#         db.session.commit()

#         print("Seed completed successfully!")
# if __name__ == '__main__':
#     # fake = Faker()
#     with app.app_context():
#         clear_data()
#         seed_data()
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from models import db,Community
from datetime import datetime
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


# def seed_blog_posts():
#     post1 = BlogPost(title='Post 1', content='Content of post 1', image='image1.jpg', created_at=datetime.utcnow(), user_id=1)
#     post2 = BlogPost(title='Post 2', content='Content of post 2', image='image2.jpg', created_at=datetime.utcnow(), user_id=2)
#     db.session.add_all([post1, post2])
#     db.session.commit()


def seed_communities():
    # Seed communities with images
    community1 = Community(name='AgroTech', description='is the use of technology in agriculture, horticulture, and aquaculture with the aim of improving yield, efficiency, and profitability.', image='https://images.unsplash.com/photo-1707753911060-a61817f0222d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXN8ZW58MHx8MHx8fDA%3D', created_at=datetime.utcnow(), user_id=1)
    community2 = Community(name='GreenHarvest', description='describes the premature cutting out of grapes in order to reduce the crop about six weeks before the actual harvest', image='https://images.unsplash.com/photo-1669062265199-4e309ab44da3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FsZXN8ZW58MHx8MHx8fDA%3D', created_at=datetime.utcnow(), user_id=2)
    community3 = Community(name='AgroPoultry', description='poultry, in animal husbandry, birds raised commercially or domestically for meat, eggs, and feathers.', image='https://images.unsplash.com/photo-1614120263669-43911b47f0b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvdWx0cnl8ZW58MHx8MHx8fDA%3D', created_at=datetime.utcnow(), user_id=1)
    community4 = Community(name='AgroDairy', description=' Dairying, branch of agriculture that encompasses the breeding, raising, and utilization of dairy animals, primarily cows, for the production', image='https://images.unsplash.com/photo-1561043409-cebdcdba882a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRhaXJ5JTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D', created_at=datetime.utcnow(), user_id=2)
    community5 = Community(name='Horticulture', description='Horticulture, the branch of plant agriculture dealing with garden crops, generally fruits, vegetables, and ornamental plants', image='https://images.unsplash.com/photo-1566196725116-0527b2a8a25d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxmbG93ZXJzfGVufDB8fDB8fHww', created_at=datetime.utcnow(), user_id=1)
    db.session.add_all([community1, community2,community3, community4, community5])
    db.session.commit()


# # Clear all data from tables
# def clear_data():
#     db.session.query(User).delete()
#     db.session.query(BlogPost).delete()
#     db.session.query(Community).delete()
#     db.session.query(Expert).delete()
#     db.session.query(Message).delete()
#     db.session.query(Comment).delete()
#     db.session.query(Like).delete()
#     db.session.commit()

# # Generate fake data
# def seed_data():
#     print("Starting seed...")
#     fake = Faker()

#     # Generate fake users
#     num_users = 10
#     users = []
#     for _ in range(num_users):
#         user = User(
#             username=fake.user_name(),
#             email=fake.email(),
#             created_at=fake.date_time_this_decade()
#         )
#         users.append(user)
#     db.session.add_all(users)
#     db.session.commit()

#     # Generate fake blog posts
#     num_blog_posts = 20
#     for _ in range(num_blog_posts):
#         blog_post = BlogPost(
#             title=fake.sentence(),
#             content=fake.paragraph(),
#             created_at=fake.date_time_this_decade(),
#             user_id=rc(users).id
#         )
#         db.session.add(blog_post)

#     # Generate fake communities
#     num_communities = 5
#     for _ in range(num_communities):
#         community = Community(
#             name=fake.word(),
#             description=fake.sentence(),
#             image=fake.image_url(),
#             created_at=fake.date_time_this_decade(),
#             user_id=rc(users).id
#         )
#         db.session.add(community)

#     # Generate fake experts
#     num_experts = 5
#     for _ in range(num_experts):
#         expert = Expert(
#             name=fake.name(),
#             expertise_area=fake.word(),
#             image=fake.image_url(),
#             created_at=fake.date_time_this_decade(),
#             user_id=rc(users).id
#         )
#         db.session.add(expert)

#     # Generate fake messages
#     num_messages = 50
#     for _ in range(num_messages):
#         sender = rc(users)
#         receiver = rc(users)
#         while receiver == sender:  # Ensure sender and receiver are different
#             receiver = rc(users)
#         message = Message(
#             content=fake.paragraph(),
#             sender_id=sender.id,
#             receiver_id=receiver.id,
#             created_at=fake.date_time_this_decade()
#         )
#         db.session.add(message)

#     # Generate fake comments
#     num_comments = 50
#     for _ in range(num_comments):
#         comment = Comment(
#             content=fake.paragraph(),
#             user_id=rc(users).id,
#             blog_post_id=rc(BlogPost.query.all()).id,
#             created_at=fake.date_time_this_decade()
#         )
#         db.session.add(comment)

#     # Generate fake likes
#     num_likes = 100
#     for _ in range(num_likes):
#         like = Like(
#             user_id=rc(users).id,
#             blog_post_id=rc(BlogPost.query.all()).id,
#             created_at=fake.date_time_this_decade()
#         )
#         db.session.add(like)

#     # Commit changes to the database
#     db.session.commit()

#     print("Seed completed successfully!")

# if __name__ == '__main__':
#     with app.app_context():
#         clear_data()
#         seed_data()
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_communities()
       

