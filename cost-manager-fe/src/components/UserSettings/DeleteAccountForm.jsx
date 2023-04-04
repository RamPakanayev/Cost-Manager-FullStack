import React, { useState } from "react";

function DeleteAccountForm({ userId }) {
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleDeleteAccount = (e) => {
    e.preventDefault();
    // Your delete account logic here
    setSuccessMessage("Account deleted successfully!");
    setTimeout(() => {
      setSuccessMessage("");
    }, 2000);
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
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <button type="submit">Delete Account</button>
    </form>
  );
}

export default DeleteAccountForm;
