import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
// We can reuse the same CSS as QuestionListPage
import './QuestionListPage.css'; 

const BookmarksPage = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/bookmarks/user/${user._id}`);
        setBookmarks(response.data);
      } catch (err) {
        console.error("Failed to fetch bookmarks:", err);
        setError("Could not load your bookmarks. Please try again later.");
      }
      setIsLoading(false);
    };
    fetchBookmarks();
  }, [user]);

  if (isLoading) return <div className="page-container"><p>Loading your bookmarks...</p></div>;
  if (error) return <div className="page-container"><p className="error-message-text">{error}</p></div>;

  return (
    <div className="page-container">
      <h1>My Bookmarks</h1>
      <p>All your saved problems, ready for you to practice.</p>
      <div className="question-list">
        {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <Link key={bookmark._id} to={`/chatroom/${bookmark.problem.problemId}`} className="question-link-card">
              <div className="question-info">
                <h3>{bookmark.problem.title}</h3>
                <p className="question-topic">{bookmark.problem.topic}</p>
              </div>
              <div className="question-meta">
                <span className={`difficulty-tag ${bookmark.problem.difficulty.toLowerCase()}`}>{bookmark.problem.difficulty}</span>
                <span className="join-chat-link">Go to Chat →</span>
              </div>
            </Link>
          ))
        ) : (
          <p>You haven't bookmarked any problems yet. Go to the "Chat Rooms" page to find some!</p>
        )}
      </div>
    </div>
  );
};

export default BookmarksPage;