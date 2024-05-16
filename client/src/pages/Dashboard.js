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
        // this fetches the experts data 
        fetch('/api/experts/1')
            .then(response => response.json())
            .then(data => setExpert(data))
            .catch(error => console.error('Error fetching expert data:', error));

        // This fetches the top articles
        fetch('/api/blogposts')
            .then(response => response.json())
            .then(data => {
                // Using setNotifications to set the top articles
                setNotifications(data);
            })
            .catch(error => console.error('Error fetching top articles:', error));

        fetch('/api/users/1')
        .then(response => response.json())
        .then(user => {
            setFollowers(user.followers);  
            setFollowing(user.following);
            setCommunities(user.communities.length);  
        })

        

        fetch('/api/notifications')
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching the notifications:', error));

        fetch('/api/messages')
             .then(response => response.json())
             .then(data => setInboxMessages(data))
             .catch(error => console.error('Error fetching messages:', error));
    }, []);

         

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
            fetch('/api/messages')
                .then(response => response.json())
                .then(data => setInboxMessages(data))
                .catch(error => console.error('Error fetching the inbox messages', error));
        }

        setShowInbox(!showInbox);
    }

    function handleDropdownClick(action) {
        switch (action) {
            case 'updateProfile':
                if (selectedOption === 'updateProfile') {
                    fetch('/api/experts/1', {
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
                } else {
                    setSelectedOption('updateProfile');
                }
                break;
            case 'addCommunity':
                if (selectedOption === 'addCommunity') {
                    fetch('/api/communities', {
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
                } else {
                    setSelectedOption('addCommunity');
                }
                break;
            case 'deleteProfile':
                fetch('/api/experts/1', {
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
    
        setShowDropdown(!showDropdown);
    }
    

    return (
        <div className="dashboard">
             <div className="top-bar">
                <div className="notification-container">
                    <FaBell className="notification-bell" />
                    {notifications.length > 0 && <span className="notification-dot"></span>}
                </div>
                <div className="expert-profile-topbar">
                    <h3>Farmer2023<FaUser className='profile-icon'/> </h3>
                    {expert && (
                    <div>
                        <p>Name: {expert.name}</p>
                        <p>Expertise: {expert.expertise_area}</p>
                        <p>Bio: {expert.bio}</p>
                    </div>
                    )}
            {showDropdown ? (
                 <Dropdown as={ButtonGroup}>

            <Button variant="success" style= {{'backgroundColor':'green'}} className='option-button'>Options</Button>

            <Dropdown.Toggle split variant="success" style= {{'backgroundColor':'green'}} id="dropdown-split-basic" />

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

            ) : (
                <Button className='option-button' style= {{'backgroundColor':'green'}} onClick={() => setShowDropdown(true)}>Options</Button>
            )}

                </div>


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
                        <h2> Add a New Blog Post</h2>
                    </div>
                    <div className="content-sections">
                        <div className = "top-articles">
                            <h3>Top Articles</h3>
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
    )
}

export default ExpertDashboard;
