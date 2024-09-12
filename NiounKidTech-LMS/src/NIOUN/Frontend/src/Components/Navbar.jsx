import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="nav">
        <div className="nav-logo">N<span>I</span>OUN<span>-TECH</span></div>
        <ul className="nav-menu">
            <Link to ='/'><li>Home</li></Link>
            <Link to ='/Dashboard'><li>Dashboard</li></Link>
            <Link to ='/Logins'><li className="nav-login">Logins</li></Link>
        </ul>
    </div>
  )
}
 

export default Navbar;


