import React, { useState } from 'react';
import './Admin.css'; // Make sure Admin.css is correctly linked

function AdminSignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/admin/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Successful sign-in
        setPopupMessage('Sign-in successful! Redirecting to dashboard...');
        setIsSuccess(true);
        setIsPopupVisible(true);

        // Redirect to the admin dashboard after a delay
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 2000);
      } else {
        setPopupMessage(result.message || 'Invalid login credentials.');
        setIsSuccess(false);
        setIsPopupVisible(true);
      }
    } catch (error) {
      setPopupMessage('An error occurred during sign-in.');
      setIsSuccess(false);
      setIsPopupVisible(true);
    }

    // Hide the popup after 3 seconds
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  return (
    <div className="admin-signin-container">
      <div className="admin-signin-form">
        <h2>Admin Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Popup message for error/success */}
      <div className={`popup ${isSuccess ? 'success' : ''} ${isPopupVisible ? 'show' : ''}`}>
        {popupMessage}
      </div>
    </div>
  );
}

export default AdminSignIn;
