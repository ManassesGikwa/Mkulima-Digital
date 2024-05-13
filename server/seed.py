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


# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like

# Clear all data from tables
def clear_data():
    db.session.query(User).delete()
    db.session.query(BlogPost).delete()
    db.session.query(Community).delete()
    db.session.query(Expert).delete()
    db.session.query(Message).delete()
    db.session.query(Comment).delete()
    db.session.query(Like).delete()
    db.session.commit()

# Generate fake data
def seed_data():
    print("Starting seed...")
    fake = Faker()

    # Generate fake users
    num_users = 10
    users = []
    for _ in range(num_users):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            created_at=fake.date_time_this_decade()
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    # Generate fake blog posts
    num_blog_posts = 20
    for _ in range(num_blog_posts):
        blog_post = BlogPost(
            title=fake.sentence(),
            content=fake.paragraph(),
            created_at=fake.date_time_this_decade(),
            user_id=rc(users).id
        )
        db.session.add(blog_post)

    # Generate fake communities
    num_communities = 5
    for _ in range(num_communities):
        community = Community(
            name=fake.word(),
            description=fake.sentence(),
            image=fake.image_url(),
            created_at=fake.date_time_this_decade(),
            user_id=rc(users).id
        )
        db.session.add(community)

    # Generate fake experts
    num_experts = 5
    for _ in range(num_experts):
        expert = Expert(
            name=fake.name(),
            expertise_area=fake.word(),
            image=fake.image_url(),
            created_at=fake.date_time_this_decade(),
            user_id=rc(users).id
        )
        db.session.add(expert)

    # Generate fake messages
    num_messages = 50
    for _ in range(num_messages):
        sender = rc(users)
        receiver = rc(users)
        while receiver == sender:  # Ensure sender and receiver are different
            receiver = rc(users)
        message = Message(
            content=fake.paragraph(),
            sender_id=sender.id,
            receiver_id=receiver.id,
            created_at=fake.date_time_this_decade()
        )
        db.session.add(message)

    # Generate fake comments
    num_comments = 50
    for _ in range(num_comments):
        comment = Comment(
            content=fake.paragraph(),
            user_id=rc(users).id,
            blog_post_id=rc(BlogPost.query.all()).id,
            created_at=fake.date_time_this_decade()
        )
        db.session.add(comment)

    # Generate fake likes
    num_likes = 100
    for _ in range(num_likes):
        like = Like(
            user_id=rc(users).id,
            blog_post_id=rc(BlogPost.query.all()).id,
            created_at=fake.date_time_this_decade()
        )
        db.session.add(like)

    # Commit changes to the database
    db.session.commit()

    print("Seed completed successfully!")

if __name__ == '__main__':
    with app.app_context():
        clear_data()
        seed_data()
