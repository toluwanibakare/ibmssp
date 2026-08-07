import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, CheckSquare, Award, Eye, Target } from 'lucide-react';
import './About.css';

export default function About() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="page-hero">
        <div className="container">
          <h1>About Us</h1>
          <p>Globally recognized standards for sustainable business success</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>About Us</span>
          </div>
        </div>
      </section>

      {/* Main About Details */}
      <section className="section-padding container">
        <div className="grid-2 about-details-grid">
          <div className="about-content">
            <span className="section-tag-underlined">We are</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginBottom: '1.5rem' }}>Leaders in ISO Practices</h2>
            
            <div className="nigeria-op-row">
              <div className="flag-circle">
                <div className="flag-green"></div>
                <div className="flag-white"></div>
                <div className="flag-green"></div>
              </div>
              <div className="flag-text">
                <strong>Since June 2025,</strong>
                <span>Operating in Nigeria.</span>
              </div>
            </div>

            <p className="about-desc">
              Institute of Business Management Systems Standards Practitioners (IBMSSP) is a body of professionals in the business sustainability environment, registered by the Corporate Affairs Commission in June 12, 2025 (RC) to provide a platform that enables business organizations leverage on the international standard global best practices for growth and business continuity.
            </p>
            <p className="about-desc">
              The aim is to help business organizations deliver positive performance, and achieve improvement on their priorities, their purpose, and their people.
            </p>

            <div className="about-features-row">
              <div className="about-feat-item">
                <div className="feat-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .5 2.2 1.5 3.1.7.8 1.3 1.5 1.5 2.4"/><path d="M9 18h6M10 22h4"/></svg>
                </div>
                <div>
                  <h4>Tailored Advice & Support</h4>
                </div>
              </div>
              <div className="about-feat-item">
                <div className="feat-icon-box">
                  <CheckSquare size={20} />
                </div>
                <div>
                  <h4>Flexible Company Policies</h4>
                </div>
              </div>
            </div>

            <Link to="/services" className="btn btn-primary" style={{ marginTop: '2rem', display: 'inline-block' }}>Our Services</Link>
          </div>

          <div className="about-collage-column">
            <div className="about-collage-container">
              {/* Left Portrait */}
              <div className="collage-item portrait-item">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" alt="Black Executive Woman" />
              </div>

              {/* Right Landscape with Play Button */}
              <div className="collage-item landscape-item" onClick={() => setIsVideoOpen(true)}>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80" alt="Workspace Graph Charts" />
                <button className="collage-play-btn" aria-label="Play video">
                  <Play size={20} fill="currentColor" />
                </button>
              </div>

              {/* Green Overlay Card */}
              <div className="collage-card-info">
                <h3>ISO Based Business Performance Improvement Assessment Model</h3>
                <div className="card-tag">MSAT MODEL</div>
                <div className="quote-watermark">“</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className="video-modal-overlay" onClick={() => setIsVideoOpen(false)}>
          <div className="video-modal-content" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" onClick={() => setIsVideoOpen(false)}>✕</button>
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/2xBNlUspP1Q?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Our Business / Stand Out Section */}
      <section className="standout-section section-padding">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-tag-underlined">Our Business</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Stand Out From The Rest</h2>
          </div>

          <div className="standout-grid">
            {/* Column 1 */}
            <div className="so-col col-1">
              <div className="so-img-card portrait-card">
                <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80" alt="Businessman" />
              </div>
              <div className="so-text-card">
                <div className="so-icon-box">
                  <Eye size={36} color="var(--primary-color)" />
                </div>
                <h3>Our Vision</h3>
                <p>Promoting Business Success through Global Standardization.</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="so-col col-2">
              <div className="so-text-card tall-card">
                <div className="so-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px' }}>
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                </div>
                <h3>Our Special Traits</h3>
                <p>Outlined below are distinctive characteristics that define our organization - unveiling the essence of our values and commitment.</p>
                <ul className="so-traits-list">
                  <li>Inclusiveness</li>
                  <li>Independence</li>
                  <li>Strength</li>
                  <li>Partnership</li>
                </ul>
                <Link to="/membership" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', marginTop: '1.5rem' }}>READ MORE</Link>
              </div>
            </div>

            {/* Column 3 */}
            <div className="so-col col-3">
              <div className="so-text-card">
                <div className="so-icon-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '36px', height: '36px' }}>
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3>Our Mission</h3>
                <p style={{ fontSize: '0.85rem' }}>
                  Advocating strategic partnerships with capable practitioners and forward-thinking organizations dedicated to successfully implementing and benefiting from internationally recognized management system standards as a foundation for national development and organizational success.
                </p>
              </div>
              <div className="so-img-card landscape-card">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80" alt="Stacked Hands" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
