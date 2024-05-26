import React, { useState, useEffect } from 'react';

const EditPost = ({ postId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // Fetch post details when component mounts
        fetch(`http://127.0.0.1:5555/blogposts/${postId}`)
            .then(response => response.json())
            .then(data => {
                setTitle(data.title);
                setContent(data.content);
            })
            .catch(error => console.error('Error fetching post details:', error));
    }, [postId]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://127.0.0.1:5555/blogposts/${postId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content }),
        })
        .then((response) => {
            if (response.ok) {
                console.log('Post updated successfully');
                // Handle success - redirect or show confirmation
            } else {
                console.error('Failed to update post');
                // Handle failure - show error message
            }
        })
        .catch(error => {
            console.error('Error occurred while updating post:', error);
        });
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
                <label>Content:</label>
                <textarea value={content} onChange={handleContentChange} />
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditPost;