import React from "react";
import ChangePassword from "./ChangePasswordForm";
import UpdateInfoForm from "./UpdateInfoForm";
import DeleteAccountForm from "./DeleteAccountForm";

function UserSettings({ userId, handleLogout }) {
  return (
    <div className="user-settings">
      <h1>User Settings</h1>
      <div className="settings-grid">
        <ChangePassword userId={userId} handleLogout={handleLogout} />
        <UpdateInfoForm userId={userId} />
        <DeleteAccountForm userId={userId} />
      </div>
    </div>
  );
}


export default UserSettings;
