import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

function Login() {
  const [role, setRole] = useState(''); // Add role state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Add error message state
  const [successMessage, setSuccessMessage] = useState(''); // Add success message state

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role, username, password }),
      });
      
      const result = await response.json();
      console.log('Response status:', response.status);  // Log the status code
      console.log('Result:', result);  // Log the full result

      if (response.ok) {
        setSuccessMessage(result.message || 'Login successful! Redirecting...');
        // Redirect or perform any action after successful login
        setTimeout(() => {
          window.location.href = '/dashboard'; // Redirect after 2 seconds
        }, 2000);
      } else {
        setErrorMessage(result.message || 'Login failed. Please try again.');
        setSuccessMessage(''); // Clear success message
      }
    } catch (error) {
      setErrorMessage('An error occurred during signup. Please try again.');
      setSuccessMessage(''); // Clear success message
    }
  };

  return (
    <div className="login-page">
      {/* Popup for error message */}
      {errorMessage && (
        <div className="popup error show">
          {errorMessage}
        </div>
      )}

      {/* Popup for success message */}
      {successMessage && (
        <div className="popup success show">
          {successMessage}
        </div>
      )}
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <select 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <p>
          Don't have a profile? <Link to="/signup" className="cta-button">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;