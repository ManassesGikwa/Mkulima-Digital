# Remote library imports
from faker import Faker
from random import choice as rc  # Importing choice as rc

# Local imports
from app import app
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, Notification

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

    # Generate fake experts
    num_experts = 5
    for _ in range(num_experts):
        user = rc(users)
        expert = Expert(
            name=fake.name(),
            expertise_area=fake.word(),
            bio=fake.paragraph(),  # Add bio
            image=fake.image_url(),
            created_at=fake.date_time_this_decade(),
            user_id=user.id
        )
        db.session.add(expert)
    db.session.commit()

    # Generate fake blog posts
    num_blog_posts = 20
    for _ in range(num_blog_posts):
        # Choose a random user as the author
        author = rc(users)
        
        # Choose a random expert if available, otherwise set expert_id to None
        expert = Expert.query.first()  # Assuming experts exist
        blog_post = BlogPost(
            title=fake.sentence(),
            content=fake.paragraph(),
            created_at=fake.date_time_this_decade(),
            user_id=author.id,
            expert_id=expert.id if expert else None
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
            created_at=fake.date_time_this_decade(),
            total=fake.random_int(min=1, max=100)  # Add a random value for the total
        )
        db.session.add(like)

    # Commit changes to the database
    db.session.commit()
    # Generate fake notifications
def generate_notifications():
    # Example: Generate notifications for all users about a new blog post
    blog_posts = BlogPost.query.all()
    for post in blog_posts:
        content = f"A new blog post '{post.title}' has been added!"
        notification = Notification(
            user_id=post.expert_id ,  # Assuming there's an author_id field in your BlogPost model
            type='new_blog_post',
            content=content,
             timestamp =post.created_at  # Set the notification creation time same as the blog post creation time
        )
        db.session.add(notification)
    db.session.commit()


    print("Seed completed successfully!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure all tables are created
        clear_data()
        seed_data()
        generate_notifications()

