import React, { useState, useEffect } from 'react';
import { FaChartBar, FaPenFancy, FaEnvelope, FaBell, FaUser, FaUserFriends, FaUsers, FaUsersCog} from 'react-icons/fa';
import ProfileUpdateForm from './ProfileUpdateForm'; 
import CommunityCreationForm from './CommunityCreationForm'; 
import PostAuthor from '../components/PostAuthor';
import PostItem from '../components/PostItem';
import Spinner from 'react-bootstrap/Spinner'
import './Dashboard.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';

function ExpertDashboard() {
    const [expert, setExpert] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [communities, setCommunities] = useState(0);
    const [inboxMessages, setInboxMessages] = useState([]); // Added inboxMessages state
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
        // Fetch expert data
        fetch('/experts/1')
            .then(response => response.json())
            .then(data => setExpert(data))
            .catch(error => console.error('Error fetching expert data:', error));
    
        // Fetch top articles
        fetch('/blogposts')
            .then(response => response.json())
            .then(data => setTopArticles(data))
            .catch(error => console.error('Error fetching top articles:', error));
    
        // Fetch user data
        fetch('/users/1')
            .then(response => response.json())
            .then(user => {
                setFollowers(user.followers ?? 0);
                setFollowing(user.following ?? 0);
                setCommunities(user.communities?.length ?? 0);
            })
            .catch(error => console.error('Error fetching user data:', error));
    
        // Fetch notifications
        fetch('/notifications')
            .then(response => response.json())
            .then(data => setNotifications(data))
            .catch(error => console.error('Error fetching notifications:', error));
    
        // Fetch inbox messages
        fetch('/messages')
            .then(response => response.json())
            .then(data => setInboxMessages(data))
            .catch(error => console.error('Error fetching inbox messages:', error));
    }, []);
    

    function handleDropdownClick(action) {
        switch (action) {
            case 'updateProfile':
                fetch('/experts/1', {
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
                fetch('/communities', {
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
                        <div className='user=profile'>
                        
                        {expert && (
                            <div >
                                <h3 style={{'color':'white', 'margin-bottom':'15px'}}>  {expert.name}<FaUser className='profile-icon'/> </h3>
                               
                                <p style={{'fontSize':"20px", 'color':'white'}}> {expert.expertise_area}</p>
                            </div>
                        )}
                        </div>
                       
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
                </div>
                <div className='sidebar'>
                    <div className= 'sidebar-item'>
                        <FaChartBar className = "sidebar-icon" />
                        <span> My Feed </span>
                    </div>
                    <div className='sidebar-item'>
                        <FaPenFancy className='sidebar-icon' /> 
                        <span>My Posts & Drafts</span>
                    </div>
                    <div className="sidebar-item">
                        <FaEnvelope className='sidebar-icon' />
                        <span>Inbox</span>
                        {/* {inboxMessages.length > 0 && <span className='notification-dot'></span> } */}
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
                            
                                {topArticles.length===0?(
                                    <Spinner style={{ color: '#EE5E21' }} animation='border' role='status'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </Spinner>
                                ) : (
                                    <div className ='article-grid'>
                                        {topArticles.map(article => (
                                            <div key={article.id} className='article-card'> 
                                                <img src = {article.image} alt= {article.title} />
                                                <div className=' card-content'> 
                                                    <h2 style={{'fontSize':"12px"}}>{article.title}</h2>
                                                    <p
                                                    
                                                    style={{'fontSize':"12px"}}>{article.content}</p>
                                                    <div className='meta-info'>
                                                        <span>{article.created_at}</span>
                                                        <span>{article.total_comments}</span>
                                                        <span>{article.total_likes}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div>
                                            <Button className ="show-more-button">Show More</Button>
                                        </div>
                                    </div>
                                )}
                            
                        </div>
                        <div className='expert-info'>
                            <div className='expert-details' style={{'color':'white'}}>

                            {expert && (
                            <div >
                                <h4 style={{'fontSize':"20px", 'color':'white', 'fontWeight':'bold','textAlign':'center'}}>Bio</h4>
                                <p style={{'fontSize':"20px", 'color':'white'}}> {expert.bio}</p>
                            </div>
                        )}
                            </div>
                            <div className='followers'>
                            <FaUserFriends className='follower-icon'/>
                                <h4>Followers</h4>
                                <p>{followers}</p>
                            </div>
                            <div className='following'>
                                <FaUsers className='following-icon' />
                                <h4> Following</h4>
                                <p>{following}</p>
                            </div>
                            <div className = 'communities'>
                            <FaUsersCog className='communities-icon'/>
                                <h4> Communities</h4>
                                <p>{communities}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExpertDashboard;
