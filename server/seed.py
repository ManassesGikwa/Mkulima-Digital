# import logging
# from faker import Faker
# from datetime import datetime

# # Local imports
# from app import app
# from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, Notification
# # Initialize Faker
# fake = Faker()


# logging.basicConfig(level=logging.INFO)

# def clear_data():
#     logging.info("Clearing data...")
#     meta = db.metadata
#     for table in reversed(meta.sorted_tables):
#         db.session.execute(table.delete())
#     db.session.commit()

# def seed_data():
#     logging.info("Starting seed...")
#     fake = Faker()

#     # Generate fake users
#     num_users = 10
#     users = []
#     for _ in range(num_users):
#         user = User(
#             username=fake.unique.user_name(),
#             email=fake.unique.email(),
#             profile_picture=fake.image_url(),
#             password=fake.password(),
#             role=fake.random_element(elements=('user', 'admin')),
#             created_at=fake.date_time_this_decade()
#         )
#         users.append(user)
#     db.session.add_all(users)
#     db.session.commit()

#     # Generate fake experts
#     num_experts = 5
#     for _ in range(num_experts):
#         user = fake.random_element(elements=users)
#         expert = Expert(
#             name=fake.name(),
#             expertise_area=fake.word(),
#             bio=fake.paragraph(),
#             image=fake.image_url(),
#             created_at=fake.date_time_this_decade(),
#             user_id=user.id
#         )
#         db.session.add(expert)
#     db.session.commit()

#     # Generate fake blog posts
#     # num_blog_posts = 20
#     # for _ in range(num_blog_posts):
#     #     author = fake.random_element(elements=users)
#     #     expert = fake.random_element(elements=Expert.query.all())
#     #     blog_post = BlogPost(
#     #         title=fake.sentence(),
#     #         content=fake.paragraph(),
#     #         image=fake.image_url(),
#     #         created_at=fake.date_time_this_decade(),
#     #         user_id=author.id,
#     #         expert_id=expert.id
#     #     )
#     #     db.session.add(blog_post)
#     # db.session.commit()
#     # Assuming you have User and Expert models and a BlogPost model already defined
# num_blog_posts = 20

# # Agriculture-specific titles and content ideas
# agriculture_titles = [
#     "The Future of Organic Farming",
#     "Innovative Techniques in Crop Rotation",
#     "Sustainable Agriculture Practices",
#     "The Role of Technology in Modern Farming",
#     "Urban Agriculture: Growing Food in the City",
#     "How Climate Change Affects Crop Yields",
#     "The Benefits of Cover Crops",
#     "Aquaponics: Combining Fish and Plants",
#     "Regenerative Agriculture for Soil Health",
#     "Agroforestry: Integrating Trees into Farmland",
#     "The Impact of GMOs on Agriculture",
#     "Precision Farming: Using Data to Improve Efficiency",
#     "Beekeeping and Pollination in Agriculture",
#     "The Importance of Biodiversity in Farming",
#     "Hydroponics: Growing Plants Without Soil",
#     "Agriculture Policy and Its Impact on Farmers",
#     "The Economics of Small-Scale Farming",
#     "Challenges and Opportunities in Livestock Farming",
#     "Organic vs. Conventional Farming: A Comparative Analysis",
#     "Farm-to-Table Movement: Connecting Producers and Consumers"
# ]

# agriculture_contents = [
#     "In recent years, organic farming has gained popularity due to its health and environmental benefits. This article explores the future trends and innovations in organic agriculture.",
#     "Crop rotation is a time-tested technique that helps improve soil health and prevent pest infestations. Learn about the latest innovations in crop rotation practices.",
#     "Sustainable agriculture is essential for the long-term health of our planet. Discover various practices that can help make farming more sustainable.",
#     "Technology is revolutionizing modern farming. From drones to precision agriculture, explore how tech advancements are shaping the future of agriculture.",
#     "Urban agriculture is a growing trend in cities around the world. Find out how city dwellers are growing their own food and what benefits this brings.",
#     "Climate change poses a significant threat to global crop yields. This article discusses how changing weather patterns are affecting agriculture.",
#     "Cover crops offer numerous benefits, including soil protection and weed control. Learn about different types of cover crops and their uses.",
#     "Aquaponics combines aquaculture and hydroponics to create a sustainable food production system. Explore the basics and benefits of aquaponics.",
#     "Regenerative agriculture focuses on restoring soil health and biodiversity. Understand the principles and practices that make this approach effective.",
#     "Agroforestry integrates trees into agricultural landscapes, providing multiple benefits. Discover how this practice can enhance farm productivity and sustainability.",
#     "Genetically modified organisms (GMOs) have a significant impact on agriculture. This article examines the pros and cons of using GMOs in farming.",
#     "Precision farming uses data and technology to optimize agricultural practices. Learn how this approach can increase efficiency and reduce waste.",
#     "Beekeeping is crucial for pollination and agricultural productivity. Understand the role of bees in farming and how to start your own beekeeping operation.",
#     "Biodiversity is vital for resilient agricultural systems. Explore the importance of maintaining diverse plant and animal species on farms.",
#     "Hydroponics allows plants to grow without soil, using nutrient-rich water instead. Find out how hydroponic systems work and their advantages.",
#     "Agriculture policy shapes the farming industry. This article analyzes recent policy changes and their impact on farmers.",
#     "Small-scale farming faces unique economic challenges. Discover strategies to make small farms economically viable.",
#     "Livestock farming presents both challenges and opportunities. Learn about best practices for managing livestock and improving productivity.",
#     "Organic and conventional farming each have their strengths and weaknesses. This comparative analysis highlights key differences between the two approaches.",
#     "The farm-to-table movement is reconnecting consumers with their food sources. Explore how this movement benefits both producers and consumers."
# ]

# # Preselected agriculture-based image URLs
# agriculture_images = [
#     "https://www.seedagritech.com/wp-content/uploads/2019/01/organic-farming.jpg",
#     "https://usfarmersandranchers.org/wp-content/uploads/2020/06/benefits-of-crop-rotation-hero.jpg",
#     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9gTO_ViclR6Noy6YEdoYdZ8qlUwxr4y_q-ejtIC08QA&s",
#     "https://media.licdn.com/dms/image/D5612AQG9BrdO-8L_ug/article-cover_image-shrink_720_1280/0/1712651661867?e=2147483647&v=beta&t=QbiNF--N5SSXVbM7PDJqNsen6h26pJVcmHlyjhInREA",
#     "https://media.licdn.com/dms/image/D5612AQH4kqF2uMaeZw/article-cover_image-shrink_720_1280/0/1686233297727?e=2147483647&v=beta&t=KfUxymq89QTT4CEwUVSwVmZssKmtoC-YiTbC_Fgp_2M",
#     "https://univdatos.com/wp-content/uploads/2021/09/5c74ded9925e7.jpg",
#     "https://www.sare.org/wp-content/uploads/pg4-NRCSAL12292-768x499.jpg",
#     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc61kMzTUb5aad7UNEr6ozap9Qvg4nEKpP2vsCggt5QA&s",
#     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShNwIH8IUFvxGYDExCBxQ8Yh5mn2RPhdeVLly8mIWSWg&s",
#     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgMrFLVrzHNZMHH6-YoZTYlD1aiue2lFK-GK7PGq4PDw&s"
# ]

# # Generate fake blog posts
# num_blog_posts = 20
# for _ in range(num_blog_posts):
#     author = fake.random_element(elements=users)
#     expert = fake.random_element(elements=Expert.query.all())
#     title = fake.random_element(elements=agriculture_titles)
#     content = fake.random_element(elements=agriculture_contents)
#     image = fake.random_element(elements=agriculture_images)
#     blog_post = BlogPost(
#         title=title,
#         content=content,
#         image=image,
#         created_at=fake.date_time_this_decade(),
#         user_id=author.id,
#         expert_id=expert.id
#     )
#     db.session.add(blog_post)

#     db.session.commit()

#     # Generate fake communities
#     if users:
#         communities = [
#             {
#                 'name': 'AgroTech',
#                 'description': 'is the use of technology in agriculture, horticulture, and aquaculture with the aim of improving yield, efficiency, and profitability.',
#                 'image': 'https://images.unsplash.com/photo-1707753911060-a61817f0222d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXN8ZW58MHx8MHx8fDA%3D',
#                 'created_at': datetime.utcnow(),
#                 'user_id': fake.random_element(elements=users).id
#             },
#             {
#                 'name': 'GreenHarvest',
#                 'description': 'describes the premature cutting out of grapes in order to reduce the crop about six weeks before the actual harvest',
#                 'image': 'https://images.unsplash.com/photo-1669062265199-4e309ab44da3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FsZXN8ZW58MHx8MHx8fDA%3D',
#                 'created_at': datetime.utcnow(),
#                 'user_id': fake.random_element(elements=users).id
#             },
#             {
#                 'name': 'AgroPoultry',
#                 'description': 'poultry, in animal husbandry, birds raised commercially or domestically for meat, eggs, and feathers.',
#                 'image': 'https://images.unsplash.com/photo-1614120263669-43911b47f0b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvdWx0cnl8ZW58MHx8MHx8fDA%3D',
#                 'created_at': datetime.utcnow(),
#                 'user_id': fake.random_element(elements=users).id
#             },
#             {
#                 'name': 'AgroDairy',
#                 'description': 'Dairying, branch of agriculture that encompasses the breeding, raising, and utilization of dairy animals, primarily cows, for the production',
#                 'image': 'https://images.unsplash.com/photo-1561043409-cebdcdba882a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRhaXJ5JTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D',
#                 'created_at': datetime.utcnow(),
#                 'user_id': fake.random_element(elements=users).id
#             },
#             {
#                 'name': 'Horticulture',
#                 'description': 'Horticulture, the branch of plant agriculture dealing with garden crops, generally fruits, vegetables, and ornamental plants',
#                 'image': 'https://images.unsplash.com/photo-1566196725116-0527b2a8a25d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFy2hY2h8MTE0fHxmbG93ZXJzfGVufDB8fDB8fHww',
#                 'created_at': datetime.utcnow(),
#                 'user_id': fake.random_element(elements=users).id
#             }
#         ]
#         for community_data in communities: 
#             community = Community(**community_data)
#             db.session.add(community)
#         db.session.commit()

#     # Generate fake messages
#     num_messages = 50
#     for _ in range(num_messages):
#         sender = fake.random_element(elements=users)
#         receiver = fake.random_element(elements=users)
#         while receiver == sender:  # Ensure sender and receiver are different
#             receiver = fake.random_element(elements=users)
#         message = Message(
#             content=fake.paragraph(),
#             sender_id=sender.id,
#             receiver_id=receiver.id,
#             created_at=fake.date_time_this_decade()
#         )
#         db.session.add(message)
#     db.session.commit()

#     # Generate fake comments
#     num_comments = 50
#     blog_posts = BlogPost.query.all()
#     for _ in range(num_comments):
#         comment = Comment(
#             content=fake.paragraph(),
#             user_id=fake.random_element(elements=users).id,
#             blog_post_id=fake.random_element(elements=blog_posts).id,
#             created_at=fake.date_time_this_decade()
#         )
#         db.session.add(comment)
#     db.session.commit()

#     # Generate fake likes
#     num_likes = 100
#     for _ in range(num_likes):
#         like = Like(
#             user_id=fake.random_element(elements=users).id,
#             blog_post_id=fake.random_element(elements=blog_posts).id,
#             created_at=fake.date_time_this_decade(),
#             total=fake.random_int(min=1, max=100)
#         )
#         db.session.add(like)
#     db.session.commit()

# def generate_notifications():
#     logging.info("Generating notifications...")
#     blog_posts = BlogPost.query.all()
#     for post in blog_posts:
#         content = f"A new blog post '{post.title}' has been added!"
#         notification = Notification(
#             user_id=post.user_id,
#             type='new_blog_post',
#             content=content,
#             timestamp=datetime.utcnow()  # Use current timestamp
#         )
#         db.session.add(notification)
#     db.session.commit()

#     logging.info("Seed completed successfully!")

# if __name__ == '__main__':
#     with app.app_context():
#         db.create_all()
#         clear_data()
#         seed_data()
#         generate_notifications()

import logging
from faker import Faker
from datetime import datetime

# Local imports
from app import app
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, Notification

# Local imports
from app import app
from models import db, User, BlogPost, Community, Expert, Message, Comment, Like, Notification

# Initialize Faker
fake = Faker()

logging.basicConfig(level=logging.INFO)

def clear_data():
    logging.info("Clearing data...")
    meta = db.metadata
    for table in reversed(meta.sorted_tables):
        db.session.execute(table.delete())
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
    experts = []
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
        experts.append(expert)
    db.session.add_all(experts)
    db.session.commit()

    # Agriculture-specific titles and content ideas
    agriculture_titles = [
        "The Future of Organic Farming", "Innovative Techniques in Crop Rotation",
        "Sustainable Agriculture Practices", "The Role of Technology in Modern Farming",
        "Urban Agriculture: Growing Food in the City", "How Climate Change Affects Crop Yields",
        "The Benefits of Cover Crops", "Aquaponics: Combining Fish and Plants",
        "Regenerative Agriculture for Soil Health", "Agroforestry: Integrating Trees into Farmland",
        "The Impact of GMOs on Agriculture", "Precision Farming: Using Data to Improve Efficiency",
        "Beekeeping and Pollination in Agriculture", "The Importance of Biodiversity in Farming",
        "Hydroponics: Growing Plants Without Soil", "Agriculture Policy and Its Impact on Farmers",
        "The Economics of Small-Scale Farming", "Challenges and Opportunities in Livestock Farming",
        "Organic vs. Conventional Farming: A Comparative Analysis", "Farm-to-Table Movement: Connecting Producers and Consumers"
    ]

    agriculture_contents = [
        "In recent years, organic farming has gained popularity due to its health and environmental benefits. This article explores the future trends and innovations in organic agriculture.",
        "Crop rotation is a time-tested technique that helps improve soil health and prevent pest infestations. Learn about the latest innovations in crop rotation practices.",
        "Sustainable agriculture is essential for the long-term health of our planet. Discover various practices that can help make farming more sustainable.",
        "Technology is revolutionizing modern farming. From drones to precision agriculture, explore how tech advancements are shaping the future of agriculture.",
        "Urban agriculture is a growing trend in cities around the world. Find out how city dwellers are growing their own food and what benefits this brings.",
        "Climate change poses a significant threat to global crop yields. This article discusses how changing weather patterns are affecting agriculture.",
        "Cover crops offer numerous benefits, including soil protection and weed control. Learn about different types of cover crops and their uses.",
        "Aquaponics combines aquaculture and hydroponics to create a sustainable food production system. Explore the basics and benefits of aquaponics.",
        "Regenerative agriculture focuses on restoring soil health and biodiversity. Understand the principles and practices that make this approach effective.",
        "Agroforestry integrates trees into agricultural landscapes, providing multiple benefits. Discover how this practice can enhance farm productivity and sustainability.",
        "Genetically modified organisms (GMOs) have a significant impact on agriculture. This article examines the pros and cons of using GMOs in farming.",
        "Precision farming uses data and technology to optimize agricultural practices. Learn how this approach can increase efficiency and reduce waste.",
        "Beekeeping is crucial for pollination and agricultural productivity. Understand the role of bees in farming and how to start your own beekeeping operation.",
        "Biodiversity is vital for resilient agricultural systems. Explore the importance of maintaining diverse plant and animal species on farms.",
        "Hydroponics allows plants to grow without soil, using nutrient-rich water instead. Find out how hydroponic systems work and their advantages.",
        "Agriculture policy shapes the farming industry. This article analyzes recent policy changes and their impact on farmers.",
        "Small-scale farming faces unique economic challenges. Discover strategies to make small farms economically viable.",
        "Livestock farming presents both challenges and opportunities. Learn about best practices for managing livestock and improving productivity.",
        "Organic and conventional farming each have their strengths and weaknesses. This comparative analysis highlights key differences between the two approaches.",
        "The farm-to-table movement is reconnecting consumers with their food sources. Explore how this movement benefits both producers and consumers."
    ]

    # Preselected agriculture-based image URLs
    agriculture_images = [
    "https://media.licdn.com/dms/image/D4D12AQEnRXRI0c0PvQ/article-cover_image-shrink_600_2000/0/1680606704849?e=2147483647&v=beta&t=KITB8x7czxQk_7fH-FCGAJVuLlXtG8QnyXGkrJD_VL4",  # The Future of Organic Farming
    "https://usfarmersandranchers.org/wp-content/uploads/2020/06/benefits-of-crop-rotation-hero.jpg",  # Innovative Techniques in Crop Rotation
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9gTO_ViclR6Noy6YEdoYdZ8qlUwxr4y_q-ejtIC08QA&s",  # Sustainable Agriculture Practices
    "https://media.licdn.com/dms/image/D5612AQG9BrdO-8L_ug/article-cover_image-shrink_720_1280/0/1712651661867?e=2147483647&v=beta&t=QbiNF--N5SSXVbM7PDJqNsen6h26pJVcmHlyjhInREA",  # The Role of Technology in Modern Farming
    "https://media.licdn.com/dms/image/D5612AQH4kqF2uMaeZw/article-cover_image-shrink_720_1280/0/1686233297727?e=2147483647&v=beta&t=KfUxymq89QTT4CEwUVSwVmZssKmtoC-YiTbC_Fgp_2M",  # Urban Agriculture: Growing Food in the City
    "https://univdatos.com/wp-content/uploads/2021/09/5c74ded9925e7.jpg",  # How Climate Change Affects Crop Yields
    "https://www.sare.org/wp-content/uploads/pg4-NRCSAL12292-768x499.jpg",  # The Benefits of Cover Crops
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc61kMzTUb5aad7UNEr6ozap9Qvg4nEKpP2vsCggt5QA&s",  # Aquaponics: Combining Fish and Plants
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShNwIH8IUFvxGYDExCBxQ8Yh5mn2RPhdeVLly8mIWSWg&s",  # Regenerative Agriculture for Soil Health
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgMrFLVrzHNZMHH6-YoZTYlD1aiue2lFK-GK7PGq4PDw&s",  # Agroforestry: Integrating Trees into Farmland
    "https://www.farmprogress.com/sites/farmprogress/files/styles/article_feature_image/public/field/image/GMO_0.png?itok=QmMiOaZm",  # The Impact of GMOs on Agriculture
    "https://www.precisionag.com/wp-content/uploads/2021/01/precision-farming-technology-1280x720.jpg",  # Precision Farming: Using Data to Improve Efficiency
    "https://www.planetbee.org/wp-content/uploads/2019/05/beekeeping-in-schools.jpg",  # Beekeeping and Pollination in Agriculture
    "https://sustainable-secure-food-blog.com/wp-content/uploads/2020/07/biodiversity-farming.jpg",  # The Importance of Biodiversity in Farming
    "https://www.hydroponics.com/wp-content/uploads/2021/02/hydroponics-farming.jpg",  # Hydroponics: Growing Plants Without Soil
    "https://agfundernews.com/wp-content/uploads/2020/07/policy-change-impacts-farmers.jpg",  # Agriculture Policy and Its Impact on Farmers
    "https://www.thespruce.com/thmb/ibCai1Vuwm0eH5oVJpGuQzeIoRU=/2121x1193/smart/filters:no_upscale()/small-scale-farming-530232201-59c7f2b68c2a4c7cbe8dc005d5e83b03.jpg",  # The Economics of Small-Scale Farming
    "https://www.feedstrategy.com/wp-content/uploads/2021/03/livestock-farming-challenges.jpg",  # Challenges and Opportunities in Livestock Farming
    "https://foodprint.org/wp-content/uploads/2020/09/organic-vs-conventional-farming.jpg",  # Organic vs. Conventional Farming: A Comparative Analysis
    "https://foodandnutrition.org/wp-content/uploads/Food-to-Table-1200x630-1.jpg"  # Farm-to-Table Movement: Connecting Producers and Consumers
]

    # Generate fake blog posts
    num_blog_posts = 20
    blog_posts = []
    for _ in range(num_blog_posts):
        author = fake.random_element(elements=users)
        expert = fake.random_element(elements=experts)
        title = fake.random_element(elements=agriculture_titles)
        content = fake.random_element(elements=agriculture_contents)
        image = fake.random_element(elements=agriculture_images)
        blog_post = BlogPost(
            title=title,
            content=content,
            image=image,
            created_at=fake.date_time_this_decade(),
            user_id=author.id,
            expert_id=expert.id
        )
        blog_posts.append(blog_post)
    db.session.add_all(blog_posts)
    db.session.commit()

    # Generate fake communities
    communities = [
        {
            'name': 'AgroTech',
            'description': 'Use of technology in agriculture to improve yield, efficiency, and profitability.',
            'image': 'https://images.unsplash.com/photo-1707753911060-a61817f0222d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWdyaWN1bHR1cmFsJTIwbWFjaGluZXN8ZW58MHx8MHx8fDA%3D',
            'created_at': datetime.utcnow(),
            'user_id': fake.random_element(elements=users).id
        },
        {
            'name': 'GreenHarvest',
            'description': 'Premature cutting of grapes to reduce the crop six weeks before actual harvest.',
            'image': 'https://images.unsplash.com/photo-1669062265199-4e309ab44da3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8a2FsZXN8ZW58MHx8MHx8fDA%3D',
            'created_at': datetime.utcnow(),
            'user_id': fake.random_element(elements=users).id
        },
        {
            'name': 'AgroPoultry',
            'description': 'Poultry raised commercially or domestically for meat, eggs, and feathers.',
            'image': 'https://images.unsplash.com/photo-1614120263669-43911b47f0b2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvdWx0cnl8ZW58MHx8MHx8fDA%3D',
            'created_at': datetime.utcnow(),
            'user_id': fake.random_element(elements=users).id
        },
        {
            'name': 'AgroDairy',
            'description': 'Dairying, the branch of agriculture encompassing dairy animal breeding and utilization.',
            'image': 'https://images.unsplash.com/photo-1561043409-cebdcdba882a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGRhaXJ5JTIwZmFybXxlbnwwfHwwfHx8MA%3D%3D',
            'created_at': datetime.utcnow(),
            'user_id': fake.random_element(elements=users).id
        },
        {
            'name': 'Horticulture',
            'description': 'Branch of plant agriculture dealing with garden crops, fruits, vegetables, and ornamental plants.',
            'image': 'https://images.unsplash.com/photo-1566196725116-0527b2a8a25d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHxmbG93ZXJzfGVufDB8fDB8fHww',
            'created_at': datetime.utcnow(),
            'user_id': fake.random_element(elements=users).id
        }
    ]
    db.session.add_all([Community(**community_data) for community_data in communities])
    db.session.commit()

    # Generate fake messages
    num_messages = 50
    messages = []
    for _ in range(num_messages):
        sender = fake.random_element(elements=users)
        receiver = fake.random_element(elements=users)
        while receiver == sender:
            receiver = fake.random_element(elements=users)
        message = Message(
            content=fake.paragraph(),
            sender_id=sender.id,
            receiver_id=receiver.id,
            created_at=fake.date_time_this_decade()
        )
        messages.append(message)
    db.session.add_all(messages)
    db.session.commit()

    # Generate fake comments
    num_comments = 50
    comments = []
    for _ in range(num_comments):
        comment = Comment(
            content=fake.paragraph(),
            user_id=fake.random_element(elements=users).id,
            blog_post_id=fake.random_element(elements=blog_posts).id,
            created_at=fake.date_time_this_decade()
        )
        comments.append(comment)
    db.session.add_all(comments)
    db.session.commit()

    # Generate fake likes
    num_likes = 100
    likes = []
    for _ in range(num_likes):
        like = Like(
            user_id=fake.random_element(elements=users).id,
            blog_post_id=fake.random_element(elements=blog_posts).id,
            created_at=fake.date_time_this_decade(),
            total=fake.random_int(min=1, max=100)
        )
        likes.append(like)
    db.session.add_all(likes)
    db.session.commit()

def generate_notifications():
    logging.info("Generating notifications...")
    blog_posts = BlogPost.query.all()
    notifications = []
    for post in blog_posts:
        content = f"A new blog post '{post.title}' has been added!"
        notification = Notification(
            user_id=post.user_id,
            type='new_blog_post',
            content=content,
            timestamp=datetime.utcnow()
        )
        notifications.append(notification)
    db.session.add_all(notifications)
    db.session.commit()
    logging.info("Notifications generated successfully!")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        clear_data()
        seed_data()
        generate_notifications()
