import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({ postID, category, title, description, authorID, thumbnail }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);

    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0,30) + '...' : title;

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
        <article className="post">
            <div className="post__thumbnail">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                    <p>{shortDescription}</p>
                </Link>
                
                <div className="post__footer">
                    <PostAuthor authorID={authorID} />
                    <button className='btn category' onClick={handleFollow}>
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
                    <button className='btn category' onClick={handleLike}>
                        {isLiked ? 'Liked' : 'Like'}
                    </button>
                    <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
