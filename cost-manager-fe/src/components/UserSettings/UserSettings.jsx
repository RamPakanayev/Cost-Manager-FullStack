import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import UpdateInfoForm from "./UpdateInfoForm";
import DeleteAccountForm from "./DeleteAccountForm";

function UserSettings({ userId }) {
  return (
    <div className="user-settings">
      <h1>User Settings</h1>
      <div className="settings-grid">
        <ChangePasswordForm userId={userId} />
        <UpdateInfoForm userId={userId} />
        <DeleteAccountForm userId={userId} />
      </div>
    </div>
  );
}

export default UserSettings;
