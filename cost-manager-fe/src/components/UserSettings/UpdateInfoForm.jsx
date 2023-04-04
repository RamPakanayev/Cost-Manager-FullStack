import React, { useState } from "react";

function UpdateInfoForm({ userId }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [successMessage, setSuccessMessage] = useState("");




  
  const handleUpdateInfo = (e) => {
    e.preventDefault();
    // Your update info logic here
    setSuccessMessage("User info updated successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
  };

  return (
    <form onSubmit={handleUpdateInfo}>
      <h2>Update User Info</h2>
      <hr />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
      </label>
      <br />
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <button type="submit">Update Info</button>
    </form>
  );
}

export default UpdateInfoForm;
