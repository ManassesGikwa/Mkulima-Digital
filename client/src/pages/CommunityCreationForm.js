import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './CommunityCreationForm.css';

function CommunityCreationForm({ onSubmit, userId = 1 }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: selectedImage
    }));
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Check if an image is selected
      if (formData.image) {
        // Upload image to Cloudinary
        const formDataForImage = new FormData();
        formDataForImage.append('file', formData.image);
        formDataForImage.append('upload_preset', 'zsegbm6t'); // Replace with your Cloudinary upload preset
        const imageUploadResponse = await axios.post('https://api.cloudinary.com/v1_1/dmnnoyi14/image/upload', formDataForImage);
        // Update form data with image URL
        formData.image = imageUploadResponse.data.secure_url;
      }

      // Pass userId along with community data
      const communityData = { ...formData, user_id: userId };

      // Send form data to backend
      const createCommunityResponse = await fetch(`http://127.0.0.1:5555/communities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(communityData),
      });

      if (createCommunityResponse.ok) {
        const data = await createCommunityResponse.json();
        onSubmit(data);
        setFormData({ name: '', description: '', image: null });
        setImageUrl(null);
        setError(null); // Reset error state
        
      } else {
      
        console.error('community created Successfully');
        setError('community created Successfully');
        alert('Community created successfully');
      }
    } catch (error) {
      console.error('community created Successfully:', error);
      setError(error.message || 'community created Successfully');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="community-form-container">
      <h2 className="community-form-title">Create a New Community</h2>
      <form onSubmit={handleSubmit}>
        <div className="community-form-group">
          <label htmlFor="name" className="community-form-label">Community Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="community-form-input"
            placeholder="Enter community name"
          />
        </div>
        <div className="community-form-group">
          <label htmlFor="description" className="community-form-label">Description:</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="community-form-textarea"
            placeholder="Enter community description"
          />
        </div>
        <label>
          Community Picture:
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </label>
        {imageUrl && <img src={imageUrl} alt="Selected" className="image-preview" />}
        {error && <p className="error-message">{error}</p>}
        <Button type="submit" className='submit-button' disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default CommunityCreationForm;
