import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

const PostItem = ({ postID, category, title, description, authorID, thumbnail }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);

    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0,30) + '...' : title;

    const handleLike = () => {
        if (!isLiked) {
            setLikeCount(likeCount + 1);
            setIsLiked(true);
        }
    };

    const handleFollow = () => {
        if (!isFollowed) {
            setIsFollowed(true);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (commentText.trim()) {
            setComments([...comments, commentText]);
            setCommentText("");
        }
    };

    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    return (
        <article className="post">
            <PostAuthor authorID={authorID} />
            <div className="post__thumbnail">
                <img src={thumbnail} alt={title} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                    <p>{shortDescription}</p>
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
                        {comments.slice(0, 1).map((comment, index) => (
                            <p key={index}>{comment}</p>
                        ))}
                        {showAllComments && comments.slice(1).map((comment, index) => (
                            <p key={index + 1}>{comment}</p>
                        ))}
                        {comments.length > 1 && (
                            <button className="toggle-comments-btn" onClick={toggleComments}>
                                {showAllComments ? 'Hide comments' : 'View all comments'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostItem;
