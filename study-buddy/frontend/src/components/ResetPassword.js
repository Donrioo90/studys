import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudyGroupList = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchGroups = async () => {
            const response = await axios.get('/api/groups', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setGroups(response.data);
        };
        fetchGroups();
    }, []);

    return (
        <div>
            <h2>Study Groups</h2>
            <ul>
                {groups.map(group => (
                    <li key={group.id}>{group.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudyGroupList;
