import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './CreatePost.css';

const CreatePost = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [image, setImage] = useState(null); // State to store the selected image file

    // const handleImageChange = (event) => {
    //     const selectedImage = event.target.files[0];
    //     setImage(selectedImage);
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object to send both text and file data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        // formData.append('image', image);

        // Send a POST request to the "/blogposts" endpoint with the new post data
        fetch('/blogposts', {
            method: 'POST',
            body: formData  // Send the FormData object directly
        })
        .then(response => {
            if (response.ok) {
                // Post successfully created, you can handle this accordingly
                console.log('New post created successfully');
                // Close the form
                onClose();
            } else {
                // Post creation failed, handle error
                console.error('Failed to create new post');
            }
        })
        .catch(error => {
            console.error('Error creating new post:', error);
        });
    };

    return (
        <div className="create-post-container">
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text" 
                        id="title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content:</label>
                    <textarea 
                        id="content" 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="image">Choose Image:</label>
                    <input 
                        type="file" 
                        id="image" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        required 
                    />
                </div> */}
                <div className="form-actions">
                    <Button type="submit" className='submit-button'>Submit</Button>
                    <Button type="button"  className='cancel-button' onClick={onClose}>Cancel</Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;


