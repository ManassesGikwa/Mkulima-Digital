import logging
from faker import Faker
from datetime import datetime

# Local imports
from app import app
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, Notification

logging.basicConfig(level=logging.INFO)

def clear_data():
    logging.info("Clearing data...")
    db.session.query(Like).delete()
    db.session.query(Comment).delete()
    db.session.query(Message).delete()
    db.session.query(BlogPost).delete()
    db.session.query(Expert).delete()
    db.session.query(Community).delete()
    db.session.query(User).delete()
    db.session.commit()

def seed_data():
    logging.info("Starting seed...")
    fake = Faker()

    # Generate fake users
    num_users = 10
    users = []
    for _ in range(num_users):
        user = User(
            username=fake.unique.user_name(),
            email=fake.unique.email(),
            profile_picture=fake.image_url(),
            password=fake.password(),
            role=fake.random_element(elements=('user', 'admin')),
            created_at=fake.date_time_this_decade()
        )
        users.append(user)
    db.session.add_all(users)
    db.session.commit()

    # Generate fake experts
    num_experts = 5
    for _ in range(num_experts):
        user = fake.random_element(elements=users)
        expert = Expert(
            name=fake.name(),
            expertise_area=fake.word(),
            bio=fake.paragraph(),
            image=fake.image_url(),
            created_at=fake.date_time_this_decade(),
            user_id=user.id
        )
        db.session.add(expert)
    db.session.commit()

    # Generate fake blog posts
    num_blog_posts = 20
    for _ in range(num_blog_posts):
        author = fake.random_element(elements=users)
        expert = fake.random_element(elements=Expert.query.all())
        blog_post = BlogPost(
            title=fake.sentence(),
            content=fake.paragraph(),
            image=fake.image_url(),
            created_at=fake.date_time_this_decade(),
            user_id=author.id,
            expert_id=expert.id
        )
        db.session.add(blog_post)
    db.session.commit()

    # Generate fake communities
    if users:
        communities = [
            {
                'name': 'AgroTech',
                'description': 'is the use of technology in agriculture, horticulture, and aquaculture with the aim of improving yield, efficiency, and profitability.',
                'image': 'https://images.unsplash.com/photo-1707753911060-a61817f0222d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXN8ZW58MHx8MHx8fDA%3D',
                'created_at': datetime.utcnow(),
                'user_id': fake.random_element(elements=users).id
            },
            {
                'name': 'GreenHarvest',
                'description': 'describes the premature cutting out of grapes in order to reduce the crop about six weeks before the actual harvest',
                'image': 'https://images.unsplash.com/photo-1669062265199-4e309ab44da3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FsZXN8ZW58MHx8MHx8fDA%3D',
                'created_at': datetime.utcnow(),
                'user_id': fake.random_element(elements=users).id
            },
            {
                'name': 'AgroPoultry',
                'description': 'poultry, in animal husbandry, birds raised commercially or domestically for meat, eggs, and feathers.',
                'image': 'https://images.unsplash.com/photo-1614120263669-43911b47f0b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvdWx0cnl8ZW58MHx8MHx8fDA%3D',
                'created_at': datetime.utcnow(),
                'user_id': fake.random_element(elements=users).id
            },
            {
                'name': 'AgroDairy',
                'description': 'Dairying, branch of agriculture that encompasses the breeding, raising, and utilization of dairy animals, primarily cows, for the production',
                'image': 'https://images.unsplash.com/photo-1561043409-cebdcdba882a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRhaXJ5JTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D',
                'created_at': datetime.utcnow(),
                'user_id': fake.random_element(elements=users).id
            },
            {
                'name': 'Horticulture',
                'description': 'Horticulture, the branch of plant agriculture dealing with garden crops, generally fruits, vegetables, and ornamental plants',
                'image': 'https://images.unsplash.com/photo-1566196725116-0527b2a8a25d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFy2hY2h8MTE0fHxmbG93ZXJzfGVufDB8fDB8fHww',
                'created_at': datetime.utcnow(),
                'user_id': fake.random_element(elements=users).id
            }
        ]
        for community_data in communities: 
            community = Community(**community_data)
            db.session.add(community)
        db.session.commit()

    # Generate fake messages
    num_messages = 50
    for _ in range(num_messages):
        sender = fake.random_element(elements=users)
        receiver = fake.random_element(elements=users)
        while receiver == sender:  # Ensure sender and receiver are different
            receiver = fake.random_element(elements=users)
        message = Message(
            content=fake.paragraph(),
            sender_id=sender.id,
            receiver_id=receiver.id,
            created_at=fake.date_time_this_decade()
        )
        db.session.add(message)
    db.session.commit()

    # Generate fake comments
    num_comments = 50
    blog_posts = BlogPost.query.all()
    for _ in range(num_comments):
        comment = Comment(
            content=fake.paragraph(),
            user_id=fake.random_element(elements=users).id,
            blog_post_id=fake.random_element(elements=blog_posts).id,
            created_at=fake.date_time_this_decade()
        )
        db.session.add(comment)
    db.session.commit()

    # Generate fake likes
    num_likes = 100
    for _ in range(num_likes):
        like = Like(
            user_id=fake.random_element(elements=users).id,
            blog_post_id=fake.random_element(elements=blog_posts).id,
            created_at=fake.date_time_this_decade(),
            total=fake.random_int(min=1, max=100)
        )
        db.session.add(like)
    db.session.commit()

def generate_notifications():
    logging.info("Generating notifications...")
    blog_posts = BlogPost.query.all()
    for post in blog_posts:
        content = f"A new blog post '{post.title}' has been added!"
        notification = Notification(
            user_id=post.user_id,
            type='new_blog_post',
            content=content,
            timestamp=datetime.utcnow()  # Use current timestamp
        )
        db.session.add(notification)
    db.session.commit()

    logging.info("Seed completed successfully!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        clear_data()
        seed_data()
        generate_notifications()