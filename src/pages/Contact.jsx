import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Mail, Folder, MessageSquare, MapPin, Phone, Clock } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    e.target.reset();
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch for consultations and membership queries</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Contact</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="contact-layout-grid">
          {/* Left Column: Form Card */}
          <div className="contact-form-premium-card">
            <form onSubmit={handleSubmit}>
              <div className="premium-form-group">
                <label>YOUR NAME</label>
                <div className="input-with-icon-wrapper">
                  <input type="text" placeholder="Enter Your Name" required />
                  <User size={16} className="input-field-icon" />
                </div>
              </div>

              <div className="premium-form-group">
                <label>YOUR EMAIL</label>
                <div className="input-with-icon-wrapper">
                  <input type="email" placeholder="Enter Your Email" required />
                  <Mail size={16} className="input-field-icon" />
                </div>
              </div>

              <div className="premium-form-group">
                <label>SUBJECT</label>
                <div className="input-with-icon-wrapper">
                  <input type="text" placeholder="Enter Your Subject" required />
                  <Folder size={16} className="input-field-icon" />
                </div>
              </div>

              <div className="premium-form-group">
                <label>YOUR MESSAGE</label>
                <div className="input-with-icon-wrapper">
                  <textarea placeholder="Enter Your Message" rows={5} required></textarea>
                  <MessageSquare size={16} className="input-field-icon textarea-icon" />
                </div>
              </div>

              <button type="submit" className="btn btn-primary premium-submit-btn">
                SUBMIT
              </button>
            </form>
          </div>

          {/* Right Column: Contact Info Stack */}
          <div className="contact-info-premium-stack">
            <span className="contact-info-subheading">Contact Info to</span>
            <h2 className="contact-info-mainheading">Reach Our Expert Team</h2>
            <p className="contact-info-description">
              Send a message through given form. If your enquiry is time sensitive please use below contact details.
            </p>

            <div className="info-cards-stack">
              {/* Office Address Card */}
              <div className="info-card-item">
                <div className="info-card-icon-circle">
                  <MapPin size={18} color="#ffffff" />
                </div>
                <div className="info-card-details">
                  <h3>Office Address</h3>
                  <p>334 Ikorodu Road, Anthony/Maryland, Lagos.</p>
                </div>
              </div>

              {/* General Enquiries Card */}
              <div className="info-card-item">
                <div className="info-card-icon-circle">
                  <Phone size={18} color="#ffffff" />
                </div>
                <div className="info-card-details">
                  <h3>General Enquires</h3>
                  <p>
                    +2348036706827, +2348023644148<br />
                    contact@ibmssp.org.ng, f.kolawole@ibmssp.org.ng
                  </p>
                </div>
              </div>

              {/* Operation Hours Card */}
              <div className="info-card-item">
                <div className="info-card-icon-circle">
                  <Clock size={18} color="#ffffff" />
                </div>
                <div className="info-card-details">
                  <h3>Operation Hours</h3>
                  <p>Mon-Fri: 09.00 to 05.00 (Sat, Sun: Closed)</p>
                </div>
              </div>
            </div>

            {/* Social Icons (Own Socials Only: X and LinkedIn) */}
            <div className="contact-socials-row">
              <a href="https://linkedin.com/company/ibmssp/" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://x.com/ibmssp_ng" target="_blank" rel="noopener noreferrer" className="social-circle-link" aria-label="Twitter">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="contact-map-section">
        <div className="map-iframe-container">
          <iframe 
            title="IBMSSP Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.9529122602277!2d3.371829!3d6.551646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8d780ef4fe59%3A0x6334a1795c34adfc!2s334%20Ikorodu%20Rd%2C%20Anthony%20102216%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
