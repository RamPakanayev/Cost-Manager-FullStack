import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import './LoginPage.css';

function LoginPage({ setIsLoggedIn, setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

  // Add validation for email and password here
    const lowercaseEmail = email.toLowerCase(); // Convert the email to lowercase
      
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: lowercaseEmail, password }),
    });
  
      if (response.ok) {
        const userData = await response.json();
        // Save user ID and set isLoggedIn to true
        setUserId(userData.user_id);
        setIsLoggedIn(true);
        // Navigate to the homepage
        navigate('/homepage');
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.error);
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <hr/>
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

      <button className='login' type="submit">Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Dont have a user yet?</p>
      <Link to="/signup" className='signup'>Sign up</Link>
        
    </form>
  );
}

export default LoginPage;
