//UserSettings.js
import React from 'react';

function UserSettings({ userId, handleLogout }) {
  const handleDeleteAccount = () => {
    fetch(`/auth/deleteAccount/${userId}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          handleLogout();
        } else {
          console.error('Error deleting account:', res); // Log the response here
          throw new Error('Failed to delete account');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  return (
    <div>
      <h1>Settings</h1>
      <p>Basic settings for your account</p>
      <button onClick={handleDeleteAccount}>Delete Account</button>
    </div>
  );
}

export default UserSettings;
