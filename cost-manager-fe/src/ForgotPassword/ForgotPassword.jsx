import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
  
    // Reset the errorMessage state
    setErrorMessage("");
  
    try {
      const response = await fetch("/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase() }),
      });
  
      if (response.ok) {
        setEmailSent(true);
        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        const errorResponse = await response.json();
        if (errorResponse.error === "User not found") {
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
      {emailSent && <p className="success-message">Email sent successfully. You will be redirected shortly.</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>
        <Link to="/login" className="back-to-login linked-things">
          Back to Login
        </Link>
      </p>
    </form>
  );
}

export default ForgotPassword;
