import React, { useState } from 'react';
import './Signup.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState(''); // Default role is 'student'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          fullName,
          email,
          phone,
          address,
          role
        }),
      });

      const result = await response.json();
      console.log('Response status:', response.status);  // Log the status code
      console.log('Result:', result);  // Log the full result

      if (!response.ok) {
        setErrorMessage(result.message || 'Signup failed. Please try again.');
      } else {
        // Handle successful signup (optional)
        console.log('User signed up successfully', result);
        setErrorMessage('');
    }
} catch (error) {
    setErrorMessage('An error occurred during signup. Please try again.');
}
};
return (
  <div className="signup-container">
    {/* Error banner for displaying messages */}
    {errorMessage && <div className="error-banner">{errorMessage}</div>}
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
  
        Already have an account? <a href="/login">Sign In</a>
    </div>
  );
}

export default Signup;