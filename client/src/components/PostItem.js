import React, { useState } from 'react';
import './PostItem.css';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [isFollowed, setIsFollowed] = useState(post.isFollowed);

    const toggleLike = () => {
        // Update like status
        setIsLiked(!isLiked);
        // Update like count
        setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
        // You can implement logic here to send like/unlike request to the server if needed
    };

    const toggleFollow = () => {
        // Update follow status
        setIsFollowed(!isFollowed);
        // You can implement logic here to send follow/unfollow request to the server if needed
    };

    return (
        <article className="post">
            <div className="post__thumbnail">
                <Link to={`/posts/${post.id}`}>
                    <img src={post.image} alt={post.title} />
                </Link>
                <div className="post__content">
                    <h3>{post.title}</h3>
                    <p style={{ 'fontSize': '20px' }}>{post.content}</p>
                    <div className="post__footer">
                        <button className='btn category' onClick={toggleFollow}>
                            {isFollowed ? 'Following' : 'Follow'}
                        </button>
                        <button className='btn category' onClick={toggleLike}>
                            {isLiked ? 'Liked' : 'Like'}
                        </button>
                        <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
