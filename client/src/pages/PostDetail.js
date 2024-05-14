import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from '../components/PostAuthor';
import Thumbnail from '../images2/blog22.jpg';

const PostDetail = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);

    const handleLike = () => {
        if (!isLiked) {
            // Simulate API call to increment like count (replace with actual backend call)
            // For demo purposes, we'll just increment the like count locally
            setLikeCount(likeCount + 1);
            setIsLiked(true);
        }
    };

    const handleFollow = () => {
        if (!isFollowed) {
            // Simulate API call to perform follow action (replace with actual backend call)
            setIsFollowed(true);
        }
    };

    return (
        <section className="post-detail">
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor />
                    <div className="post-detail__buttons">
                        <Link to={`/posts/werwer/edit`} className='btn sm primary'>Edit</Link>
                        <Link to={`/posts/werwer/delete`} className='btn sm danger'>Delete</Link>
                    </div>
                </div>
                <h1>This is the post title!</h1>
                <div className="post-detail__thumbanail">
                    <img src={Thumbnail} alt="" />
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquid dolorem et sunt maxime corrupti aperiam magnam nemo facere numquam ducimus saepe eum error voluptate architecto nihil nulla, ratione consequuntur eligendi at, laborum voluptatibus, iure a minima. Aliquid, sed iste!
                </p>
                <p>
                    {/* Add more paragraphs as needed */}
                </p>

                <div className="post-detail__actions">
                    <button className='btn category' onClick={handleFollow}>
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
                    <button className='btn category' onClick={handleLike}>
                        {isLiked ? 'Liked' : 'Like'}
                    </button>
                    <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                </div>
            </div>
        </section>
    );
};

export default PostDetail;
