import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, Phone, MapPin, HelpCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      {/* Mailing List Banner */}
      <div className="newsletter-banner">
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <h3>Join Our Mailing List</h3>
            <p>For receiving our news and updates in your inbox directly.</p>
          </div>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <div className="input-group">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-dark subscribe-btn">
                {subscribed ? 'Subscribed!' : <><Send size={16} /> Subscribe</>}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-widgets">
        <div className="container widgets-grid">
          {/* About Company widget */}
          <div className="footer-widget about-widget">
            <Link to="/" className="footer-logo">
              <img src="/ibmssp-logo-white.png" alt="IBMSSP White Logo" style={{ height: '40px', objectFit: 'contain' }} />
            </Link>
            <p className="widget-desc">
              A body of professionals in the business sustainability environment, registered by the Corporate Affairs Commission in June 12th, 2025.
            </p>
            <div className="consulting-box">
              <div className="consulting-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <HelpCircle size={22} color="#ffffff" />
              </div>
              <div className="consulting-text">
                <h6>Need Help?</h6>
                <Link to="/contact" className="consulting-link">Free Consultation</Link>
              </div>
            </div>
          </div>

          {/* Get in Touch widget */}
          <div className="footer-widget touch-widget">
            <h4 className="widget-title">Get In Touch</h4>
            <div className="touch-details">
              <div className="touch-item">
                <MapPin size={18} className="touch-icon" />
                <p>334 Ikorodu Road, Anthony/Maryland, Lagos.</p>
              </div>
              <div className="touch-item">
                <Phone size={18} className="touch-icon" />
                <p>
                  <a href="tel:08036706827">08036706827</a><br />
                  <a href="tel:08023644148">08023644148</a>
                </p>
              </div>
              <div className="touch-item">
                <Mail size={18} className="touch-icon" />
                <p><a href="mailto:info@ibmssp.org.ng">info@ibmssp.org.ng</a></p>
              </div>
            </div>
          </div>

          {/* Company widget */}
          <div className="footer-widget menu-widget">
            <h4 className="widget-title">Company</h4>
            <ul className="widget-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/insights">Insights</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Information widget */}
          <div className="footer-widget menu-widget">
            <h4 className="widget-title">Information</h4>
            <ul className="widget-links">
              <li><Link to="/membership/business">Membership</Link></li>
              <li><a href="#partners">Partners</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#cases">Case Studies</a></li>
            </ul>
          </div>

          {/* Essentials widget */}
          <div className="footer-widget menu-widget">
            <h4 className="widget-title">Essentials</h4>
            <ul className="widget-links">
              <li><Link to="/terms">Terms</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/facilitator">Become A Facilitator</Link></li>
              <li><a href="https://assessment.ibmssp.org.ng" target="_blank" rel="noopener noreferrer">MSAT Assessment</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-copyright" style={{ padding: '0.8rem 0' }}>
        <div className="copyright-container-wide" style={{ width: '94%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ margin: 0, fontSize: '0.82rem' }}>© 2024 IBMSSP. All Rights Reserved.</p>
          <div className="copyright-right-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="footer-socials" style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <a href="https://linkedin.com/company/ibmssp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://x.com/ibmssp_ng" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
            <div className="footer-copyright-divider" style={{ width: '1px', height: '14px', backgroundColor: 'rgba(255,255,255,0.15)' }}></div>
            <a href="https://www.tmb.it.com" target="_blank" rel="noopener noreferrer" style={{ color: '#a3a8b3', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.5px' }} className="tmb-signage-link">Built by TMB</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
