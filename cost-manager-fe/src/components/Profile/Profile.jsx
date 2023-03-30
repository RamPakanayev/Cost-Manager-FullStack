import React, { useState, useEffect } from "react";
import "./Profile.css";

function Profile({ token }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch("/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (token) {
      getUserData();
    }
  }, [token]);

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <hr />
      <p>Email: {userData.email}</p>
      <p>First Name: {userData.first_name}</p>
      <p>Last Name: {userData.last_name}</p>
      <p>Birthday: {userData.birthday}</p>
    </div>
  );
}

export default Profile;
