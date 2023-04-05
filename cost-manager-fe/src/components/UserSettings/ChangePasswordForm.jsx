import React, { useState, useEffect } from "react";
// import "./ChangePassword.css";

function ChangePassword({ userId, handleLogout }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  }, [errorMessage]);

  function validatePassword(password) {
    if (password.length < 8) {
      return false;
    }
    if (!password.match(/[a-z]/)) {
      return false;
    }
    if (!password.match(/[A-Z]/)) {
      return false;
    }
    if (!password.match(/[0-9]/)) {
      return false;
    }
    return true;
  }

  function validateInputs() {
    let isValid = true;

    if (newPassword !== confirmNewPassword) {
      setPasswordError(true);
      setErrorMessage("New passwords do not match.");
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (newPassword.trim() === "" || confirmNewPassword.trim() === "") {
      setPasswordError(true);
      setErrorMessage("New password fields cannot be empty.");
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (!validatePassword(newPassword)) {
      setPasswordError(true);
      setErrorMessage(
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number."
      );
      isValid = false;
    } else {
      setPasswordError(false);
    }

    // if (isValid) {
    //   // setSuccessMessage("Password changed successfully!");
    //   setTimeout(() => {
    //     setSuccessMessage("");
    //   }, 2000);
    // }

    return isValid;
  }
  function handleChangePassword(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!validateInputs()) {
      return;
    }

    const passwordData = {
      user_id: userId,
      old_password: currentPassword,
      new_password: newPassword,
    };

    const token = localStorage.getItem("token");

    fetch(`/auth/changePassword/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify(passwordData),
    })
      .then((res) => {
        if (res.ok) {
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          setSuccessMessage("Password changed successfully!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 2000);
          setTimeout(() => {
            handleLogout();
          }, 2000);
        } else {
          return res.json().then((data) => {
            setErrorMessage(data.error);
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error changing password");
      });
  }

  return (
    <form className="change-password-form" onSubmit={handleChangePassword}>
      <h2>Change Password</h2>
      <hr />

      <label>
        Current Password:
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Enter current password"
          required
        />
      </label>
      <br />

      <label>
        New Password:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          required
          className={passwordError ? "error" : ""}
        />
      </label>
      <br />

      <label>
        Confirm New Password:
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm new password"
          required
          className={passwordError ? "error" : ""}
        />
      </label>

      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : successMessage && !errorMessage ? (
        <div className="success-message">{successMessage}</div>
      ) : null}

      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePassword;
