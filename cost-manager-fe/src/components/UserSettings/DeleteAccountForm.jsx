import React, { useState } from "react";

function DeleteAccountForm({ userId }) {
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeleteAccount = async (e) => {
    e.preventDefault();

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
      <button type="submit">Delete Account</button>
    </form>
  );
}

export default DeleteAccountForm;
