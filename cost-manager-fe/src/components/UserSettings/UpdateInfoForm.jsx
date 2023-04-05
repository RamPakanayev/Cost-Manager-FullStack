import React, { useState } from "react";

function UpdateInfoForm({ userId }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");




  
  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setFirstNameError(true);
      return;
    }
    if (!lastName.trim()) {
      setLastNameError(true);
      return;
    }
    try {
      const response = await fetch(`/auth/updateInfo/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"), // include JWT token for authentication
        },
        body: JSON.stringify({ firstName, lastName }),
      });
      const data = await response.json();
      setSuccessMessage(data.message);
      setFirstName("");
      setLastName("");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);

    } catch (error) {
      console.error(error);
    }
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
          onChange={(e) => {
            setFirstName(e.target.value);
            setFirstNameError(false);
            
          }}
          placeholder="Enter first name"
          className={firstNameError ? "error" : ""}
        />
        {firstNameError && <div className="error-message">First name is required.</div>}
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            setLastNameError(false);
          }}
          placeholder="Enter last name"

          className={lastNameError ? "error" : ""}
        />
        {lastNameError && <div className="error-message">Last name is required.</div>}
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
