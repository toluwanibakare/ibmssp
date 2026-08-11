import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Mail, Folder, MessageSquare, MapPin, Phone, Clock, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

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

        {/* FAQs Accordion Block */}
        <div className="contact-faq-section" style={{ marginTop: '5rem', borderTop: '1px solid var(--border-color)', paddingTop: '4rem' }}>
          <div className="faq-header-block" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span className="faq-subtag" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '0.5rem', display: 'block' }}>GET ANSWERS</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-color)', margin: 0 }}>Frequently Asked Questions</h2>
          </div>

          <div className="faq-list-accordion" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                question: "What is IBMSSP?",
                answer: "IBMSSP is the Institute of Business Management System Sustainability Standardization and Practitioners. We are dedicated to helping organizations adopt international quality standards, assess operational maturities, and build corporate resilience through systems alignment."
              },
              {
                question: "What are the membership categories available?",
                answer: "We offer membership tiers tailored for different stages: Business (for ISO certified/seeking organizations), Individuals (for Trained Auditors and Registered Consultants), Graduates (for those holding standardisation degrees/diplomas), and Students (for active learners in QMS and standard courses)."
              },
              {
                question: "How do I complete my registration payment?",
                answer: "Once you submit your application form with your credentials/verifications, you will receive an automated registration details email containing your invoice link. Log in to your My Account dashboard to view your status; you can settle the payment securely directly through the 'Complete Registration Payment' portal link."
              },
              {
                question: "What is the QMS standardisation assessment (BPIA)?",
                answer: "The Business Performance Improvement Assessment (BPIA) Model is our iconic diagnostic tool built on the requirements of international standard organizations. It helps you analyze operational risk indicators and prepares you for official ISO certification audits."
              },
              {
                question: "How can I become an IBMSSP Educational Facilitator?",
                answer: "If you have an ISO Lead Auditor certification or equivalent and over 5 years of audit/consultation experience, you can go to our 'Become a Facilitator' page, submit your contact information, upload your CV, and our compliance review board will get in touch with you."
              }
            ].map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`} style={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden', transition: 'all 0.2s ease' }}>
                  <button 
                    type="button" 
                    className="faq-question-btn" 
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    style={{ width: '100%', padding: '1.5rem', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', color: 'var(--text-color)', fontWeight: 700, fontSize: '1rem', textAlign: 'left' }}
                  >
                    <div className="faq-question-left" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <HelpCircle size={18} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                      <span>{faq.question}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-block" style={{ padding: '0 1.5rem 1.5rem 3.25rem', borderTop: '1px solid #f6f7f7', textAlign: 'left' }}>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--secondary-slate)', lineHeight: '1.6' }}>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
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
