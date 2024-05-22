// import React, { useState, useEffect } from 'react';
// import { FaChartBar, FaPenFancy, FaEnvelope, FaBell, FaUser, FaUserFriends, FaUsers, FaUsersCog } from 'react-icons/fa';
// import ProfileUpdateForm from './ProfileUpdateForm';
// import CommunityCreationForm from './CommunityCreationForm';
// import Pagination from 'react-bootstrap/Pagination';
// import Spinner from 'react-bootstrap/Spinner';
// import './Dashboard.css';
// import Button from 'react-bootstrap/Button';
// import ButtonGroup from 'react-bootstrap/ButtonGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Modal from 'react-bootstrap/Modal';

// function ExpertDashboard() {
//     const [expert, setExpert] = useState(null);
//     const [notifications, setNotifications] = useState([]);
//     const [followers, setFollowers] = useState(0);
//     const [following, setFollowing] = useState(0);
//     const [communities, setCommunities] = useState([]);
//     const [selectedOption, setSelectedOption] = useState(null);
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const postsPerPage = 4;
//     const [showModal, setShowModal] = useState(false);
//     const[showCommunities, setShowCommunities] = useState(false);
//     const [showFollowers, setShowFollowers] = useState(false);

//     const [updatedProfileData, setUpdatedProfileData] = useState({
//         name: "",
//         expertise_area: "",
//         bio: ""
//     });

//     useEffect(() => {
//         // Fetch expert data
//         fetch('/experts/1')
//             .then(response => response.json())
//             .then(data => setExpert(data))
//             .catch(error => console.error('Error fetching expert data:', error));

//         // Fetch posts
//         fetch('/blogposts')
//             .then(response => response.json())
//             .then(data => {
//                 setPosts(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching posts:', error);
//                 setLoading(false);
//             });

//         // Fetch user data
//         fetch('/users/1')
//             .then(response => response.json())
//             .then(user => {
//                 setFollowers(user.followers ?? 0);
//                 setFollowing(user.following ?? 0);
//                 setCommunities(user.communities ?? []);
//             })
//             .catch(error => console.error('Error fetching user data:', error));

//         // Fetch notifications
//         fetch('/notifications')
//             .then(response => response.json())
//             .then(data => setNotifications(data))
//             .catch(error => console.error('Error fetching notifications:', error));


//         fetch('/communities')
//             .then(response => response.json())
//             .then(data => setCommunities(data))
//             .catch(error => console.error('Error fetching communities:', error));
   
//     }, []);

//     useEffect(() => {
//         console.log('Communities updated:', communities);
//     }, [communities]);

//     function handleDropdownClick(action) {
//         console.log('Dropdown action:', action);
//         switch (action) {
//             case 'updateProfile':
//                 setSelectedOption('updateProfile');
//                 setShowModal(true);
//                 break;
//             case 'addCommunity':
//                 setSelectedOption('addCommunity');
//                 setShowModal(true);
//                 break;
//             case 'deleteProfile':
//                 fetch('/experts/1', {
//                     method: 'DELETE'
//                 })
//                     .then(() => {
//                         setExpert(null);
//                         console.log('Profile deleted');
//                     })
//                     .catch(error => console.error('Error deleting profile', error));
//                 break;
//             case 'signOut':
//                 fetch('/signout', {
//                     method: 'POST'
//                 })
//                     .then(() => {
//                         console.log('Signed Out');
//                     })
//                     .catch(error => console.error('Error signing out:', error));
//                 break;
//             default:
//                 break;
//         }
//     }

//     function addNewCommunity(communityData) {
//         setCommunities(prevCommunities => [...prevCommunities, communityData]);
//     }

//     // Pagination logic
//     const indexOfLastPost = currentPage * postsPerPage;
//     const indexOfFirstPost = indexOfLastPost - postsPerPage;
//     const visibleArticles = posts.slice(indexOfFirstPost, indexOfLastPost);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
//     function toggleFollowers(){
//         setShowFollowers(!showFollowers);
//     }
//     return (
//         <div className='parent-container'>
//             <div className="dashboard">
//                 <div className="top-bar">
//                     <div className="notification-container">
//                         <FaBell className="notification-bell" />
//                         {notifications.length > 0 && <span className="notification-dot"></span>}
//                     </div>
//                     <div className="expert-profile-topbar">
//                         <div className='user-profile'>
//                             {expert && (
//                                 <div>
//                                     <h3 style={{'marginBottom': '15px', }}>{expert.name}<FaUser className='profile-icon' /></h3>
//                                     <p style={{ 'fontSize': "20px",}}>{expert.expertise_area}</p>
//                                 </div>
//                             )}
//                         </div>
//                         <Dropdown as={ButtonGroup}>
//                             <Button className="options-button">Options</Button>
//                             <Dropdown.Toggle split className="options-button" id="dropdown-split-basic" />
//                             <Dropdown.Menu className="dropdown-menu">
//                                 <Dropdown.Item onClick={() => handleDropdownClick('updateProfile')}>
//                                     Update Profile
//                                 </Dropdown.Item>
//                                 <Dropdown.Item onClick={() => handleDropdownClick('addCommunity')}>
//                                     Add Community
//                                 </Dropdown.Item>
//                                 <Dropdown.Item onClick={() => handleDropdownClick('deleteProfile')}>
//                                     Delete Profile
//                                 </Dropdown.Item>
//                                 <Dropdown.Item onClick={() => handleDropdownClick('signOut')}>
//                                     Sign Out
//                                 </Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown>
//                     </div>
//                     <Modal show={showModal} onHide={() => setShowModal(false)}>
//                         <Modal.Header closeButton>
//                             <Modal.Title>{selectedOption === 'updateProfile' ? 'Update Profile' : 'Add Community'}</Modal.Title>
//                         </Modal.Header>
//                         <Modal.Body>
//                             {selectedOption === 'updateProfile' && <ProfileUpdateForm onSubmit={setUpdatedProfileData} />}
//                             {selectedOption === 'addCommunity' && <CommunityCreationForm onSubmit={(data) => {
//                                 addNewCommunity(data);
//                                 setShowModal(false);
//                             }} />}
//                         </Modal.Body>
//                     </Modal>
//                 </div>
//                 <div className='sidebar'>
//                     <div className='sidebar-item'>
//                         <FaChartBar className="sidebar-icon" />
//                         <span>My Feed</span>
//                     </div>
//                     <div className='sidebar-item'>
//                         <FaPenFancy className='sidebar-icon' />
//                         <span>My Posts & Drafts</span>
//                     </div>
//                     <div className="sidebar-item">
//                         <FaEnvelope className='sidebar-icon' />
//                         <span>Inbox</span>
//                     </div>
//                 </div>
//                 <div className="main-content">
//                     <div className='banner'>
//                         <h3 style={{ color: 'white' }}>Hello Farmer2024!</h3>
//                         <h4 style={{ color: 'white' }}>Give us an update on how your farming experience is going</h4>
//                         <Button className='new-post-button'>Write New Post</Button>
//                     </div>
//                     <div className="content-sections">
//                         <div className="top-articles">
//                             <h3 className='toparticles-h3'>Top Articles</h3>
//                             {loading ? (
//                                 <Spinner style={{ color: '#EE5E21' }} animation='border' role='status'>
//                                     <span className='visually-hidden'>Loading...</span>
//                                 </Spinner>
//                             ) : (
//                                 <div className='article-grid'>
//                                     {visibleArticles.map(article => (
//                                         <div key={article.id} className='article-card'>
//                                             <img src={article.image} alt={article.title} />
//                                             <div className='card-content'>
//                                                 <h2 style={{ fontSize: "12px" }}>{article.title}</h2>
//                                                 <p style={{ fontSize: "12px" }}>{article.content}</p>
//                                                 <div className='meta-info'>
//                                                     <span>{article.created_at}</span>
//                                                     <span>{article.total_comments}</span>
//                                                     <span>{article.total_likes}</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                             <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
//                                 {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
//                                     <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
//                                         {i + 1}
//                                     </Pagination.Item>
//                                 ))}
//                             </Pagination>
//                         </div>
//                         <div className='expert-info'>
//                             <div className='expert-details' style={{ color: 'white' }}>
//                                 {expert && (
//                                     <div>
//                                         <h4 style={{ fontSize: "20px", color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Bio</h4>
//                                         <p style={{ fontSize: "20px", color: 'white' }}>{expert.bio}</p>
//                                     </div>
//                                 )}
//                             </div>
//                             <div className='followers'>
//                                 <FaUserFriends className='follower-icon' />
//                                 <h4>Followers</h4>
//                                 <p onClick={toggleFollowers}>{followers.length}</p>
//                                     {showFollowers && (
//                                         <ul>
//                                             {followers.map((follower, index) => (
//                                                 <li key={index}>{follower}</li>
//                                             ))}
//                                         </ul>
//                                     )}
//                             </div>
//                             {/* <div className='following'>
//                                 <FaUsers className='following-icon' />
//                                 <h4>Following</h4>
//                                 <p>{following}</p>
//                             </div> */}
//                             <div className='communities'>
//                                 <FaUsersCog className='communities-icon' />
//                                 <h4>Communities</h4>
//                                 <p onClick={() => setShowCommunities(!showCommunities)} style={{ cursor: 'pointer' }}>
//                                     {communities.length}
//                                 </p>
//                                 {showCommunities && (
//                                     <ul>
//                                         {communities.map((community, index) => (
//                                             <li key={index}>{community.name}</li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ExpertDashboard;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChartBar, FaPenFancy, FaEnvelope, FaBell, FaUser, FaUserFriends, FaUsers, FaUsersCog } from 'react-icons/fa';
import ProfileUpdateForm from './ProfileUpdateForm';
import CommunityCreationForm from './CommunityCreationForm';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import './Dashboard.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';


function ExpertDashboard() {
    const navigate = useNavigate(); 
    const [expert, setExpert] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [communities, setCommunities] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 4;
    const [showModal, setShowModal] = useState(false);
    const[showCommunities, setShowCommunities] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);

    const [updatedProfileData, setUpdatedProfileData] = useState({
        name: "",
        expertise_area: "",
        bio: ""
    });

    useEffect(() => {
        // Fetch expert data
        fetch('/experts/1')
            .then(response => response.json())
            .then(data => setExpert(data))
            .catch(error => console.error('Error fetching expert data:', error));

        // Fetch posts
        fetch('/blogposts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });

        // Fetch user data
        fetch('/users/1')
            .then(response => response.json())
            .then(user => {
                setFollowers(user.followers ?? 0);
                setFollowing(user.following ?? 0);
                setCommunities(user.communities ?? []);
            })
            .catch(error => console.error('Error fetching user data:', error));

        // Fetch notifications
        fetch('/notifications')
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));


        fetch('/communities')
            .then(response => response.json())
            .then(data => setCommunities(data))
            .catch(error => console.error('Error fetching communities:', error));
   
    }, []);

    useEffect(() => {
        console.log('Communities updated:', communities);
    }, [communities]);

    function handleDropdownClick(action) {
        console.log('Dropdown action:', action);
        switch (action) {
            case 'updateProfile':
                setSelectedOption('updateProfile');
                setShowModal(true);
                break;
            case 'addCommunity':
                setSelectedOption('addCommunity');
                setShowModal(true);
                break;
            case 'deleteProfile':
                fetch('/experts/1', {
                    method: 'DELETE'
                })
                    .then(() => {
                        setExpert(null);
                        console.log('Profile deleted');
                    })
                    .catch(error => console.error('Error deleting profile', error));
                break;
            case 'signOut':
                fetch('/signout', {
                    method: 'POST'
                })
                    .then(() => {
                        console.log('Signed Out');
                    })
                    .catch(error => console.error('Error signing out:', error));
                break;
            default:
                break;
        }
    }

    function addNewCommunity(communityData) {
        setCommunities(prevCommunities => [...prevCommunities, communityData]);
    }

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const visibleArticles = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    function toggleFollowers(){
        setShowFollowers(!showFollowers);
    }
    function handleInboxClick() {
        navigate('/messages');
    }

    return (
        <div className='parent-container'>
            <div className="dashboard">
                <div className="top-bar">
                    <div className="notification-container">
                        <FaBell className="notification-bell" />
                        {notifications.length > 0 && <span className="notification-dot"></span>}
                    </div>
                    <div className="expert-profile-topbar">
                        <div className='user-profile'>
                            {expert && (
                                <div>
                                    <h3 style={{'marginBottom': '15px', }}>{expert.name}<FaUser className='profile-icon' /></h3>
                                    <p style={{ 'fontSize': "20px",}}>{expert.expertise_area}</p>
                                </div>
                            )}
                        </div>
                        <Dropdown as={ButtonGroup}>
                            <Button className="options-button">Options</Button>
                            <Dropdown.Toggle split className="options-button" id="dropdown-split-basic" />
                            <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item onClick={() => handleDropdownClick('updateProfile')}>
                                    Update Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdownClick('addCommunity')}>
                                    Add Community
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdownClick('deleteProfile')}>
                                    Delete Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleDropdownClick('signOut')}>
                                    Sign Out
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{selectedOption === 'updateProfile' ? 'Update Profile' : 'Add Community'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {selectedOption === 'updateProfile' && <ProfileUpdateForm onSubmit={setUpdatedProfileData} />}
                            {selectedOption === 'addCommunity' && <CommunityCreationForm onSubmit={(data) => {
                                addNewCommunity(data);
                                setShowModal(false);
                            }} />}
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='sidebar'>
                    <div className='sidebar-item'>
                        <FaChartBar className="sidebar-icon" />
                        <span>My Feed</span>
                    </div>
                    <div className='sidebar-item'>
                        <FaPenFancy className='sidebar-icon' />
                        <span>My Posts & Drafts</span>
                    </div>
                    <div className="sidebar-item" onClick={handleInboxClick}>
                        <FaEnvelope className='sidebar-icon' />
                        <span><Link to='/inbox'> Inbox </Link></span>
                        {/* {inboxMessages.length > 0 && <span className='notification-dot'></span> } */}
                        <span>Inbox</span>
                    </div>
                </div>
                <div className="main-content">
                    <div className='banner'>
                        <h3 style={{ color: 'white' }}>Hello Farmer2024!</h3>
                        <h4 style={{ color: 'white' }}>Give us an update on how your farming experience is going</h4>
                        <Button className='new-post-button'>Write New Post</Button>
                    </div>
                    <div className="content-sections">
                        <div className="top-articles">
                            <h3 className='toparticles-h3'>Top Articles</h3>
                            {loading ? (
                                <Spinner style={{ color: '#EE5E21' }} animation='border' role='status'>
                                    <span className='visually-hidden'>Loading...</span>
                                </Spinner>
                            ) : (
                                <div className='article-grid'>
                                    {visibleArticles.map(article => (
                                        <div key={article.id} className='article-card'>
                                            <img src={article.image} alt={article.title} />
                                            <div className='card-content'>
                                                <h2 style={{ fontSize: "12px" }}>{article.title}</h2>
                                                <p style={{ fontSize: "12px" }}>{article.content}</p>
                                                <div className='meta-info'>
                                                    <span>{article.created_at}</span>
                                                    <span>{article.total_comments}</span>
                                                    <span>{article.total_likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Pagination style={{ display: 'flex', justifyContent: 'center' }}>
                                {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, i) => (
                                    <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
                                        {i + 1}
                                    </Pagination.Item>
                                ))}
                            </Pagination>
                        </div>
                        <div className='expert-info'>
                            <div className='expert-details' style={{ color: 'white' }}>
                                {expert && (
                                    <div>
                                        <h4 style={{ fontSize: "20px", color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Bio</h4>
                                        <p style={{ fontSize: "20px", color: 'white' }}>{expert.bio}</p>
                                    </div>
                                )}
                            </div>
                            <div className='followers'>
                                <FaUserFriends className='follower-icon' />
                                <h4>Followers</h4>
                                <p onClick={toggleFollowers}>{followers.length}</p>
                                    {showFollowers && (
                                        <ul>
                                            {followers.map((follower, index) => (
                                                <li key={index}>{follower}</li>
                                            ))}
                                        </ul>
                                    )}
                            </div>
                            <div className='communities'>
                                <FaUsersCog className='communities-icon' />
                                <h4>Communities</h4>
                                <p onClick={() => setShowCommunities(!showCommunities)} style={{ cursor: 'pointer' }}>
                                    {communities.length}
                                </p>
                                {showCommunities && (
                                    <ul>
                                        {communities.map((community, index) => (
                                            <li key={index}>{community.name}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpertDashboard;