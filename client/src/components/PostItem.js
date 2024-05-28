// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './PostItem.css';

// const PostItem = ({ post }) => {
//     const [isLiked, setIsLiked] = useState(post.isLiked);
//     const [likeCount, setLikeCount] = useState(post.likeCount);
//     const [isFollowed, setIsFollowed] = useState(post.isFollowed);

//     useEffect(() => {
//         setIsLiked(post.isLiked);
//         setLikeCount(post.likeCount);
//         setIsFollowed(post.isFollowed);
//     }, [post]);

//     const handleLike = () => {
//         fetch(`http://127.0.0.1:5555/posts/${post.id}/like`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ user_id: 1 })  // Replace with actual user ID
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to like post');
//             }
//             return response.json();
//         })
//         .then(data => {
//             // Update isLiked and likeCount based on the response
//             setIsLiked(true);
//             setLikeCount(data.likeCount);
//         })
//         .catch(error => {
//             console.error('Error toggling like:', error);
//         });
//     };

//     const toggleFollow = () => {
//         setIsFollowed(!isFollowed);
//         // Optional: Implement follow/unfollow request to server if needed
//     };

//     return (
//         <article className="post">
//             <div className="post__thumbnail">
//                 <Link to={`/posts/${post.id}`}>
//                     <img src={post.image} alt={post.title} />
//                 </Link>
//                 <div className="post__content">
//                     <h3>{post.title}</h3>
//                     <p style={{ fontSize: '20px' }}>{post.content}</p>
//                     <div className="post__footer">
//                         <button className='btn category' onClick={toggleFollow}>
//                             {isFollowed ? 'Following' : 'Follow'}
//                         </button>
//                         <button className='btn category' onClick={handleLike}>
//                             {isLiked ? 'Liked' : 'Like'}
//                         </button>
//                         <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
//                     </div>
//                 </div>
//             </div>
//         </article>
//     );
// };

// export default PostItem;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostItem.css';

const PostItem = ({ post }) => {
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [isFollowed, setIsFollowed] = useState(post.isFollowed);

    useEffect(() => {
        setIsLiked(post.isLiked);
        setLikeCount(post.likeCount);
        setIsFollowed(post.isFollowed);
    }, [post]);

    const handleLike = () => {
        fetch(`http://127.0.0.1:5555/posts/${post.id}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id: 1 })  // Replace with actual user ID
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to like post');
            }
            return response.json();
        })
        .then(data => {
            setIsLiked(true);
            setLikeCount(data.likeCount);
        })
        .catch(error => {
            console.error('Error toggling like:', error);
        });
    };

    const toggleFollow = () => {
        setIsFollowed(!isFollowed);
        // Optional: Implement follow/unfollow request to server if needed
    };

    return (
        <article className="post">
            <div className="post__thumbnail">
                <Link to={`/posts/${post.id}`}>
                    <img src={post.image} alt={post.title} />
                </Link>
                <div className="post__content">
                    <h3>{post.title}</h3>
                    <p style={{ fontSize: '20px' }}>{post.content}</p>
                    <div className="post__footer">
                        <button className='btn category' onClick={toggleFollow}>
                            {isFollowed ? 'Following' : 'Follow'}
                        </button>
                        <button className='btn category' onClick={handleLike}>
                            {isLiked ? 'Liked' : 'Like'}
                        </button>
                        <span className="like-count">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default PostItem;

