import React from 'react';
import './UserInfoCard.css';

const UserInfoCard = ({ userData, onEdit, onImageClick }) => {
  return (
    <div className="user-info-card">
      <div className="user-details">
        <img 
          src={userData.image} 
          alt="User Avatar" 
          className="user-avatar"
          onClick={onImageClick}
          title="Click to upload a new image"
        />
        <div className="user-text">
          <h2 className="user-name">{userData.name}</h2>
          <p className="user-title">{userData.title}</p>
          <p className="user-email">{userData.email}</p>
        </div>
      </div>
      <button onClick={onEdit} className="edit-button">Edit Profile</button>
    </div>
  );
};

export default UserInfoCard;