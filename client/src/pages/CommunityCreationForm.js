import React, { useState } from 'react';

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

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(formData);
      
        setFormData({
            name: '',
            description: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Community Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <label>
                Description:
                <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <button type="submit">Create Community</button>
        </form>
    );
}

export default CommunityCreationForm;
