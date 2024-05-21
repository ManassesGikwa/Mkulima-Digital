// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import "./Community.css"

// const Community = () => {
//   const [communitys, setCommunitys] = useState([]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:5555/communities")
//       .then((res) => res.json())
//       .then((communitys) => setCommunitys(communitys));
//   }, []);

//   const handleLike = (id) => {
//     // Your logic for handling like button click (if needed)
//   };

//   const handleFollow = (id) => {
//     // Your logic for handling follow button click (if needed)
//   };

//   const handleDelete = (id) => {
//     // Filter out the community with the given id
//     const updatedCommunitys = communitys.filter(community => community.id !== id);
//     setCommunitys(updatedCommunitys);
    
//     // Perform API call to delete the community from backend (if needed)
//     // Example:
//     fetch(`http://127.0.0.1:5555/communities/${id}`, {
//       method: 'DELETE',
//     })
//     .then(() => {
      
//     })
//     .catch(error => {
//       console.error('Error deleting community:', error);
//     });
//   };

//   return (
//     <div className='community'>
//       <h1>OUR COMMUNITIES</h1>
//       <div className='mini-community'>
//         <ul className='community-list'>
//           {communitys.map((community) => (
//             <li key={community.id}>
//               <div className='card'>
//                 {/* Render the link to CommunityDetails */}
               
//                 <img src={community.image} alt={community.name} className='card-img-top' />
//                 <Link to={`/community/${community.id}`} className='community-name'>{community.name}</Link>
//                 <div className='card-body'>
//                   {/* <p className='card-text'>{community.description}</p> */}
//                   <div className='btn'>
//                     <button onClick={() => handleLike(community.id)} className='btn1'>Like</button>
//                     <button onClick={() => handleFollow(community.id)} className='btn1'>Follow</button>
//                     <button onClick={() => handleDelete(community.id)} className='btn1'>Delete</button>
//                     <button className='com-button'>New Community</button>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Community;
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
    const updatedCommunities = communities.map(community => {
      if (community.id === id) {
        return { ...community, likes: (community.likes || 0) + 1 };
      }
      return community;
    });
    setCommunities(updatedCommunities);
  };

  const handleFollow = (id) => {
  
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
                    <button onClick={() => handleLike(community.id)} className='btn1'>Like</button>
                    <button onClick={() => handleFollow(community.id)} className='btn1'>Follow</button>
                    <button onClick={() => handleDelete(community.id)} className='btn1'>Delete</button>
                 
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
      
      </div>
    </div>
  );
};

export default Community;