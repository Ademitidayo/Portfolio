import React from 'react';
import './Home.css'; // External CSS for styling

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to NIOUNKID-TECH</h1>
          <p>Empowering you to learn and grow with the best educational tools available.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-item">
            <h3>Interactive Courses</h3>
            <p>Engage with interactive, instructor-led courses designed for all levels.</p>
          </div>
          <div className="feature-item">
            <h3>Assessments & Quizzes</h3>
            <p>Test your knowledge with quizzes and receive instant feedback.</p>
          </div>
          <div className="feature-item">
            <h3>Progress Tracking</h3>
            <p>Track your learning progress and get insights into your development.</p>
          </div>
          <div className="feature-item">
            <h3>Certifications</h3>
            <p>Earn certificates upon completion to showcase your achievements.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Students Say</h2>
        <div className="testimonial-item">
          <p>"The courses are well-structured and easy to follow. I love the hands-on approach!"</p>
          <h4>- Jane Doe</h4>
        </div>
        <div className="testimonial-item">
          <p>"This platform has helped me learn faster and earn certifications in no time!"</p>
          <h4>- John Smith</h4>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Join NIOUNKID-TECH Today!</h2>
        <p>Unlock your full learning potential with our powerful tools and resources.</p>
        <button className="cta-button">Sign Up Now</button>
      </section>
    </div>
  );
}

export default Home;
