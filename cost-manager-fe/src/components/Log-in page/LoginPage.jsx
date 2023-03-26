import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

function LoginPage({ setIsLoggedIn, isLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Add validation for email and password here

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Save token/session and set isLoggedIn to true
        setIsLoggedIn(true);
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle network errors
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
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
        />
      </label>
      <br />
      <button type="submit">Login</button>
      <Link to="/signup">Sign up</Link>
      {isLoggedIn && <Navigate to="/homepage" />}
    </form>
  );
}

export default LoginPage;
