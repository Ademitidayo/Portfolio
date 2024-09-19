import React from 'react'; 
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Teach from './components/pages/Teach';
import Learn from './components/pages/Learn';
import Home from './components/pages/Home'; // Ensure you use Home if needed

function App() {
  return (
    <Router>
      <div className="landing-page">
        <header>
          <nav>
            <ul className="nav-left">
              <Link to="/" className="nav-button">Home</Link> {/* Adjust if necessary */}
              <li><Link to="learn">Learn</Link></li>
              <li><Link to="teach">Teach</Link></li>
              <li><Link to="contact">Contact Us</Link></li>
              <li><Link to="about">About</Link></li>
            </ul>
            <div className="nav-right">
              <Link to="/login" className="nav-button">Sign In</Link>
              <Link to="/signup" className="nav-button">Create Account</Link>
              
            </div>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Add Home route if necessary */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teach" element={<Teach />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
