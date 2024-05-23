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
import { Link } from 'react-router-dom';
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
    const postsPerPage = 4;
    const [showModal, setShowModal] = useState(false);
    const [showCommunities, setShowCommunities] = useState(false);
    const [showFollowers, setShowFollowers] = useState(false);
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [expertArticles, setExpertArticles] = useState([]);
    const [showExpertArticles, setShowExpertArticles] = useState(false);
    const [newMessagesCount, setNewMessagesCount] = useState(0);

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
                setFollowers(user.followers ?? []);
                setCommunities(user.communities ?? []);
            })
            .catch(error => console.error('Error fetching user data:', error));

        // Fetch notifications
        fetch('/users/1/notifications')  // Corrected line
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
        
        // Fetch messages
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                const newMessages = data.filter(message => !message.read);
                setNewMessagesCount(newMessages.length);
            })
            .catch(error => console.error('Error fetching messages:', error));
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
                fetch('/experts/1', { method: 'DELETE' })
                    .then(() => {
                        setExpert(null);
                        console.log('Profile deleted');
                    })
                    .catch(error => console.error('Error deleting profile', error));
                break;
            case 'signOut':
                fetch('/signout', { method: 'POST' })
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
            fetch('/experts/1/blogposts')
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
        <div className='parent-container'>
            <div className="dashboard">
            <div className='side-content'>
                <div className='top-left-corner'>
                    <h1 style={{'color':'white'}}>Mkulima Digital</h1>
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
                            }} userId={1} />}
                        </Modal.Body>
                    </Modal>
                </div>
                <div className='sidebar'>
                    <Link to={'/blogs'} style={{ 'color': 'white' }}>
                        <div className='sidebar-item'>
                            <FaChartBar className="sidebar-icon" />
                            <span>My Feed</span>
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
                                    <img src={article.image} alt={article.title} />
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
                        <Link to={'/messages'} style={{ color: 'white' }}>
                            <span>Messages ({newMessagesCount})</span>
                        </Link>
                    </div>
                    <div className='sidebar-item' onClick={toggleFollowers}>
                        <FaUserFriends className='sidebar-icon' />
                        <span>Followers</span>
                    </div>
                    {showFollowers && (
                        <div>
                            {followers.map((follower, index) => (
                                <div key={index} className="follower-item">
                                    {follower}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className='sidebar-item' onClick={() => setShowCommunities(!showCommunities)}>
                        <FaUsersCog className='sidebar-icon' />
                        <span>Communities</span>
                    </div>
                    {showCommunities && (
                        <div>
                            {communities.map((community, index) => (
                                <div key={index} className="community-item">
                                    {community}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='main-content'>
                <div className="expert-profile">
                    <div className="profile-picture">
                        <img src={expert?.profile_picture || 'default_profile.jpg'} alt="Profile" />
                    </div>
                    <div className="profile-details">
                        <h2>{expert?.name}</h2>
                        <p>{expert?.expertise_area}</p>
                        <p>{expert?.bio}</p>
                    </div>
                </div>
                <div className='articles-section'>
                    <div className="section-title">
                        <h2>Articles</h2>
                    </div>
                    <button onClick={handleNewPostClick}>New Post</button>
                    <Modal show={showCreatePost} onHide={handleCloseCreatePost}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create New Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <CreatePost />
                        </Modal.Body>
                    </Modal>
                    <div className="articles-grid">
                        {loading ? (
                            <div className="loading-spinner">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            visibleArticles.map(post => (
                                <div key={post.id} className="article-card">
                                    <img src={post.image} alt={post.title} />
                                    <div className="card-content">
                                        <h2 style={{ fontSize: "12px" }}>{post.title}</h2>
                                        <p style={{ fontSize: "12px" }}>{post.content}</p>
                                        <div className="meta-info">
                                            <span>
                                                <FaCalendarAlt /> {post.created_at}
                                            </span>
                                            <span>
                                                <FaHeart style={{ color: 'red' }} /> {post.total_likes}
                                            </span>
                                            <span>
                                                <FaComments /> {post.total_comments}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="pagination">
                        <Pagination>
                            {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
                                <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default ExpertDashboard;
