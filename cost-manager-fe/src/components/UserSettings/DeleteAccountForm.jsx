import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function DeleteAccountForm({ userId, handleLogout }) {
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

    if (!showWarning) {
      setShowWarning(true);
      return;
    }

    try {
      const response = await fetch(`/auth/deleteAccount/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setSuccessMessage("Account deleted successfully!");
        setTimeout(() => {
          setSuccessMessage("");
          handleLogout();
        }, 2000);
      } else {
        const error = await response.json();
        setErrorMessage(error.error);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete account");
    }
  };

  const handleCancel = () => {
    setShowWarning(false);
  };

  return (
    <form onSubmit={handleDeleteAccount}>
      <h2>Delete Account</h2>
      <hr />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password to confirm"
        />
      </label>
      <br />
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {showWarning && (
        <p className="warning-message" style={{ color: "red" }}>
          Warning: Your account and all associated data will be permanently
          deleted. This action cannot be undone.
        </p>
      )}
      <button type="submit" className="delete-btn">
        {showWarning ? "Verify Delete Account" : "Delete Account"}
      </button>
      {showWarning && (
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default DeleteAccountForm;
