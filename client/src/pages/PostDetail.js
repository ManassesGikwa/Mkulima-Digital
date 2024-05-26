import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false); // State to track like status
    const [likeCount, setLikeCount] = useState(0); // State to track like count
    const [isFollowed, setIsFollowed] = useState(false); // State to track follow status
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the specific post detail from '/blogposts/:postId'
        fetch(`/blogposts/${id}`)
            .then(response => response.json())
            .then(data => {
                setPost(data);
                // Set initial like status from post data
                setIsLiked(data.isLiked);
                // Set initial like count from post data
                setLikeCount(data.likeCount);
                // Set initial follow status from post data
                setIsFollowed(data.isFollowed);
            })
            .catch(error => console.error('Error fetching post detail:', error));
    }, [id]);

    // Function to toggle like status
    const toggleLike = () => {
        // Update like status
        setIsLiked(!isLiked);
        // Update like count
        setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
        // You can implement logic here to send like/unlike request to the server if needed
    };

    // Function to toggle follow status
    const toggleFollow = () => {
        // Update follow status
        setIsFollowed(!isFollowed);
        // You can implement logic here to send follow/unfollow request to the server if needed
    };

    if (!post) {
        return <div>Loading...</div>; // Display a loading indicator while waiting for data
    }

    return (
        <div className="post-detail">
            <div className="post-detail__header">
                <h2>{post.title}</h2>
            </div>
            <div className="post-detail__content">
                <img src={post.image} alt={post.title} />
                <p>{post.content}</p>
            </div>
            <div className="post-detail__likes-comments">
                <div className="likes">
                    <button className='btn category' onClick={toggleLike}>
                        {isLiked ? 'Liked' : 'Like'}
                    </button>
                    <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                </div>
                <div className="follow">
                    <button className='btn category' onClick={toggleFollow}>
                        {isFollowed ? 'Following' : 'Follow'}
                    </button>
                </div>
                <div className="comments">
                    {/* Add comment functionality here */}
                </div>
            </div>
            <div className="post-detail__footer">
                <Link to={`/blogs/${id}/edit`} className="edit-button">
                    Edit
                </Link>
                <button onClick={() => navigate('/blogs')} className="button back">
                    Back
                </button>
            </div>
        </div>
    );
};

export default PostDetail;