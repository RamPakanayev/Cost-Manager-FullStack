// ForgotPassword.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [captcha, setCaptcha] = useState(null);
  const navigate = useNavigate();


  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!captcha) {
      setErrorMessage("Please complete the captcha");
      return;
    }

    try {
      const response = await fetch("/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });

      if (response.ok) {
        navigate("/password-reset");
      } else {
        const errorResponse = await response.json();
        if (errorResponse.error === "Invalid email") {
          setEmailError(true);
          setTimeout(() => setEmailError(false), 600);
        }
        setErrorMessage(errorResponse.error);
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleForgotPassword}>
      <h2>Forgot Password</h2>
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
  
    
      <button type="submit">Send Reset Link</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        <Link to="/login" className="back-to-login">
          Back to Login
        </Link>
      </p>
    </form>
  );
}

export default ForgotPassword;
