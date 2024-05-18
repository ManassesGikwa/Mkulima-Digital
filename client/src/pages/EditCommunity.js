import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditCommunity = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/communities/${id}`)
      .then((res) => res.json())
      .then((data) => setCommunity(data))
      .catch((error) => console.error('Error fetching community details:', error));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:5555/communities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(community),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Community updated successfully:', data);
        navigate(`/community/${id}`);
      })
      .catch((error) => console.error('Error updating community:', error));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommunity({ ...community, [name]: value });
  };

  if (!community) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Edit Community</h1>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
        <label style={{ marginBottom: '10px' }}>
          Name:
          <input type="text" name="name" value={community.name} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
        </label>
        <label style={{ marginBottom: '10px' }}>
          Description:
          <textarea name="description" value={community.description} onChange={handleChange} style={{ width: '100%', padding: '8px', marginBottom: '15px' }} />
        </label>
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Save</button>
      </form>
    </div>
  );
};

export default EditCommunity;