// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import './PostDetail.css';

// const PostDetail = () => {
//     const [post, setPost] = useState(null);
//     const [isLiked, setIsLiked] = useState(false); // State to track like status
//     const [likeCount, setLikeCount] = useState(0); // State to track like count
//     const [isFollowed, setIsFollowed] = useState(false); // State to track follow status
//     const { id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch the specific post detail from '/blogposts/:postId'
//         fetch(`/blogposts/${id}`)
//             .then(response => response.json())
//             .then(data => {
//                 setPost(data);
//                 // Set initial like status from post data
//                 setIsLiked(data.isLiked);
//                 // Set initial like count from post data
//                 setLikeCount(data.likeCount);
//                 // Set initial follow status from post data
//                 setIsFollowed(data.isFollowed);
//             })
//             .catch(error => console.error('Error fetching post detail:', error));
//     }, [id]);

//     // Function to toggle like status
//     const toggleLike = () => {
//         // Update like status
//         setIsLiked(!isLiked);
//         // Update like count
//         setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
//         // You can implement logic here to send like/unlike request to the server if needed
//     };

//     // Function to toggle follow status
//     const toggleFollow = () => {
//         // Update follow status
//         setIsFollowed(!isFollowed);
//         // You can implement logic here to send follow/unfollow request to the server if needed
//     };

//     if (!post) {
//         return <div>Loading...</div>; // Display a loading indicator while waiting for data
//     }

//     return (
//         <div className="post-detail">
//             <div className="post-detail__header">
//                 <h2>{post.title}</h2>
//             </div>
//             <div className="post-detail__content">
//                 <img src={post.image} alt={post.title} />
//                 <p>{post.content}</p>
//             </div>
//             <div className="post-detail__likes-comments">
//                 <div className="likes">
//                     <button className='btn category' onClick={toggleLike}>
//                         {isLiked ? 'Liked' : 'Like'}
//                     </button>
//                     <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
//                 </div>
//                 <div className="follow">
//                     <button className='btn category' onClick={toggleFollow}>
//                         {isFollowed ? 'Following' : 'Follow'}
//                     </button>
//                 </div>
//                 <div className="comments">
//                     {/* Add comment functionality here */}
//                 </div>
//             </div>
//             <div className="post-detail__footer">
//                 <Link to={`/blogs/${id}/edit`} className="edit-button">
//                     Edit
//                 </Link>
//                 <button onClick={() => navigate('/blogs')} className="button back">
//                     Back
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default PostDetail;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaUserPlus, FaUserMinus } from 'react-icons/fa'; // Import icons from Font Awesome
import './PostDetail.css';
import EditPost from './EditPost';

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [isLiked, setIsLiked] = useState(false); // State to track like status
    const [likeCount, setLikeCount] = useState(0); // State to track like count
    const [isFollowed, setIsFollowed] = useState(false); // State to track follow status
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null); // State to store error messages
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
                // Fetch comments for the post
                fetchComments();
            })
            .catch(error => {
                console.error('Error fetching post detail:', error);
                setError('Error fetching post detail');
            });
    }, [id]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/blogposts/${id}/comments`);
            if (response.ok) {
                const data = await response.json();
                setComments(data);
            } else {
                setError('Failed to fetch comments'); // Set error message
            }
        } catch (error) {
            setError('Error fetching comments: ' + error.message); // Set error message
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/blogposts/${id}/comments`, { // Make sure to use the correct endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newComment,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                setComments(prevComments => [...prevComments, data]);
                setNewComment('');
            } else {
                setError('Failed to add comment'); // Set error message
            }
        } catch (error) {
            setError('Error adding comment: ' + error.message); // Set error message
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`/comments/${commentId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
            } else {
                setError('Failed to delete comment'); // Set error message
            }
        } catch (error) {
            setError('Error deleting comment: ' + error.message); // Set error message
        }
    };

    const handleLike = async () => {
        try {
            const response = await fetch('/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    postId: id,
                }),
            });
            if (response.ok) {
                setIsLiked(true);
                setLikeCount(prevCount => prevCount + 1);
            } else {
                setError('Failed to like post');
            }
        } catch (error) {
            setError('Error liking post: ' + error.message);
        }
    };

    const handleUnlike = async () => {
        try {
            const response = await fetch(`/likes/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setIsLiked(false);
                setLikeCount(prevCount => prevCount - 1);
            } else {
                setError('Failed to unlike post');
            }
        } catch (error) {
            setError('Error unliking post: ' + error.message);
        }
    };

    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
    };

    if (!post) {
        return <div>Loading...</div>; 
    }
    const handleEditClick = () => {
        setIsEditing(true); // Set isEditing to true when the user clicks on the Edit button
    };

    const handleSubmit = (updatedPost) => {
        console.log('Post updated:', updatedPost);
        setIsEditing(false); // Set isEditing to false after the post is updated
    };

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
                    <button className='icon-btn' onClick={isLiked ? handleUnlike : handleLike}>
                        {isLiked ? <FaHeart className="filled-heart" /> : <FaRegHeart className="outlined-heart" />}
                    </button>
                    <span className="like-count">{post.total_likes}{likeCount} {likeCount === 1 ? 'like' : 'likes'} </span>
                </div>
                <div className="follow">
                    <button className='icon-btn' onClick={toggleFollow}> 
                        {isFollowed ? <FaUserMinus /> : <FaUserPlus />}
                    </button>
                </div>
                {error && <div className="error-message">{error}</div>} {/* Display error message if error state is set */}
                <div className="comments-section">
                    <h4>Comments</h4>
                    {comments.length > 0 ? (
                        <ul>
                            {comments.map(comment => (
                                <li key={comment.id}>
                                    <div>{comment.text}</div>
                                    <div>
                                        <button className="delete-comment" onClick={() => handleDeleteComment(comment.id)}>X</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No comments yet. Be the first to comment!</p>
                    )}
                    <form onSubmit={handleSubmitComment}>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div className="post-detail__footer">
                <button onClick={handleEditClick} className="button edit">
                    Edit
                </button>
                {/* Conditionally render the EditPost component */}
                {isEditing && <EditPost onSubmit={handleSubmit} />}
                <button onClick={() => navigate('/blogs')} className="button back">
                    Back
                </button>
            </div>
        </div>
    );
};

export default PostDetail;
