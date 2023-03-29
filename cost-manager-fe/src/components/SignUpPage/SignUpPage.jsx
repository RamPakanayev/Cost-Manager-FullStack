import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [serverResponse, setServerResponse] = useState("");

  const navigate = useNavigate();

  const validatePassword = (password) => {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Password must contain at least one lowercase letter
    if (!password.match(/[a-z]/)) {
      return false;
    }

    // Password must contain at least one uppercase letter
    if (!password.match(/[A-Z]/)) {
      return false;
    }

    // Password must contain at least one number
    if (!password.match(/[0-9]/)) {
      return false;
    }

    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const lowercaseEmail = email.toLowerCase();

    if (!validatePassword(password)) {
      setPasswordError(true);
      setServerResponse(
        "Password must be at least 8 characters long, Contain at least one lowercase letter, One uppercase letter, And one number"
      );
      setTimeout(() => setPasswordError(false), 600);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError(true);
      setServerResponse("Passwords do not match");
      setTimeout(() => setPasswordError(false), 600);
      return;
    }

    try {
      const response = await fetch("/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: lowercaseEmail,
          password,
          firstName,
          lastName,
          birthday,
        }),
      });

      if (response.ok) {
        const responseMessage = await response.json();
        setServerResponse(responseMessage.message);
        navigate("/login");
      } else {
        const errorResponse = await response.json();
        if (errorResponse.error === "Email already in use") {
          setEmailError(true);
          setTimeout(() => setEmailError(false), 600);
        } else if (errorResponse.error === "All fields are required") {
          setEmailError(true);
          setPasswordError(true);
          setTimeout(() => {
            setEmailError(false);
            setPasswordError(false);
          }, 600);
        }
        setServerResponse(errorResponse.error);
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      <hr />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={emailError ? "error" : ""}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={passwordError ? "error" : ""}
        />
      </label>
      <br />
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className={passwordError ? "error" : ""}
        />
      </label>
      <br />
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
      </label>
      <br />
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
      </label>
      <br />
      <label>
        Birthday:
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </label>
      <br />
      {serverResponse && <p className="error-message">{serverResponse}</p>}
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupPage;
