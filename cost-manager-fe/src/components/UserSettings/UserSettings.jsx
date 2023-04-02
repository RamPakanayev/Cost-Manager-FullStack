import React, { useState } from 'react';
import './UserSettings.css';

function UserSettings({ userId, handleLogout }) {
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      return;
    }

    fetch(`/auth/deleteAccount/${userId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          handleLogout();
        } else {
          console.error('Error deleting account:', res);
          throw new Error('Failed to delete account');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetDeleteConfirmation = () => {
    setDeleteConfirmation(false);
  };

  return (
    <form>
      <h1>Settings</h1>
      {deleteConfirmation && (
        <div>
          <p className="warning-text">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <button onClick={resetDeleteConfirmation}>Cancel</button>
        </div>
      )}
      <button className="delete-btn" onClick={handleDeleteAccount}>
        {deleteConfirmation ? 'Verify Delete' : 'Delete Account'}
      </button>
    </form>
  );
}

export default UserSettings;
