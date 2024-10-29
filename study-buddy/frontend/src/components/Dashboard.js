import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/api';
import { useSelector } from 'react-redux';
import './Dashboard.css'; // Import your CSS styles

function Dashboard() {
  const [userInfo, setUserInfo] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [statistics, setStatistics] = useState({ studyGroups: 0, completedTasks: 0 });
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchUserProfile();
      fetchRecentActivities();
      fetchNotifications();
      fetchStatistics();
    }
  }, [isAuthenticated, navigate]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await getProfile(token);
      setUserInfo(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchRecentActivities = async () => {
    // Mock fetching recent activities
    setRecentActivities([
      'Joined the React Study Group',
      'Completed the JavaScript Challenge',
      'Posted a question in the forum',
    ]);
  };

  const fetchNotifications = async () => {
    // Mock fetching notifications
    setNotifications([
      'New comments on your post',
      'You have a new message from Alex',
      'Study Group meeting scheduled for tomorrow at 6 PM',
    ]);
  };

  const fetchStatistics = async () => {
    // Mock fetching user statistics
    setStatistics({ studyGroups: 5, completedTasks: 12 });
  };

  return (
    <div className="dashboard">
      <h2><center>Dashboard</center></h2>
      {userInfo ? (
        <div className="user-info">
          <h3>Welcome, {userInfo.username}!</h3>
          <p>Email: {userInfo.email}</p>
          <p>Study Groups Joined: {statistics.studyGroups}</p>
          <p>Completed Tasks: {statistics.completedTasks}</p>
          <button onClick={() => navigate('/study-group')}>View Study Groups</button>
        </div>
      ) : (
        <p>Loading user information...</p>
      )}

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))
          ) : (
            <li>No recent activities.</li>
          )}
        </ul>
      </div>

      <div className="notifications">
        <h3>Notifications</h3>
        <ul>
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <li key={index}>{notification}</li>
            ))
          ) : (
            <li>No new notifications.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
