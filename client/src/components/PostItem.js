// import React, { useState, useEffect } from 'react';
// import './PostItem.css';
// import { Link } from 'react-router-dom';
// import { FaHeart, FaRegHeart, FaComment, FaUserPlus, FaUserMinus } from 'react-icons/fa'; // Import icons from Font Awesome

// const PostItem = ({ post }) => {
//     const [isLiked, setIsLiked] = useState(post.isLiked);
//     const [likeCount, setLikeCount] = useState(post.likeCount);
//     const [isFollowed, setIsFollowed] = useState(post.isFollowed);
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//     const [error, setError] = useState(null); // State to store error messages

//     useEffect(() => {
//         if (post.commentsCount > 0) {
//             fetchComments();
//         }
//     }, [post.commentsCount]);

//     const fetchComments = async () => {
//         try {
//             const response = await fetch(`/comments?postId=${post.id}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 setComments(data);
//             } else {
//                 setError('Failed to fetch comments'); // Set error message
//             }
//         } catch (error) {
//             setError('Error fetching comments: ' + error.message); // Set error message
//         }
//     };

//     const handleSubmitComment = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch('http://127.0.0.1:5555/comments', { // Make sure to use the correct endpoint
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     postId: post.id,
//                     text: newComment,
//                 }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setComments(prevComments => [...prevComments, data]);
//                 setNewComment('');
//             } else {
//                 setError('Failed to add comment'); // Set error message
//             }
//         } catch (error) {
//             setError('Error adding comment: ' + error.message); // Set error message
//         }
//     };

//     const handleDeleteComment = async (commentId) => {
//         try {
//             const response = await fetch(`/comments/${commentId}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 setComments(prevComments => prevComments.filter(comment => comment.id !== commentId));
//             } else {
//                 setError('Failed to delete comment'); // Set error message
//             }
//         } catch (error) {
//             setError('Error deleting comment: ' + error.message); // Set error message
//         }
//     };

//     const toggleLike = () => {
//         setIsLiked(!isLiked);
//         setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
//     };

//     const toggleFollow = () => {
//         setIsFollowed(!isFollowed);
//     };

//     useEffect(() => {
//         // Fetch like count for the post when the component mounts
//         fetchLikes();
//     }, []);

//     const fetchLikes = async () => {
//         try {
//             const response = await fetch(`http://127.0.0.1:5555/likes?postId=${post.id}`);
//             if (response.ok) {
//                 const data = await response.json();
//                 // Calculate like count from the response data
//                 const likesCount = data.length;
//                 setLikeCount(likesCount);
//             } else {
//                 setError('Failed to fetch likes');
//             }
//         } catch (error) {
//             setError('Error fetching likes: ' + error.message);
//         }
//     };

//     const handleLike = async () => {
//         try {
//             console.log('Attempting to like post...');
//             const response = await fetch('http://127.0.0.1:5555/likes', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     postId: post.id,
//                 }),
//             });
//             console.log('Response:', response);
//             if (response.ok) {
//                 setIsLiked(true);
//                 setLikeCount(prevCount => prevCount + 1);
//             } else {
//                 setError('Failed to like post');
//             }
//         } catch (error) {
//             setError('Error liking post: ' + error.message);
//         }
//     };
    

//     const handleUnlike = async () => {
//         try {
//             const response = await fetch(`/likes/${post.id}`, {
//                 method: 'DELETE',
//             });
//             if (response.ok) {
//                 setIsLiked(false);
//                 setLikeCount(prevCount => prevCount - 1);
//             } else {
//                 setError('Failed to unlike post');
//             }
//         } catch (error) {
//             setError('Error unliking post: ' + error.message);
//         }
//     };

//     return (
//         <article className="post">
//             <div className="post__thumbnail">
//                 <Link to={`/posts/${post.id}`}>
//                     <img src={post.image} alt={post.title} />
//                 </Link>
//                 <div className="post__content">
//                     <h3>{post.title}</h3>
//                     <p style={{ 'fontSize': '20px' }}>{post.content}</p>
//                     <div className="post__footer">
//                         <button className='icon-btn' onClick={toggleFollow}>
//                             {isFollowed ? <FaUserMinus /> : <FaUserPlus />}
//                         </button>
//                         <button className='icon-btn' onClick={isLiked ? handleUnlike : handleLike}>
//                             {isLiked ? <FaHeart /> : <FaRegHeart />}
//                         </button>
//                         <span className="like-count">{post.total_likes}{likeCount === 1 ? 'like' : 'likes'}</span>
//                     </div>
//                 </div>
//             </div>
//             {error && <div className="error-message">{error}</div>} {/* Display error message if error state is set */}
//             {comments.length > 0 && (
//                 <div className="comments-section">
//                     <h4>Comments</h4>
//                     <ul>
//                         {comments.map(comment => (
//                             <li key={comment.id}>
//                                 <div>{comment.text}</div>
//                                 <div>
//                                     <button className="delete-comment" onClick={() => handleDeleteComment(comment.id)}>X</button>
//                                 </div>
//                             </li>
//                         ))}
//                     </ul>
//                     <form onSubmit={handleSubmitComment}>
//                         <input 
//                             type="text" 
//                             placeholder="Add a comment..." 
//                             value={newComment} 
//                             onChange={(e) => setNewComment(e.target.value)} 
//                         />
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>
//             )}
//         </article>
//     );
// };

// export default PostItem;
import React, { useState, useEffect } from 'react';
import './PostItem.css';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaComment, FaUserPlus, FaUserMinus } from 'react-icons/fa'; // Import icons from Font Awesome

const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [isFollowed, setIsFollowed] = useState(post.isFollowed);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState(null); // State to store error messages

    useEffect(() => {
        if (post.commentsCount > 0) {
            fetchComments();
        }
    }, [post.commentsCount]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`/blogposts/${post.id}/comments`);
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
            const response = await fetch(`/blogposts/${post.id}/comments`, { // Make sure to use the correct endpoint
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
            const response = await fetch(`/blogposts/${post.id}/comments`, {
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

    const toggleLike = () => {
        setIsLiked(!isLiked);
        setLikeCount(prevCount => (isLiked ? prevCount - 1 : prevCount + 1));
    };

    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
    };

    useEffect(() => {
        // Fetch like count for the post when the component mounts
        fetchLikes();
    }, []);

    const fetchLikes = async () => {
        try {
            const response = await fetch(`/likes?postId=${post.id}`);
            if (response.ok) {
                const data = await response.json();
                // Calculate like count from the response data
                const likesCount = data.length;
                setLikeCount(likesCount);
            } else {
                setError('Failed to fetch likes');
            }
        } catch (error) {
            setError('Error fetching likes: ' + error.message);
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
                    postId: post.id,
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
            const response = await fetch(`/likes/${post.id}`, {
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
                        <button className='icon-btn' onClick={toggleFollow}>
                            {isFollowed ? <FaUserMinus /> : <FaUserPlus />}
                        </button>
                        <button className='icon-btn' onClick={isLiked ? handleUnlike : handleLike}>
                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                        </button>
                        <span className="like-count">{post.total_likes} {likeCount === 1 ? 'like' : 'likes'}</span>
                    </div>
                </div>
            </div>
            {error && <div className="error-message">{error}</div>} 
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
        </article>
    );
};

export default PostItem;