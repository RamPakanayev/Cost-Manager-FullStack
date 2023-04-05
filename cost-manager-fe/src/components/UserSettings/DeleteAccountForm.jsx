import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DeleteAccountForm({ userId, handleLogout }) {
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
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
        setPasswordError(true);
        setTimeout(() => {
          setPasswordError(false);
        }, 500);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to delete account");
      setPasswordError(true);
      setTimeout(() => {
        setPasswordError(false);
      }, 500);
    }
  };

  const handleCancel = () => {
    setShowWarning(false);
    setErrorMessage(false);
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
          className={passwordError ? "error" : ""}
        />
      </label>

      {!successMessage && errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {!successMessage && showWarning && (
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
