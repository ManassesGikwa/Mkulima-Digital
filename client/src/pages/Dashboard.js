import React, { useState, useEffect } from 'react';
import { FaChartBar, FaPenFancy, FaEnvelope, FaBell, FaCalendarAlt, FaComments, FaHeart, FaUserFriends, FaUsersCog } from 'react-icons/fa';
import ProfileUpdateForm from './ProfileUpdateForm';
import CommunityCreationForm from './CommunityCreationForm';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import './Dashboard.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';
import { Link, useParams } from 'react-router-dom';
import CreatePost from './CreatePost';

function ExpertDashboard() {
    const [expert, setExpert] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [communities, setCommunities] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;
    const [showModal, setShowModal] = useState(false);
    const [showCommunities, setShowCommunities] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [expertArticles, setExpertArticles] = useState([]);
    const [showExpertArticles, setShowExpertArticles] = useState(false);
    const [newMessagesCount, setNewMessagesCount] = useState(0);
    const { id } = useParams();

    const [updatedProfileData, setUpdatedProfileData] = useState({
        name: "",
        expertise_area: "",
        bio: ""
    });

    useEffect(() => {
        // Fetch expert data
        fetch(`http://127.0.0.1:5555/experts/${id}`)
            .then(response => response.json())
            .then(data => setExpert(data))
            .catch(error => console.error('Error fetching expert data:', error));

        // Fetch posts
        fetch('http://127.0.0.1:5555/blogposts')
            .then(response => response.json())
            .then(data => {
                setPosts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
                setLoading(false);
            });

        // Fetch communities
        fetch('http://127.0.0.1:5555/communities')
            .then(response => response.json())
            .then(data => setCommunities(data))
            .catch(error => console.error('Error fetching community data:', error));

        // Fetch user data
        fetch(`http://127.0.0.1:5555/users/${id}`)
            .then(response => response.json())
            .then(user => {
                setFollowers(user.followers ?? []);
                setCommunities(user.communities ?? []);
            })
            .catch(error => console.error('Error fetching user data:', error));

        // Fetch notifications
        fetch(`http://127.0.0.1:5555/users/${id}/notifications`)
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
        
        // Fetch messages
        fetch('http://127.0.0.1:5555/messages')
            .then(response => response.json())
            .then(data => {
                const newMessages = data.filter(message => !message.read);
                setNewMessagesCount(newMessages.length);
            })
            .catch(error => console.error('Error fetching messages:', error));
    }, [id]);

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
                fetch(`http://127.0.0.1:5555/experts/${id}`, { method: 'DELETE' })
                    .then(() => {
                        setExpert(null);
                        console.log('Profile deleted');
                    })
                    .catch(error => console.error('Error deleting profile', error));
                break;
            case 'signOut':
                fetch('/logout', { method: 'POST' })
                    .then(() => console.log('Signed Out'))
                    .catch(error => console.error('Error signing out:', error));
                break;
            default:
                break;
        }
    }

    function addNewCommunity(communityData) {
        setCommunities(prevCommunities => [...prevCommunities, communityData]);
    }

    function handleNewPostClick() {
        setShowCreatePost(true);
    };

    function handleCloseCreatePost() {
        setShowCreatePost(false);
    };

    const handleMyPostsClick = () => {
        setShowExpertArticles(!showExpertArticles);

        if (!showExpertArticles) {
            fetch(`http://127.0.0.1:5555/experts/${id}/blogposts`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Failed to fetch expert articles');
                })
                .then(data => {
                    setExpertArticles(data);
                })
                .catch(error => {
                    console.error('Error fetching expert articles:', error);
                });
        }
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const visibleArticles = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function toggleFollowers() {
        setShowFollowers(!showFollowers);
    }

    return (
        <div className="dashboard">
            <div className='side-content'>
                <div className='top-left-corner'>
                    <h1 style={{'color':'white', 'fontSize':'30px'}}>Mkulima Digital</h1>
                    <h3 style={{'color':'white'}}>Expert's DashBoard</h3>
                </div>
                
                <div className='top-right-corner'>
                    <div className="notification-container">
                        <FaBell className="notification-bell" />
                        {notifications.length > 0 && <span className="notification-dot"></span>}
                        <div className="notification-list">
                            {notifications.map(notification => (
                                <div key={notification.id} className="notification-item">
                                    <span>{notification.content}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="expert-profile-topbar">
                        <Dropdown as={ButtonGroup}>
                            <Button className="options-button" style={{'color':'white'}}>Options</Button>
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
                            }} userId={1} />}
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='sidebar'>
                    <Link to={'/blogs'} style={{ 'color': 'white' }}>
                        <div className='sidebar-item'>
                            <FaChartBar className="sidebar-icon" />
                            <span>My Mkulima Feed</span>
                        </div>
                    </Link>
                    <div className='sidebar-item' onClick={handleMyPostsClick}>
                        <FaPenFancy className='sidebar-icon' />
                        <span>My Articles</span>
                    </div>
                    {showExpertArticles && (
                        <div className='article-grid'>
                            {expertArticles.map(article => (
                                <div key={article.id} className='article-card'>
                                     <Link to={`/posts/${article.id}`}>
                                    <img src={article.image} alt={article.title} />
                                    </Link>
                                    <div className='card-content'>
                                        <h2 style={{ fontSize: "12px" }}>{article.title}</h2>
                                        <p style={{ fontSize: "12px" }}>{article.content}</p>
                                        <div className='meta-info'>
                                            <span>
                                                <FaCalendarAlt /> {article.created_at}
                                            </span>
                                            <span>
                                                <FaHeart style={{ color: 'red' }} /> {article.total_likes}
                                            </span>
                                            <span>
                                                <FaComments /> {article.total_comments}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='sidebar-item'>
                        <FaEnvelope className='sidebar-icon' />
                        <Link to={'inbox'} style={{ color: 'white' }}>
                            <span>Messages ({newMessagesCount})</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className='banner'>
                    <h3 style={{ color: 'white' }}>Hello Farmer2024!</h3>
                    <h4 style={{ color: 'white' }}>Give us an update on how your farming experience is going</h4>
                    <Button className='new-post-button' style={{'color':'white', 'height':'10px'}} onClick={handleNewPostClick}>Write New Post</Button>
                </div>
                {showCreatePost ? (
                    <div className="create-post-view">
                        <CreatePost onClose={handleCloseCreatePost} />
                    </div>
                ) : (
                    <div className="other-dashboard-content">
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
                                                 <Link to={`/posts/${article.id}`}>
                                                <img src={article.image} alt={article.title} />
                                                </Link>
                                                <div className='card-content'>
                                                    <h2 style={{ fontSize: "12px" }}>{article.title}</h2>
                                                    <p style={{ fontSize: "12px" }}>{article.content}</p>
                                                    <div className='meta-info'>
                                                        <span>
                                                            <FaCalendarAlt /> {article.created_at}
                                                        </span>
                                                        <span>
                                                            <FaHeart style={{ color: 'red' }} /> {article.total_likes}
                                                        </span>
                                                        <span>
                                                            <FaComments /> {article.total_comments}
                                                        </span>
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
                                <Link to={'/community'}>
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
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExpertDashboard;
