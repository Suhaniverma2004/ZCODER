import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Your imports are all correct.
import Navbar from './components/Navbar'; 
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import CodeEditor from './pages/CodeEditor';
import Bookmarks from './pages/Bookmarks';
import Leaderboard from './pages/Leaderboard';
import LoginPage from './pages/LoginPage';
import QuestionListPage from './pages/QuestionListPage';
import ChatRoom from './pages/ChatRoom';

// This correctly imports the hook for our new context.
import { useAuth } from './context/AuthContext';
import './App.css';

const AppLayout = () => {
  // --- THE FIX IS HERE ---
  // 1. We destructure the 'user' object from our context, not 'isLoggedIn'.
  // This 'user' object will be null if logged out, and will contain the user's data if logged in.
  const { user } = useAuth();
  
  return (
    <>
      {/* 2. We check for the existence of the user object. 
          If 'user' is not null, the expression is true, and the Navbar will be rendered. */}
      {user && <Navbar />}
      
      <main>
        {/* All your routes are set up perfectly and do not need to be changed. */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/code-editor" element={<ProtectedRoute><CodeEditor /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><Bookmarks /></ProtectedRoute>} />
          <Route path="/chat" element={<ProtectedRoute><QuestionListPage /></ProtectedRoute>} />
          <Route path="/chatroom/:problemId" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppLayout />
      </div>
    </Router>
  );
}

export default App;