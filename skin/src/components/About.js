import React from 'react';
import '../styles/main.css';

const About = () => {
  return (
    <div>
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>About Me</h1>
            <p>A BTech student passionate about simplifying skincare</p>
          </div>
        </div>
      </section>

      <div className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>My Story</h2>
              <p>Hey there! I'm a BTech student who created this platform because I understand the struggle of finding a proper skincare routine. Like many of you, I've watched countless videos and read numerous articles, but nothing seemed clear or personalized enough.</p>
              
              <h2>Why I Created This Platform</h2>
              <p>I created this website to simplify skincare for everyone. Whether you're just starting your skincare journey or looking to improve your existing routine, this platform is designed to provide personalized recommendations based on your skin type and concerns.</p>
              
              <h2>My Mission</h2>
              <p>My goal is to make skincare accessible and understandable for everyone, especially those who feel overwhelmed by the vast amount of information out there. I believe that everyone deserves to have healthy, glowing skin without the confusion and complexity.</p>
            </div>
            
            <div className="about-image">
              <img src="/images/feature1.jpg" alt="About the creator" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 