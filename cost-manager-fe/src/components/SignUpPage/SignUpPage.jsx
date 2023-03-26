import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  // const [userId, setUserId] = useState('');
  const [serverResponse, setServerResponse] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
      e.preventDefault();
    
      const lowercaseEmail = email.toLowerCase(); // Convert the email to lowercase
    
      try {
        const response = await fetch('/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: lowercaseEmail, password, firstName, lastName, birthday }),
        });
    
        if (response.ok) {
          const responseMessage = await response.json();
          alert(responseMessage.message); // Show server response message in an alert
          navigate('/login'); // Navigate back to the login page
        } else {
          const errorResponse = await response.json();
          alert(errorResponse.error); // Show server response error in an alert
        }
      } catch (error) {
        // Handle network errors
        alert('Network error: ' + error.message);
      }
  };
  

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
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
      {/* <label>
        ID:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
      </label> */}
      <br />
      <button type="submit">Signup</button>
    </form>
  );
}

export default SignupPage;

