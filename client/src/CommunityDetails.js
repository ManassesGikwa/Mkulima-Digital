import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './CommunityDetails.css'; // Import CSS file for styling

const CommunityDetails = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/communities/${id}`)
      .then((res) => res.json())
      .then((data) => setCommunity(data))
      .catch((error) => console.error('Error fetching community details:', error));
  }, [id]);

  if (!community) {
    return <div>Loading...</div>;
  }

  return (
    <div className='big-container'>
      <div className='image-container'>
        <img src={community.image} alt={community.name} className='card-img-top' />
      </div>
      <div className='content-container'>
        <h1>Name: {community.name}</h1>
        <p>Description: {community.description}</p>
        <p>Created At: {community.created_at}</p>
        <Link to={`/community/${id}/edit`} className='button'>Edit</Link>
      </div>
    </div>
  );
};

export default CommunityDetails;
