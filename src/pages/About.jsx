import React from 'react';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Globally recognized standards for sustainable business success</p>
        </div>
      </section>

      {/* Main About Details */}
      <section className="section-padding container">
        <div className="grid-2 about-details-grid">
          <div className="about-content">
            <span className="section-tag">WHO WE ARE</span>
            <h2>Institute of Business Management Systems Standards Practitioners</h2>
            <p className="lead-text">
              IBMSSP is a body of professionals in the business sustainability environment, registered by the Corporate Affairs Commission in June 12th, 2025.
            </p>
            <p>
              We promote broad and balanced engagement, ensuring diverse voices are heard through networking and collaboration. We assist in monitoring the implementation of standards and hold organizations accountable for compliance, driving sustained operational excellence.
            </p>
            <p>
              By aligning organizations with international strategic standards (such as ISO frameworks), we unlock business growth, stability, and credibility.
            </p>
          </div>
          <div className="about-image-side">
            <div className="styled-border-box">
              <div className="inner-visual-box">
                <h4>Registered June 12th, 2025</h4>
                <p>Corporate Affairs Commission (CAC)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Mandates */}
      <section className="mandates-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Core Value</span>
            <h2>Our Objectives & Values</h2>
          </div>
          <div className="grid-3 mandates-grid">
            <div className="mandate-card">
              <h3>Credibility</h3>
              <p>We prioritize accountability and commitment to high standards and professional credibility within the industry.</p>
            </div>
            <div className="mandate-card">
              <h3>Collaboration</h3>
              <p>Promoting multi-stakeholder partnerships and facilitating collaborative growth models for members.</p>
            </div>
            <div className="mandate-card">
              <h3>Advocacy</h3>
              <p>Ensuring that standards practices are widely adopted by organizations, small business enterprises (SMEs), and individuals.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
