import React, { useState, useEffect } from 'react';
import { FaChartBar, FaPenFancy, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';
import ProfileUpdateForm from './ProfileUpdateForm'; 
import CommunityCreationForm from './CommunityCreationForm'; 
import './Dashboard.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


function ExpertDashboard({ user }) {
    const [expert, setExpert] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [communities, setCommunities] = useState(0);
    const [showNotifications, setShowNotifications] = useState([]);
    const [inboxMessages, setInboxMessages] = useState([]);
    const [showInbox, setShowInbox] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [topArticles, setTopArticles] = useState([]);
    const BASE_URL = 'http://localhost:5555';

    const [updatedProfileData, setUpdatedProfileData] = useState({
        name: "",
        expertise_area: "",
        bio: ""
    });

    const [newCommunityData, setNewCommunityData] = useState({
        name: "",
        description: ""
    });
    useEffect(() => {
        // Fetch expert data
        if (user) {
            fetch(`${BASE_URL}/experts/${user.id}`)
                .then(response => response.json())
                .then(data => {
                    setExpert(data);
                    setFollowers(data.followers);
                    setFollowing(data.following);
                    setCommunities(data.communities.length);
                })
                .catch(error => console.error('Error fetching expert data:', error));
        }

        // Fetch top articles
        fetch(`${BASE_URL}/blogposts`)
            .then(response => response.json())
            .then(data => setTopArticles(data))
            .catch(error => console.error('Error fetching top articles:', error));

        // Fetch notifications
        fetch('/api/notifications')
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));

        // Fetch inbox messages
        fetch(`${BASE_URL}/messages`)
            .then(response => response.json())
            .then(data => setInboxMessages(data))
            .catch(error => console.error('Error fetching inbox messages:', error));
    }, [user]);

         

    function handleToggleNotifications() {
        if (!showNotifications) {
            fetch('/api/notifications')
                .then(response => response.json())
                .then(data => setNotifications(data))
                .catch(error => console.error('Error fetching the notifications:', error));
        }

        setShowNotifications(!showNotifications);
    }

    function handleToggleInbox() {
        if (!showInbox) {
            fetch(`${BASE_URL}/messages`)
                .then(response => response.json())
                .then(data => setInboxMessages(data))
                .catch(error => console.error('Error fetching the inbox messages', error));
        }

        setShowInbox(!showInbox);
    }

    function handleDropdownClick(action) {
        switch (action) {
            case 'updateProfile':
                fetch(`${BASE_URL}/experts/{}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedProfileData)
                })
                    .then(response => response.json())
                    .then(data => {
                        setExpert(data);
                        console.log('Profile updated:', data);
                    })
                    .catch(error => console.error('Error updating profile:', error));
                break;
            case 'addCommunity':
                fetch(`${BASE_URL}/communities`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newCommunityData)
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Community created:', data);
                    })
                    .catch(error => console.error('Error creating community:', error));
                break;
            case 'deleteProfile':
                fetch(`${BASE_URL}/experts/{}`, {
                    method: 'DELETE'
                })
                    .then(() => {
                        setExpert(null);
                        console.log('Profile deleted');
                    })
                    .catch(error => console.error('Error deleting profile', error));
                break;
            case 'signOut':
                fetch('/api/signout', {
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
        setSelectedOption(null);
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
                    <h3>Expert2024<FaUser className='profile-icon'/> </h3>
                    {expert && (
                    <div>
                        <p>Name: {expert.name}</p>
                        <p>Expertise: {expert.expertise_area}</p>
                        <p>Bio: {expert.bio}</p>
                    </div>
                    )}
                        <Dropdown as={ButtonGroup}>
                            <Button className="options-button">Options</Button>
                            <Dropdown.Toggle split className="options-button" id="dropdown-split-basic" />
                            <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item onClick={() => setSelectedOption('updateProfile')}>
                                    Update Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => setSelectedOption('addCommunity')}>
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
                    {selectedOption === 'updateProfile' && <ProfileUpdateForm onSubmit={setUpdatedProfileData} />}
                    {selectedOption === 'addCommunity' && <CommunityCreationForm onSubmit={setNewCommunityData} />}
                {/* </div> */}


            </div>
            <div className='sidebar'>
                
                <div className= 'sidebar-item'>
                    <FaChartBar className = "sidebar-icon" />
                    <span> Analytics </span>
                </div>

                <div className='sidebar-item'>
                    <FaPenFancy className='sidebar-icon' /> 
                    <span>My Posts & Drafts</span>
                </div>

                <div className="sidebar-item">
                    <FaEnvelope className='sidebar-icon' />
                    <span>Inbox</span>
                    {inboxMessages.length > 0 && <span className='notification-dot'></span> }
                </div>
            

              
            </div>
            <div className="main-content">
                    
                    <div className='banner'>
                        <h3 style={{'color':'white'}}> Hello Farmer2023 !</h3>
                        <h4 style={{'color':'white'}}> Give us an update on how you farming experience is going</h4>
                        <Button className='new-post-button'> Write New Post</Button>
                    </div>
                    <div className="content-sections">
                        <div className = "top-articles">
                            <h3 style={{'color':'white'}}>Top Articles</h3>
                            <ul>
                                {topArticles.map(article => (<li key={article.id}>{article.title}</li>))}
                            </ul>
                        </div>

                        <div className='expert-info'>
                            <div className='followers'>
                                <h4>Followers</h4>
                                <p>{followers}</p>
                            </div>
                            <div className='following'>
                                <h4>Following</h4>
                                <p>{following}</p>

                            </div>

                            <div className = 'communities'>
                                <h4>Communities</h4>
                                <p>{communities}</p>

                            </div>
                        </div>
                    </div>
                </div>
        </div>

       </div>
        
    )
}

export default ExpertDashboard;
