import React, { useState } from 'react';
import './Facilitator.css';

export default function Facilitator() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    competence: '',
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}. Your facilitator application has been submitted successfully!`);
    setFormData({ name: '', email: '', phone: '', competence: '', file: null });
  };

  return (
    <div className="facilitator-page">
      <section className="page-hero">
        <div className="container">
          <h1>Become A Facilitator</h1>
          <p>Join our team of elite standards practitioners and ISO consultants</p>
        </div>
      </section>

      <section className="section-padding container facilitator-grid">
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

        <div className="facilitator-form-box">
          <div className="app-form-card">
            <h3>Application Form</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Your Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Your Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Area of Competence</label>
                <input 
                  type="text" 
                  placeholder="e.g. ISO 9001:2015, ISO 14001" 
                  value={formData.competence}
                  onChange={(e) => setFormData({...formData, competence: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Upload Profile / CV</label>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">Submit Application</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
