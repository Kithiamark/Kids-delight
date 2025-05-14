import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import dayjs from 'dayjs';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      const userList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div className="useer-table">
      <h2 className="table-title">User Overview</h2>
      <table className="table">
        <thead>
          <tr className="border">
            <th className="header">Name</th>
            <th className="header">Age Group</th>
            <th className="header">Lessons</th>
            <th className="header">Quiz Avg</th>
            <th className="header">Last Active</th>
            <th className="header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border">
              <td className="labels">{user.name}</td>
              <td className="labels">{user.ageGroup}</td>
              <td className="labels">{user.lessonsCompleted || 0}</td>
              <td className="labels">{user.quizAvg || 0}%</td>
              <td className="labels">{dayjs(user.lastActive?.toDate?.() || user.lastActive).format('MMM D')}</td>
              <td className="labels">
                <button className="button">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
