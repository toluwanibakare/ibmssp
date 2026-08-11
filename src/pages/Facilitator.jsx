import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, User, Mail, Phone, Briefcase, FileText, CheckCircle } from 'lucide-react';
import './Facilitator.css';

export default function Facilitator() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    competence: '',
    file: null
  });
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="facilitator-page">
      <section className="page-hero">
        <div className="container">
          <h1>Become A Facilitator</h1>
          <p>Join our team of elite standards practitioners and ISO consultants</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Become A Facilitator</span>
          </div>
        </div>
      </section>

      <section className="section-padding container facilitator-grid">
        {/* Left info column */}
        <div className="facilitator-content">
          <span className="section-tag">OPPORTUNITY</span>
          <h2>Share Your Expertise</h2>
          <p className="intro-txt">
            We are looking for qualified management systems experts, ISO lead auditors, and strategic practitioners to join our panel of educational facilitators and professional program instructors.
          </p>
          <ul className="facilitator-requirements">
            <li>Must hold recognized credentials (ISO Lead Auditor or equivalent certification)</li>
            <li>Minimum of 5 years of practical implementation or auditing experience</li>
            <li>Excellent communication and educational presentation skills</li>
            <li>Commitment to promoting ethical business system sustainability standardizations</li>
          </ul>
        </div>

        {/* Right form card column */}
        <div className="facilitator-form-box">
          <div className="app-form-card">
            {!submitted ? (
              <>
                <h3>Application Form</h3>
                <form onSubmit={handleSubmit}>
                  <div className="premium-form-group">
                    <label>YOUR NAME</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                      <User size={16} className="input-field-icon" />
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>YOUR EMAIL</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="email" 
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                      />
                      <Mail size={16} className="input-field-icon" />
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>YOUR PHONE NUMBER</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="tel" 
                        placeholder="Enter Your Phone Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required 
                      />
                      <Phone size={16} className="input-field-icon" />
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>AREA OF COMPETENCE</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        placeholder="e.g. ISO 9001:2015, ISO 14001" 
                        value={formData.competence}
                        onChange={(e) => setFormData({...formData, competence: e.target.value})}
                        required 
                      />
                      <Briefcase size={16} className="input-field-icon" />
                    </div>
                  </div>

                  {/* Premium Styled File Upload */}
                  <div className="premium-form-group">
                    <label>UPLOAD PROFILE / CV</label>
                    <div className="file-upload-container">
                      <label className="file-upload-label">
                        <span>{formData.file ? formData.file.name : 'Upload Profile or CV (PDF, DOC, DOCX)'}</span>
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setFormData({...formData, file: e.target.files[0] ? e.target.files[0] : null})}
                          required 
                        />
                      </label>
                    </div>
                  </div>

                  {/* Acceptance Checkbox */}
                  <div className="form-checkbox-row" style={{ display: 'flex', gap: '0.65rem', alignItems: 'flex-start', margin: '1.25rem 0' }}>
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      required 
                      style={{ marginTop: '3px' }}
                    />
                    <label htmlFor="terms" style={{ fontSize: '0.8rem', color: 'var(--secondary-slate)', lineHeight: '1.4', textAlign: 'left' }}>
                      I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Terms & Conditions</Link> and <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Privacy Policy</Link>
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', display: 'block', padding: '0.9rem', fontWeight: 700, letterSpacing: '0.5px' }}
                    disabled={!termsAccepted}
                  >
                    Submit Application
                  </button>
                </form>
              </>
            ) : (
              <div className="application-success-view" style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div className="success-icon-wrapper" style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(48, 88, 88, 0.1)', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1.25rem' }}>
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-color)', marginBottom: '1rem' }}>Application Received!</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Your facilitator application and CV upload have been submitted successfully.
                </p>
                <div className="next-steps-box" style={{ backgroundColor: 'var(--bg-offset)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                  <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--primary-color)', display: 'block', marginBottom: '0.65rem', letterSpacing: '0.5px' }}>What Happens Next:</strong>
                  <ol style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--text-color)', lineHeight: '1.45' }}>
                    <li>Our accreditation and compliance board will review your competence metrics.</li>
                    <li>We will cross-check your CV and standardisation credentials.</li>
                    <li>An auditor from our support team will contact you via email or phone within 5 business days.</li>
                  </ol>
                </div>
                <Link to="/" className="btn btn-primary w-full text-center">Back to Home</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
