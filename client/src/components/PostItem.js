import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostDetail from '../pages/PostDetail';
import './PostItem.css';

const PostItem = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        // Fetch all blog posts from '/blogposts'
        fetch('/blogposts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleClick = (postId) => {
        // Find the selected post by postId
        const post = posts.find(post => post.id === postId);
        setSelectedPost(post);
    };

    return (
        <article className="post">
            {posts.map(post => (
                <div className="post__thumbnail" key={post.id}>
                    <Link to={`/posts/${post.id}`} onClick={() => handleClick(post.id)}>
                        <img src={post.image} alt={post.title} />
                    </Link>
                    <div className="post__content">
                        <h3>{post.title}</h3>
                        <p style={{ 'fontSize': '20px' }}>{post.content}</p>
                    </div>
                </div>
            ))}
            {selectedPost && (
                <div className="enlarged-post-details">
                    <PostDetail post={selectedPost} onClose={() => setSelectedPost(null)} />
                </div>
            )}
        </article>
    );
};

export default PostItem;
