import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from '../components/PostAuthor';
import Thumbnail from '../images2/blog22.jpg';

const PostDetail = () => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);

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
        <section className="post-detail">
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor />
                    <div className="post-detail__buttons">
                        <Link to={`/posts/werwer/edit`} className='btn sm primary'>Edit</Link>
                        <Link to={`/posts/werwer/delete`} className='btn sm danger'>Delete</Link>
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
        </section>
    );
};

export default PostDetail;
