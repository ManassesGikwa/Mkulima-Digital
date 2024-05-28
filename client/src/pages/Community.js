import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "./Community.css";

const Community = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/communities")
      .then((res) => res.json())
      .then((communities) => setCommunities(communities));
  }, []);

  const handleLike = (id) => {
    setCommunities(prevCommunities => {
      return prevCommunities.map(community => {
        if (community.id === id) {
          return { ...community, likes: (community.likes || 0) + 1 };
        }
        return community;
      });
    });
  };

  const handleFollow = (id) => {
    const updatedCommunities = communities.map(community => {
      if (community.id === id) {
        return { ...community, followed: !community.followed };
      }
      return community;
    });
    setCommunities(updatedCommunities);
  };

  const handleDelete = (id) => {
    const updatedCommunities = communities.filter(community => community.id !== id);
    setCommunities(updatedCommunities);
    fetch(`http://127.0.0.1:5555/communities/${id}`, {
      method: 'DELETE',
    })
    .then(() => {
    })
    .catch(error => {
      console.error('Error deleting community:', error);
    });
  };

  return (
    <div className='community'>
      <h1>OUR COMMUNITIES</h1>
      <div className='com-button'>
        <Link to="/community/add">Add Community</Link>
      </div>
      <div className='mini-community'>
        <ul className='community-list'>
          {communities.map((community) => (
            <li key={community.id}>
              <div className='card'>
                <img src={community.image} alt={community.name} className='card-img-top' />
                <Link to={`/community/${community.id}`} className='community-name'>{community.name}</Link>
                <div className='card-body'>
                    <button onClick={() => handleLike(community.id)} className='btn1'>({community.likes || 0})Likes</button>
                    <button onClick={() => handleFollow(community.id)} className='btn1'>{community.followed ? 'Following' : 'Follow'}</button>
                    <button onClick={() => handleDelete(community.id)} className='btn1'>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Community;