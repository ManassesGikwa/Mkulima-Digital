import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import './ProfileUpdateForm.css';

function ProfileUpdateForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    expertise_area: '',
    bio: '',
    image: null
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: selectedImage
    }));
    setImageUrl(URL.createObjectURL(selectedImage));
  };

  async function handleSubmit(e) {
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
        const response = await axios.post('https://api.cloudinary.com/v1_1/dmnnoyi14/image/upload', formDataForImage);

        // Update form data with image URL
        formData.image = response.data.secure_url;
      }

      // Send form data to backend
      const response = await fetch('http://127.0.0.1:5555/experts/1', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        onSubmit(formData);
        setFormData({
          name: '',
          expertise_area: '',
          bio: '',
          image: null
        });
        setImageUrl(null);
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="profile-update-form">
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Expertise Area:
        <input type="text" name="expertise_area" value={formData.expertise_area} onChange={handleChange} />
      </label>
      <label>
        Bio:
        <textarea name="bio" value={formData.bio} onChange={handleChange} />
      </label>
      <label>
        Profile Picture:
        <input type="file" onChange={handleImageChange} accept="image/*" />
      </label>
      {imageUrl && <img src={imageUrl} alt="Selected" className="image-preview" />}
      {error && <p className="error-message">{error}</p>}
      <Button type="submit" className='submit-button' disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}

export default ProfileUpdateForm;