import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Services = () => {
  return (
    <div className="services">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Comprehensive skincare solutions tailored to your needs</p>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <div className="service-image">
            <div className="service-icon">🧴</div>
          </div>
          <div className="service-content">
            <h3>Custom Skincare Routine</h3>
            <p>Get a personalized skincare routine designed specifically for your skin type and concerns.</p>
            <ul className="service-features">
              <li>Skin type analysis</li>
              <li>Custom product recommendations</li>
              <li>Daily routine planning</li>
            </ul>
            <Link to="/skin-analysis" className="service-button">Learn More</Link>
          </div>
        </div>

        <div className="service-card">
          <div className="service-image">
            <div className="service-icon">👨‍⚕️</div>
          </div>
          <div className="service-content">
            <h3>Expert Consultation</h3>
            <p>One-on-one consultation with our experienced dermatologists for professional advice.</p>
            <ul className="service-features">
              <li>Professional skin assessment</li>
              <li>Treatment recommendations</li>
              <li>Follow-up care</li>
            </ul>
            <div className="coming-soon-badge">Coming Soon</div>
            <Link to="/contact" className="service-button" style={{opacity: 0.7, pointerEvents: 'none'}}>Coming Soon</Link>
          </div>
        </div>

        <div className="service-card">
          <div className="service-image">
            <div className="service-icon">🔬</div>
          </div>
          <div className="service-content">
            <h3>Skin Analysis</h3>
            <p>Advanced skin analysis using cutting-edge technology to understand your skin better.</p>
            <ul className="service-features">
              <li>Deep skin analysis</li>
              <li>Problem area identification</li>
              <li>Progress tracking</li>
            </ul>
            <div className="coming-soon-badge">Coming Soon</div>
            <Link to="/skin-analysis" className="service-button" style={{opacity: 0.7, pointerEvents: 'none'}}>Coming Soon</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services; 