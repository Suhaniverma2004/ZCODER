import React, { useState, useRef } from 'react'; // 'useEffect' has been removed from this line
import axios from 'axios';
import ProfileForm from '../components/ProfileForm';
import UserInfoCard from '../components/UserInfoCard';
import Scorecard from '../components/Scorecard';
import NavButtons from '../components/NavButtons';
import { useAuth } from '../context/AuthContext'; 
import './Home.css';


const Home = () => {
  // --- THE FIX IS HERE ---
  // 1. We now get the 'updateUser' function from our context.
  const { user, updateUser } = useAuth(); 

  const [profileData, setProfileData] = useState({
    ...user,
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    scoreData: {
      solved: user?.solvedCount || 0,
      totalScore: user?.totalScore || 0,
    }
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleProfileSave = async (formData) => {
    const userId = profileData._id; 
    try {
      const response = await axios.put(`http://localhost:5001/api/users/${userId}/profile`, formData);
      
      // 2. We update the component's local state to immediately show the change.
      setProfileData(prevData => ({
        ...prevData,
        ...response.data
      }));

      // 3. We call our new function to update the GLOBAL state in the context.
      updateUser(response.data);

      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile: ", error);
      alert('Failed to save profile. Please check the console for details.');
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileData(prevData => ({ ...prevData, image: newImageUrl }));
    }
  };
  if (!profileData || !profileData._id) {
    return <div className="page-container"><h1>Loading Profile...</h1></div>;
  }

  if (isEditing) {
    return (
      <div className="page-container">
        <ProfileForm
          initialData={profileData}
          onSave={handleProfileSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="page-container">
      <input
        type="file"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/gif"
      />
      
      <div className="home-dashboard">
        <header className="home-header">
          <NavButtons />
        </header>
        <div className="home-content-grid">
          <div className="main-content">
            <Scorecard scoreData={profileData.scoreData} />
          </div>
          <aside className="right-sidebar">
            <UserInfoCard
              userData={profileData}
              onEdit={() => setIsEditing(true)}
              onImageClick={handleImageClick}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;