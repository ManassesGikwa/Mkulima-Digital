import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import PostAuthor from '../components/PostAuthor';
import Thumbnail from '../images2/blog22.jpg';

const PostDetail = ({ postID }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const navigate = useNavigate(); // Use useNavigate for navigation

    const handleLike = () => {
        if (!isLiked) {
            // Simulate API call to increment like count (replace with actual backend call)
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

    const handleDelete = () => {
        fetch(`http://127.0.0.1:5555/blogposts/${postID}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                console.log('Post deleted successfully');
                navigate('/'); // Redirect to another page after deletion
            } else {
                console.error('Failed to delete post');
            }
        })
        .catch(error => {
            console.error('Error occurred while deleting post:', error);
        });
    };

    return (
        <section className="post-detail">
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor />
                    <div className="post-detail__buttons">
                        <Link to={`/posts/${postID}/edit`} className='btn sm primary'>Edit</Link>
                        <button className='btn sm danger' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <h1>This is the post title!</h1>
                <div className="post-detail__thumbnail">
                    <img src={Thumbnail} alt="Post Thumbnail" />
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet aliquid dolorem et sunt maxime corrupti aperiam magnam nemo facere numquam ducimus saepe eum error voluptate architecto nihil nulla, ratione consequuntur eligendi at, laborum voluptatibus, iure a minima. Aliquid, sed iste!
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
