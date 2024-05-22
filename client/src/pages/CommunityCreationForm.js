import React, { useState } from 'react';
import './CommunityCreationForm.css';

function CommunityCreationForm({ onSubmit }) {
    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch('/communities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                onSubmit(formData); // Call the onSubmit prop with the new community data
                setFormData({
                    name: '',
                    description: ''
                });
            } else {
                console.error('Failed to add new community');
            }
        } catch (error) {
            console.error('Error adding a new community:', error);
        }
    }

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
                <button type="submit" className="community-form-submit">Create Community</button>
            </form>
        </div>
    );
}

export default CommunityCreationForm;