import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold and display error messages

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Clear previous errors on a new submission

    const endpoint = isLoginView ? 'login' : 'signup';
    const payload = isLoginView ? { email, password } : { name, email, password };
    
    try {
      // Make the API call to your backend server
      const response = await axios.post(`http://localhost:5001/api/auth/${endpoint}`, payload);

      // --- DETAILED LOGGING FOR DEBUGGING ---
      console.log('API Response Status:', response.status);
      console.log('API Response Data:', response.data);

      // --- ROBUST SUCCESS HANDLING ---
      // For a successful LOGIN
      if (isLoginView && response.status === 200 && response.data.user) {
        console.log('Login successful on frontend. Calling context login()...');
        // Pass the user object from the API response to our global AuthContext
        login(response.data.user); 
        // Navigate to the homepage
        navigate('/home'); 
      } 
      // For a successful SIGNUP
      else if (!isLoginView && response.status === 201) {
        alert('Signup successful! Please log in with your new credentials.');
        setIsLoginView(true); // Switch to the login view
        setPassword(''); // Clear the password field for the user
      } 
      // Handle any other unexpected but successful responses
      else {
        console.log('Login failed: Response was OK but data was not in the expected format.');
        setError('Login failed due to an unexpected server response.');
      }

    } catch (err) {
      // --- SMARTER ERROR HANDLING ---
      // This will now display the specific message from the server (e.g., "Invalid credentials")
      // or fall back to a generic message if the server is completely down.
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Is the backend server running?');
      }
      console.error("API call failed:", err); // Also log the full error to the console
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-header">Zcoder</h1>
        <p className="login-subtitle">Your journey into code begins here.</p>
        
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <input 
              type="text" 
              placeholder="Your Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          
          {/* This element will now show the specific error message from the backend */}
          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="auth-button">
            {isLoginView ? 'Log In' : 'Sign Up'}
          </button>
        </form>
        
        <div className="toggle-view">
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
          <button 
            type="button" 
            onClick={() => { setIsLoginView(!isLoginView); setError(''); }} 
            className="toggle-button"
          >
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;