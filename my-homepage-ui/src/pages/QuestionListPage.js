import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // We need the user's ID
import './QuestionListPage.css';

const QuestionListPage = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [problems, setProblems] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set()); // Use a Set for efficient lookups
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        // Fetch both the problems and the user's existing bookmarks at the same time
        const [problemsRes, bookmarksRes] = await Promise.all([
          axios.get('http://localhost:5001/api/problems'),
          axios.get(`http://localhost:5001/api/bookmarks/user/${user._id}`)
        ]);
        
        setProblems(problemsRes.data);
        // Create a Set of the problem IDs that are already bookmarked
        setBookmarkedIds(new Set(bookmarksRes.data.map(b => b.problem._id)));

      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user]);

  const handleBookmarkClick = async (problemId, e) => {
    e.preventDefault(); // Prevent navigating to the chatroom
    e.stopPropagation(); // Stop the event from bubbling up to the Link

    try {
      await axios.post('http://localhost:5001/api/bookmarks', {
        userId: user._id,
        problemId: problemId,
      });
      // Add the new ID to our set to instantly update the UI
      setBookmarkedIds(prev => new Set(prev).add(problemId));
    } catch (error) {
      // Handle errors, e.g., if already bookmarked
      console.error('Failed to add bookmark:', error.response?.data?.message || error.message);
    }
  };

  if (isLoading) return <div className="page-container"><p>Loading questions...</p></div>;

  return (
    <div className="page-container">
      <h1>DSA Problem Discussions</h1>
      <p>Select a problem to join the chat, or click the bookmark to save it for later.</p>
      <div className="question-list">
        {problems.map((problem) => (
          <Link key={problem._id} to={`/chatroom/${problem.problemId}`} className="question-link-card">
            <div className="question-info">
              <h3>{problem.title}</h3>
              <p className="question-topic">{problem.topic}</p>
            </div>
            <div className="question-meta">
              <span className={`difficulty-tag ${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
              {/* --- NEW BOOKMARK BUTTON --- */}
              <button 
                className={`bookmark-btn ${bookmarkedIds.has(problem._id) ? 'bookmarked' : ''}`}
                onClick={(e) => handleBookmarkClick(problem._id, e)}
                title={bookmarkedIds.has(problem._id) ? 'Bookmarked' : 'Add Bookmark'}
              >
                🔖
              </button>
              <span className="join-chat-link">Join Chat</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuestionListPage;