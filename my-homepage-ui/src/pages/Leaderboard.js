import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leaderboard.css';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/leaderboard');
        setUsers(response.data);
      } catch (err) {
        setError("Could not load leaderboard.");
      }
      setIsLoading(false);
    };
    fetchLeaderboardData();
  }, []);

  if (isLoading) {
    return <div className="page-container"><p>Loading leaderboard...</p></div>;
  }
  if (error) {
    return <div className="page-container"><p className="error-message-text">{error}</p></div>;
  }

  return (
    <div className="page-container">
      <h1>Leaderboard</h1>
      <p>Top performers on the Zcoder platform.</p>
      <div className="leaderboard-table">
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>User</span>
          <span>Questions Solved</span>
          <span>Total Score</span>
        </div>
        {users.map((user, index) => (
          <div key={user._id} className="leaderboard-row">
            <span className="rank">{index + 1}</span>
            <span className="user-name">{user.name}</span>
            <span className="solved-count">{user.solvedCount}</span>
            <span className="total-score">{user.totalScore}</span>
          </div>
        ))}
        {users.length === 0 && <p>No users found on the leaderboard yet.</p>}
      </div>
    </div>
  );
};

export default Leaderboard;