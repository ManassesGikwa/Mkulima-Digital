import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './CommunityDetails.css';

const CommunityDetails = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const navigate = useNavigate();

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
    <div className="big-container">
      <div className="image-container">
        <img
          src={community.image}
          alt={community.name}
          className="card-img-top"
        />
      </div>
      <div className="content-container">
        <h1>Name: {community.name}</h1>
        <h1>Description: {community.description}</h1>
        <h1>Created At: {community.created_at}</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to={`/community/${id}/edit`} className="button">
            Edit
          </Link>
          {/* <div className="btn4">
            <Link to="/community/add">
              Add Community
            </Link>
          </div> */}
          <button onClick={() => navigate('/community')} className="button">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetails;
