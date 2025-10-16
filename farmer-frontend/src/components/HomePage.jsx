import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './HomePage.css'; // Make sure this file exists with the CSS

const HomePage = () => {
  // Array of image paths from the public folder using root-relative paths
  // Make sure these images (farmer-hero-1.jpg, farmer-hero-2.jpg, farmer-hero-3.jpg)
  // are present directly in your project's 'public' folder.
  const heroImages = [
    '/farmer-hero1.png', // References public/farmer-hero-1.jpg
    '/farmer-hero2.png', // References public/farmer-hero-2.jpg
    '/farmer-hero3.avif', // References public/farmer-hero-3.jpg
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [heroImages.length]); // Re-run effect if image array length changes

  return (
    <div className="homepage-container">
      {/* Hero Section - Dynamic background image using currentImageIndex */}
      <div
        className="hero-section-home"
        style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
      >
        <div className="hero-content">
          <h1 className="fade-in-up">Your Fresh Connection, Farm to Table.</h1>
          <p className="lead fade-in-up delay-1">
            Discover the goodness of **local produce** and **support sustainable farming**.
            Authentic, fresh, and just a click away.
          </p>
          <div className="hero-buttons fade-in-up delay-2">
            <NavLink to="/signup" className="btn btn-success btn-lg hover-scale">
              Get Started
            </NavLink>
            <NavLink to="/login" className="btn btn-outline-light btn-lg hover-scale">
              Login
            </NavLink>
          </div>
        </div>
      </div>

      {/* Value Proposition Sections */}
      <div className="value-sections-wrapper">
        <div className="info-card fade-in-up delay-3">
          <i className="icon-leaf">🌿</i>
          <h2>For Farmers</h2>
          <p>Gain **direct access** to a broader market, ensuring **fair prices** for your hard-earned produce and fostering sustainable growth for your farm.</p>
          <ul>
            <li>Maximize your profits.</li>
            <li>Connect with loyal customers.</li>
            <li>Showcase your unique products.</li>
          </ul>
        </div>

        <div className="info-card fade-in-up delay-4">
          <i className="icon-basket">🛒</i> {/* Replace with actual icons */}
          <h2>For Consumers</h2>
          <p>Enjoy **farm-fresh, high-quality** ingredients delivered to your door. Support local economies and make **ethical, healthy choices** effortlessly.</p>
          <ul>
            <li>Freshest seasonal produce.</li>
            <li>Support local communities.</li>
            <li>Transparent sourcing.</li>
            <li>Sustainable Choices.</li>
          </ul>
        </div>

        <div className="info-card fade-in-up delay-5">
          <i className="icon-handshake">🤝</i> {/* Replace with actual icons */}
          <h2>Our Mission</h2>
          <p>We bridge the gap between dedicated farmers and conscious consumers, cultivating a community built on **trust, transparency, and fresh, natural goodness**.</p>
          <ul>
            <li>Empowering local agriculture.</li>
            <li>Promoting healthy eating.</li>
            <li>Building strong communities.</li>
          </ul>
        </div>
      </div>

      {/* Call to Action - Bottom Section */}
      <div className="cta-section fade-in-up delay-6">
        <h2>Ready to Join Our Community?</h2>
        <p>Whether you're a farmer ready to sell or a consumer looking for fresh, local goods, we welcome you!</p>
        <div className="cta-buttons">
          <NavLink to="/signup" className="btn btn-success btn-lg hover-scale">
            Sign Up Now
          </NavLink>
          <NavLink to="/login" className="btn btn-primary btn-lg hover-scale">
            Log In
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default HomePage;