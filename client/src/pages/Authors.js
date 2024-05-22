import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Authors = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch authors from the API
        const fetchAuthors = async () => {
            try {
                const response = await fetch('YOUR_AUTHORS_API_ENDPOINT');
                if (!response.ok) {
                    throw new Error('Failed to fetch authors');
                }
                const data = await response.json();
                setAuthors(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAuthors();
    }, []);

    return (
        <section className="authors">
            {loading ? (
                <h2 className="center">Loading...</h2>
            ) : error ? (
                <h2 className="center">Error: {error}</h2>
            ) : authors.length > 0 ? (
                <div className="container authors__container">
                    {authors.map(({ id, avatar, name, postCount }) => (
                        <Link key={id} to={`/posts/users/${id}`} className='author'>
                            <div className="author__avatar">
                                <img src={avatar} alt={`Image of ${name}`} />
                            </div>
                            <div className="author__info">
                                <h4>{name}</h4>
                                <p>{postCount} {postCount === 1 ? 'post' : 'posts'}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <h2 className='center'>No users/authors found.</h2>
            )}
        </section>
    );
};

export default Authors;