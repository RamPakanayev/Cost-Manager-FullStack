import React, { useState } from "react";

function UpdateInfoForm({ userId }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [inputKey, setInputKey] = useState(0);

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    setInputKey((prevKey) => prevKey + 1);

    let hasError = false;

    if (!firstName.trim()) {
      setFirstNameError(true);
      hasError = true;
    } else {
      setFirstNameError(false);
    }

    if (!lastName.trim()) {
      setLastNameError(true);
      hasError = true;
    } else {
      setLastNameError(false);
    }

    if (hasError) {
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
          key={inputKey}
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
          key={inputKey}
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
