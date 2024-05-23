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

const PostItem = ({ postID, title, content, userID, expertID, image, time }) => {
const PostItem = ({ postID, title, content, userID, expertID, image, time }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isFollowed, setIsFollowed] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [showAllComments, setShowAllComments] = useState(false);
    const [authorID, setAuthorID] = useState(null);
    const [authorType, setAuthorType] = useState(null);

    useEffect(() => {
        // Determine the author type
        if (userID) {
            setAuthorID(userID);
            setAuthorType('user');
        } else if (expertID) {
            setAuthorID(expertID);
            setAuthorType('expert');
        }

        // Fetch initial data for likes, follows, and comments
        const fetchData = async () => {
            try {
                const [likesResponse, followsResponse, commentsResponse] = await Promise.all([
                    fetch(`http://localhost:5555/blogposts/${postID}/likes`),
                    fetch(`http://localhost:5555/blogposts/${postID}/follows`),
                    fetch(`http://localhost:5555/blogposts/${postID}/comments`)
                ]);

                if (!likesResponse.ok || !followsResponse.ok || !commentsResponse.ok) {
                    throw new Error('Failed to fetch post data');
                }

                const [likesData, followsData, commentsData] = await Promise.all([
                    likesResponse.json(),
                    followsResponse.json(),
                    commentsResponse.json()
                ]);

                setLikeCount(likesData.count);
                setIsLiked(likesData.isLiked);
                setIsFollowed(followsData.isFollowed);
                setComments(commentsData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [postID, userID, expertID]);

    const handleLike = async () => {
        try {
            const response = await fetch(`http://localhost:5555/blogposts/${postID}/likes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ like: !isLiked })
            });

            if (!response.ok) {
                throw new Error('Failed to update like');
            }

            const data = await response.json();
            setLikeCount(data.count);
            setIsLiked(data.isLiked);
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleFollow = async () => {
        try {
            const response = await fetch(`http://localhost:5555/blogposts/${postID}/follows`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ follow: !isFollowed })
            });

            if (!response.ok) {
                throw new Error('Failed to update follow');
            }

            const data = await response.json();
            setIsFollowed(data.isFollowed);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (postId) => {
        // Find the selected post by postId
        const post = posts.find(post => post.id === postId);
        setSelectedPost(post);
    const handleCommentSubmit = async (e) => {
    const handleCommentSubmit = async (e) => {
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
            {authorID && <PostAuthor authorID={authorID} authorType={authorType} postTime={time} />}
            {authorID && <PostAuthor authorID={authorID} authorType={authorType} postTime={time} />}
            <div className="post__thumbnail">
                <img src={image} alt={title} />
                <img src={image} alt={title} />
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
                            <p key={index}>{comment.text}</p>
                        ))}
                        {showAllComments && comments.slice(1).map((comment, index) => (
                            <p key={index + 1}>{comment.text}</p>
                            <p key={index + 1}>{comment.text}</p>
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
