#!/usr/bin/env python3

# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")

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
        communities = []
        for _ in range(num_communities):
            community = Community(
                name=fake.word(),
                description=fake.sentence(),
                image=fake.image_url(),
                created_at=fake.date_time_this_decade(),
                user_id=rc(users).id
            )
            communities.append(community)
        db.session.add_all(communities)

        # Generate fake experts
        num_experts = 5
        experts = []
        for _ in range(num_experts):
            expert = Expert(
                name=fake.name(),
                expertise_area=fake.word(),
                image=fake.image_url(),
                created_at=fake.date_time_this_decade(),
                user_id=rc(users).id
            )
            experts.append(expert)
        db.session.add_all(experts)

        # Generate fake messages
        num_messages = 50
        messages = []
        for _ in range(num_messages):
            message = Message(
                content=fake.paragraph(),
                sender_id=rc(users).id,
                receiver_id=rc(users).id,
                created_at=fake.date_time_this_decade()
            )
            messages.append(message)
        db.session.add_all(messages)

               # Generate fake comments
        num_comments = 50
        comments = []
        for _ in range(num_comments):
            comment = Comment(
                content=fake.paragraph(),
                user_id=rc(users).id,
                blog_post_id=rc(users).id,  # Replace rc(blog_posts).id with rc(users).id
                created_at=fake.date_time_this_decade()
            )
            comments.append(comment)
        db.session.add_all(comments)

        # Generate fake likes
        num_likes = 100
        likes = []
        for _ in range(num_likes):
            like = Like(
                user_id=rc(users).id,
                blog_post_id=rc(users).id,  # Replace rc(blog_posts).id with rc(users).id
                created_at=fake.date_time_this_decade()
            )
            likes.append(like)
        db.session.add_all(likes)

        # Commit changes to the database
        db.session.commit()

        print("Seed completed successfully!")
