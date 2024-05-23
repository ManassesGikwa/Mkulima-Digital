import React, { useState, useEffect } from 'react';

const PostDetail = ({ postId, onClose }) => {
    const [post, setPost] = useState(null);

    useEffect(() => {
        // Fetch the specific post detail from '/blogposts/:postId'
        fetch(`/blogposts/${postId}`)
            .then(response => response.json())
            .then(data => setPost(data))
            .catch(error => console.error('Error fetching post detail:', error));
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>; // Display a loading indicator while waiting for data
    }

    return (
        <div className="post-detail">
            <div className="post-detail__header">
                <h2>{post.title}</h2>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
            <div className="post-detail__content">
                <img src={post.image} alt={post.title} />
                <p>{post.content}</p>
                <div className="post-detail__footer">
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
    );
};

export default PostDetail;
