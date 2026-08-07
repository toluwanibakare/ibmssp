import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, CheckSquare, Award, Eye, Target, GraduationCap, Lightbulb, Mic, Sparkles } from 'lucide-react';
import './About.css';

const tabData = [
  {
    num: '01',
    title: 'Inclusiveness',
    desc: 'Through a unique mix of service, technology, people, and networks, we are committed to creating and promoting a diverse and inclusive environment where businesses can thrive.'
  },
  {
    num: '02',
    title: 'Independence',
    desc: 'We maintain strict objectivity, freedom from bias, and professional distance, ensuring that our standards practitioners remain completely reliable and independent.'
  },
  {
    num: '03',
    title: 'Strength',
    desc: 'Leveraging deep strategic frameworks and robust standard protocols, we empower organisations to build structural integrity and sustainable operational capability.'
  },
  {
    num: '04',
    title: 'Partnership',
    desc: 'We foster strategic collaborations and mutual alliances with global bodies, local agencies, and corporate practitioners to drive national development and joint success.'
  }
];

export default function About() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

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
                <img src="https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&w=500&q=80" alt="Black Woman Working on Laptop" />
              </div>

              {/* Right Landscape with Play Button */}
              <div className="collage-item landscape-item" onClick={() => setIsVideoOpen(true)}>
                <img src="https://img.youtube.com/vi/2xBNlUspP1Q/hqdefault.jpg" alt="YouTube Video Preview" />
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
                  <Sparkles size={36} color="var(--primary-color)" />
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
                  <Target size={36} color="var(--primary-color)" />
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

      {/* Why IBMSSP Tabbed Section */}
      <section className="why-ibmssp-section">
        <div className="why-ibmssp-bg-overlay">
          <div className="bg-left-laptop" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80')` }}></div>
          <div className="bg-right-blank"></div>
        </div>

        <div className="container why-ibmssp-container">
          <div className="why-ibmssp-card-wrapper">
            {/* Left Tabs Card */}
            <div className="why-tabs-card">
              <div className="tabs-list">
                {tabData.map((tab, idx) => (
                  <button 
                    key={idx}
                    className={`tab-item-btn ${activeTab === idx ? 'active' : ''}`}
                    onClick={() => setActiveTab(idx)}
                  >
                    <span className="tab-num">{tab.num}.</span>
                    <span className="tab-name">{tab.title}</span>
                  </button>
                ))}
              </div>
              <Link to="/contact" className="tab-cta-btn">
                <div className="cta-phone-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', display: 'block' }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>Call For Free Consultation</span>
              </Link>
            </div>

            {/* Right Display Card */}
            <div className="why-display-card" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=800&q=80')` }}>
              <div className="why-display-overlay"></div>
              <div className="why-display-content">
                <span className="why-tag">Why IBMSSP</span>
                <h2>{tabData[activeTab].title}</h2>
                <p>{tabData[activeTab].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals of The Institute Section */}
      <section className="goals-section section-padding">
        <div className="container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-tag-underlined">Goals of</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>The Institute</h2>
          </div>

          <div className="goals-grid">
            {/* Card 01 */}
            <div className="goal-card">
              <div className="goal-number">01</div>
              <div className="goal-icon">
                <GraduationCap size={38} color="var(--primary-color)" />
              </div>
              <h3>Professionalism</h3>
              <p>Promote the study and practice of management systems implementation and certification in Nigeria</p>
            </div>

            {/* Card 02 */}
            <div className="goal-card no-icon-card">
              <div className="goal-number">02</div>
              <h3>Synergy</h3>
              <p>Provide continuous professional development for management systems stakeholders</p>
            </div>

            {/* Card 03 */}
            <div className="goal-card">
              <div className="goal-number">03</div>
              <div className="goal-icon">
                <Lightbulb size={38} color="var(--primary-color)" />
              </div>
              <h3>Research</h3>
              <p>Encourage research and dissemination of knowledge in management systems implementation</p>
            </div>

            {/* Card 04 */}
            <div className="goal-card no-icon-card">
              <div className="goal-number">04</div>
              <h3>Collaboration</h3>
              <p>Collaborate with local and international bodies on matters related to management systems.</p>
            </div>

            {/* Card 05 */}
            <div className="goal-card">
              <div className="goal-number">05</div>
              <div className="goal-icon">
                <Award size={38} color="var(--primary-color)" />
              </div>
              <h3>Standardization</h3>
              <p>Establish and maintain standards of professional conduct for members</p>
            </div>

            {/* Card 06 */}
            <div className="goal-card">
              <div className="goal-number">06</div>
              <div className="goal-icon">
                <Mic size={38} color="var(--primary-color)" />
              </div>
              <h3>Representatives</h3>
              <p>Serve as the voice of management systems professionals in Nigeria.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
