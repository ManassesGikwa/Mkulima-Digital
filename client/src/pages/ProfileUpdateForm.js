import React, { useState } from 'react';
import './ProfileUpdateForm.css';

function ProfileUpdateForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    expertise_area: '',
    bio: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('/experts/1', {
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
          bio: ''
        });
      } else {
        console.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
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
      <button type="submit">Update Profile</button>
    </form>
  );
}

export default ProfileUpdateForm;
