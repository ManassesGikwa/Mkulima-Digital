import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch posts from the API
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5555/blogposts'); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <h2 className="center">Loading...</h2>;
    }

    if (error) {
        return <h2 className="center">Error: {error}</h2>;
    }

    return (
        <section className="posts">
            {posts.length > 0 ? (
                <div className="container posts__container">
                    {posts.map(({ id, title, content, image, created_at, user_id, expert_id }) => (
                        <PostItem
                            key={id}
                            postID={id}
                            title={title}
                            content={content}
                            image={image}
                            time={created_at}
                            userID={user_id}
                            expertID={expert_id}
                        />
                    ))}
                </div>
            ) : (
                <h2 className="center">No Posts Found!</h2>
            )}
        </section>
    );
};

export default Posts;