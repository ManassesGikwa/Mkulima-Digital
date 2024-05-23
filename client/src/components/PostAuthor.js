import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images2/avatar1.jpg'; // Default avatar

const PostAuthor = ({ authorID, postTime }) => {
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`http://localhost:5555/experts/${authorID}`); // Replace with your actual API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch author');
                }
                const data = await response.json();
                setAuthor(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAuthor();
    }, [authorID]);

    if (!author) {
        return <p>Loading author...</p>;
    }

    return (
        <Link to={`http://localhost:5555/experts/${authorID}`} className="post__author">
            <div className="post__author-avatar">
                <img src={author.avatar || Avatar} alt={author.name} />
            </div>
            <div className="post__author-details">
                <h5>By: {author.name}</h5>
                <small>{new Date(postTime).toLocaleString()}</small>
            </div>
        </Link>
    );
};

export default PostAuthor;
