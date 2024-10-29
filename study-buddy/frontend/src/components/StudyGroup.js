import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudyGroup.css';

const StudyGroup = () => {
    const [groups, setGroups] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                setError('You need to log in to access study groups.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/study-group', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                // Add showMembers field to each group
                const groupsWithShowMembers = response.data.study_groups.map(group => ({
                    ...group,
                    showMembers: false,
                }));
                setGroups(groupsWithShowMembers);
                setError(''); // Clear any previous error
            } catch (error) {
                handleError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const joinGroup = async (groupId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in to join a group.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/study-group/join', { groupId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            // Update the members list after joining
            setGroups((prevGroups) =>
                prevGroups.map((group) => {
                    if (group.id === groupId) {
                        return { ...group, members: [...group.members, response.data.newMember] };
                    }
                    return group;
                })
            );
            setError('');
        } catch (error) {
            handleError(error);
        }
    };

    const leaveGroup = async (groupId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You need to log in to leave a group.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/study-group/leave', 
            { groupId }, 
            {
                headers: { Authorization: `Bearer ${token}` }
            });
    
            // Update the members list after leaving
            setGroups((prevGroups) =>
                prevGroups.map((group) => {
                    if (group.id === groupId) {
                        return { ...group, members: response.data.members };
                    }
                    return group;
                })
            );
            setError('');
        } catch (error) {
            handleError(error);
        }
    };

    const toggleMembers = (groupId) => {
        setGroups((prevGroups) =>
            prevGroups.map((group) => {
                if (group.id === groupId) {
                    return { ...group, showMembers: !group.showMembers };
                }
                return group;
            })
        );
    };

    const handleError = (error) => {
        if (error.response) {
            console.error('Error:', error.response.data);
            setError(error.response.data.message || 'An error occurred.');
        } else {
            console.error('Error:', error.message);
            setError('An error occurred.');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Your Study Groups</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {groups.length > 0 ? (
                <ul>
                    {groups.map((group) => (
                        <li key={group.id}>
                            <h3>{group.name}</h3>
                            <button onClick={() => joinGroup(group.id)}>Join Group</button>
                            <button onClick={() => leaveGroup(group.id)}>Leave Group</button>
                            <button onClick={() => toggleMembers(group.id)}>
                                {group.showMembers ? 'Hide Members' : 'Show Members'}
                            </button>
                            {group.showMembers && group.members && group.members.length > 0 && (
                                <div>
                                    <h4>Members:</h4>
                                    <ul>
                                        {group.members.map((member) => (
                                            <li key={member.id}>{member.username}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No study groups found.</p>
            )}
        </div>
    );
};

export default StudyGroup;
