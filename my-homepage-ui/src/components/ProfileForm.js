import React, { useState } from 'react';
import './ProfileForm.css';

const ProfileForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {});
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email) {
      setError('Name and email are required.');
      return;
    }

    setError('');
    onSave(formData); // Pass to parent to handle API call
  };

  return (
    <div className="profile-form-card">
      <form onSubmit={handleSubmit}>
        <h3>Edit Your Profile</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name || ''} onChange={handleChange} />

        <label htmlFor="title">Title / Role</label>
        <input type="text" id="title" name="title" value={formData.title || ''} onChange={handleChange} />

        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" value={formData.email || ''} onChange={handleChange} />

        <label htmlFor="github">GitHub Profile URL</label>
        <input type="text" id="github" name="github" value={formData.github || ''} onChange={handleChange} />

        <label htmlFor="linkedin">LinkedIn Profile URL</label>
        <input type="text" id="linkedin" name="linkedin" value={formData.linkedin || ''} onChange={handleChange} />

        {error && <p className="error-message">{error}</p>}

        <div className="form-buttons">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
