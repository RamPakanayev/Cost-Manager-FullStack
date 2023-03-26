import React, { useState } from 'react';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Add validation for email and password here

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Save token/session and redirect user to the main page
      } else {
        // Handle errors
      }
    } catch (error) {
      // Handle network errors
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Signup</h2>
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
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupPage;
