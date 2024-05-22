import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post?.isLiked || false);
    const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
    const [isFollowed, setIsFollowed] = useState(post?.isFollowed || false);
    const [comments, setComments] = useState(post?.comments || []);
    const [commentText, setCommentText] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);

    const handleLike = () => {
        // Simulate API call to update like status and count
        setIsLiked(!isLiked);
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
        // In a real application, you would make a fetch request to update the like status on the server
    };

    const handleFollow = () => {
        // Simulate API call to update follow status
        setIsFollowed(!isFollowed);
        // In a real application, you would make a fetch request to update the follow status on the server
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            // Simulate API call to add a new comment
            const newComment = {
                id: comments.length + 1,
                text: commentText,
                user: "Current User", // You can replace this with the actual user data
                timestamp: new Date().toISOString() // Timestamp for sorting comments
            };
            setComments([...comments, newComment]);
            setCommentText("");
            // In a real application, you would make a fetch request to add the comment on the server
        }
    };

    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    return (
        <article className="post">
            {post && (
                <>
                    <div className="post__thumbnail">
                        <img src={post.image} alt={post.title} />
                    </div>
                    <div className="post__content">
                        <Link to={`/blogposts/${post.id}`}>
                            <h3>{post.title}</h3>
                            <p style={{'fontSize':'24px'}}>{post.content}</p>
                        </Link>
                        <div className="post__footer">
                            <button className='btn category' onClick={handleFollow}>
                                {isFollowed ? 'Following' : 'Follow'}
                            </button>
                            <button className='btn category' onClick={handleLike}>
                                {isLiked ? 'Liked' : 'Like'}
                            </button>
                            <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                        </div>
                        <div className="post__comments">
                            <form onSubmit={handleCommentSubmit}>
                                <input 
                                    type="text" 
                                    value={commentText} 
                                    onChange={(e) => setCommentText(e.target.value)} 
                                    placeholder="Add a comment..."
                                />
                                <button type="submit">Comment</button>
                            </form>
                            <div className="comments-list">
                                {comments.map(comment => (
                                    <div key={comment.id} className="comment">
                                        <p><strong>{comment.user}:</strong> {comment.text}</p>
                                        <small>{comment.timestamp}</small>
                                    </div>
                                ))}
                            </div>
                            {comments.length > 1 && (
                                <button className="toggle-comments-btn" onClick={toggleComments}>
                                    {showAllComments ? 'Hide comments' : 'View all comments'}
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </article>
    );
};

export default PostItem;
