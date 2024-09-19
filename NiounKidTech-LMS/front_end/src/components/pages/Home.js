import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1>Welcome to NiounKid-Tech LMS</h1>
          <p>Empowering the Next Generation of Coders!</p>
          <p>Our interactive learning platform helps kids master coding through fun lessons, projects, and quizzes.</p>
          <Link to="/signup" className="cta-button">Get Started</Link>
        </div>
        <img src="/path-to-fun-illustration.png" alt="Coding Kids" className="hero-image" />
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why NiounKidTech?</h2>
        <div className="features-wrapper">
          <div className="feature-box">
            <img src="/path-to-icon.png" alt="Interactive" />
            <h3>Interactive Lessons</h3>
            <p>Engaging lessons with interactive coding challenges for young minds.</p>
          </div>
          <div className="feature-box">
            <img src="/path-to-icon.png" alt="Progress Tracking" />
            <h3>Progress Tracking</h3>
            <p>Track the learning progress of your child with personalized dashboards.</p>
          </div>
          <div className="feature-box">
            <img src="/path-to-icon.png" alt="Certifications" />
            <h3>Certifications</h3>
            <p>Kids earn cool certificates to celebrate their milestones.</p>
          </div>
          <div className="feature-box">
            <img src="/path-to-icon.png" alt="Quizzes" />
            <h3>Fun Quizzes</h3>
            <p>Regular quizzes ensure that learning is both effective and enjoyable.</p>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section id="gamification" className="gamification-section">
        <h2>Learning Made Fun!</h2>
        <p>Unlock badges, complete missions, and challenge friends while learning to code.</p>
        <div className="badges-container">
          <div className="badge-item">
            <img src="/badge1.png" alt="Coding Ninja" />
            <h4>Coding Ninja</h4>
          </div>
          <div className="badge-item">
            <img src="/badge2.png" alt="JavaScript Master" />
            <h4>JavaScript Master</h4>
          </div>
          <div className="badge-item">
            <img src="/badge3.png" alt="Quiz Champion" />
            <h4>Quiz Champion</h4>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <h2>What Our Students and Parents Say</h2>
        <div className="testimonial-wrapper">
          <div className="testimonial">
            <p>"The lessons are so much fun! I feel like a real coder now!"</p>
            <h4>- Kid Coder, Age 10</h4>
          </div>
          <div className="testimonial">
            <p>"My child has learned so much, and the platform is so easy to navigate!"</p>
            <h4>- Parent of a Learner</h4>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section id="cta" className="cta-section">
        <h2>Join the Coding Adventure</h2>
        <p>Sign up now and start your coding journey with NiounKidTech!</p>
        <Link to="/signup" className="cta-button">Create Account</Link>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <p>Follow us on social media:</p>
          <div className="social-icons">
            <a href="https://twitter.com/YourTwitterHandle" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com/in/YourLinkedInProfile" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://github.com/YourGitHubUsername" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </div>
        <p>&copy; 2024 NiounKidTech. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

