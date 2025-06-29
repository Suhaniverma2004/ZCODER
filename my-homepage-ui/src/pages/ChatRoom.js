import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { socket } from '../socket';
import axios from 'axios';
import './ChatRoom.css';

const currentUser = { name: 'Zcoder User' };

const ChatRoom = () => {
  const { problemId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [problem, setProblem] = useState(null);
  const [error, setError] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    setProblem(null);
    setError('');
    const fetchProblemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/problems/${problemId}`);
        setProblem(response.data);
      } catch (err) {
        setError("Could not load problem details.");
      }
    };
    if (problemId) fetchProblemDetails();
  }, [problemId]);

  useEffect(() => {
    socket.connect();
    socket.on('previousMessages', (loadedMessages) => setMessages(loadedMessages));
    socket.on('receiveMessage', (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });
    if (problemId) {
      socket.emit('joinRoom', { problemId });
    }
    return () => {
      socket.off('previousMessages');
      socket.off('receiveMessage');
      socket.disconnect();
    };
  }, [problemId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (newMessage.trim() === '') return;
    socket.emit('sendMessage', { room: problemId, user: currentUser.name, text: newMessage });
    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const renderProblemHeader = () => {
    if (error) return <div className="problem-header"><h1 className="error-message-text">{error}</h1></div>;
    if (!problem) return <div className="problem-header"><h1>Loading Problem...</h1></div>;
    return (
      <div className="problem-header">
        <h1>{problem.title}</h1>
        <p>{problem.description}</p>
      </div>
    );
  };

  return (
    <div className="page-container chat-room-container">
      {renderProblemHeader()}
      <div className="chat-window">
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg._id} className={`message-bubble ${msg.user === currentUser.name ? 'my-message' : 'other-message'}`}>
              <div className="message-content">
                <strong>{msg.user}</strong>
                <p>{msg.text}</p>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <form className="message-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message... (Press Enter to send)"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button type="submit" disabled={!newMessage.trim()}>Send ➤</button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;