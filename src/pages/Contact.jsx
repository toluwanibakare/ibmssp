import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
  };

  return (
    <div className="contact-page">
      <section className="page-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>Get in touch for consultations and membership queries</p>
        </div>
      </section>

      <section className="section-padding container grid-2 contact-grid">
        {/* Left column info */}
        <div className="contact-info-column">
          <span className="section-tag">GET IN TOUCH</span>
          <h2>We'd Love to Hear From You</h2>
          <p className="contact-intro-text">
            For general inquiries, membership registrations, corporate consultations, or partnerships, reach out via our offices or details below.
          </p>

          <div className="contact-methods">
            <div className="method-item">
              <MapPin size={24} className="method-icon" />
              <div>
                <h3>Location</h3>
                <p>334 Ikorodu Road, Anthony/Maryland, Lagos.</p>
              </div>
            </div>

            <div className="method-item">
              <Phone size={24} className="method-icon" />
              <div>
                <h3>Phone</h3>
                <p>
                  <a href="tel:08036706827">08036706827</a><br />
                  <a href="tel:08023644148">08023644148</a>
                </p>
              </div>
            </div>

            <div className="method-item">
              <Mail size={24} className="method-icon" />
              <div>
                <h3>Email</h3>
                <p><a href="mailto:info@ibmssp.org.ng">info@ibmssp.org.ng</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column form */}
        <div className="contact-form-column">
          <div className="contact-form-card">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="Membership Inquiry" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Your message here..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                <Send size={16} /> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
