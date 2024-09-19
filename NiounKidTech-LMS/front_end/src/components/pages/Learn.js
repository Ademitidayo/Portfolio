import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Learn.css';

function Learn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/student-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Handle successful sign-in
        console.log('Student signed in:', data);
        // Redirect or show a success message
      } else {
        // Handle error response
        console.error('Sign-in failed:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="learn-page">
      <h1>Welcome to NiounKidTech</h1>
      <h2>Sign In as a Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email Address / Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/create-account" className="cta-button">Create Account</Link>
    </div>
  );
}

export default Learn;
