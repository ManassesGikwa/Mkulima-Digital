import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null); // State to store the selected image file
    const [imageUrl, setImageUrl] = useState(null); // State to store the image URL for preview
    const [loading, setLoading] = useState(false); // State to track form submission status
    const [error, setError] = useState(null); // State to track error messages

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Check if an image is selected
            if (!image) {
                throw new Error('Please select an image');
            }

            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append('file', image);
            formData.append('upload_preset', 'zsegbm6t'); // Replace with your Cloudinary upload preset
            const response = await axios.post('https://api.cloudinary.com/v1_1/dmnnoyi14/image/upload', formData);

            // Create post data with image URL
            const postData = {
                title,
                content,
                image: response.data.secure_url, // Use 'image' to match your backend model
            };

            // Send post data to backend
            await axios.post('http://127.0.0.1:5555/blogposts', postData);

            // Reset form fields and close modal
            setTitle('');
            setContent('');
            setImage(null);
            setImageUrl(null);
            onClose();
        } catch (error) {
            setError(error.message || 'Failed to create new post');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
        // Set image URL for preview
        setImageUrl(URL.createObjectURL(selectedImage));
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
                <div className="form-group">
                    <label htmlFor="image">Choose Image:</label>
                    <input 
                        type="file" 
                        id="image" 
                        onChange={handleImageChange} 
                        accept="image/*" 
                        required 
                    />
                </div>
                {imageUrl && <img src={imageUrl} alt="Selected Image" className="image-preview" />}
                {error && <p className="error-message">{error}</p>}
                <div className="form-actions">
                    <Button type="submit" className='submit-button' disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                    <Button type="button" className='cancel-button' onClick={onClose} disabled={loading}>
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
