import React from 'react';
import './PostItem.css';

const PostItem = ({ post }) => {
    return (
        <article className="post">
            <div className="post__thumbnail">
                <img src={post.image} alt={post.title} />
                <div className="post__content">
                    <h3>{post.title}</h3>
                    <p style={{ 'fontSize': '20px' }}>{post.content}</p>
                    <div className="post__footer">
                        <button className='btn category'>
                            {post.isFollowed ? 'Following' : 'Follow'}
                        </button>
                        <button className='btn category'>
                            {post.isLiked ? 'Liked' : 'Like'}
                        </button>
                        <span className="like-count">{post.likeCount} {post.likeCount === 1 ? 'like' : 'likes'}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
