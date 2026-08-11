import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Quote, Send, User } from 'lucide-react';
import './Testimonials.css';

const initialTestimonials = [
  {
    name: 'Chukwuma Nduka',
    role: 'Operations Lead',
    org: 'Zenith Agri-Tech',
    rating: 5,
    text: "IBMSSP's QMS standardisation assessments helped us identify critical gaps in our supply chain, increasing our processing speed by 35%. The baseline roadmap was simple to implement and brought immediate results.",
    date: 'July 14, 2026'
  },
  {
    name: 'Fatima Bello',
    role: 'QMS Certified Auditor',
    org: 'Freelance Compliance Partner',
    rating: 5,
    text: "As a graduate, the auditor accreditation program completely changed my professional trajectory. The instructors were practical and standardisation assessments prepared me to consult globally. I got hired within three months of certification.",
    date: 'June 28, 2026'
  },
  {
    name: 'Adebayo Williams',
    role: 'Director of Quality',
    org: 'Integral Manufacturing',
    rating: 5,
    text: "The MSAT assessment tool is remarkably intuitive. It gave us a clear baseline roadmap to prepare for our ISO 9001:2015 certification audit. We passed the certification inspection on our first attempt with zero non-conformity findings.",
    date: 'May 10, 2026'
  }
];

const archiveTestimonials = [
  {
    name: 'Olumide Johnson',
    role: 'General Manager',
    org: 'Prime Energy Systems',
    rating: 5,
    text: "Working with IBMSSP's advisory team restructured our operational hierarchy, resolving communication blocks that had stalled our progress for years. Highly recommended for growing businesses.",
    date: 'April 20, 2026'
  },
  {
    name: 'Ese Oghene',
    role: 'Compliance Lead',
    org: 'Apex Health Services',
    rating: 4,
    text: "The business help desk answered our queries about standards implementation within hours. Having round-the-clock auditor expertise made our compliance transition stress-free.",
    date: 'March 18, 2026'
  },
  {
    name: 'Dr. Evelyn Peters',
    role: 'Senior Consultant',
    org: 'Standardization Hub',
    rating: 5,
    text: "IBMSSP provides a robust community and exclusive library tools that reduce documentation times. It is the premier platform for quality management systems practitioners in the country.",
    date: 'January 12, 2026'
  }
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showArchive, setShowArchive] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    org: '',
    rating: 5,
    text: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim()) return;

    // Simulate review queue
    setSubmitted(true);
    setFormData({ name: '', role: '', org: '', rating: 5, text: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const handleLoadMore = () => {
    if (!showArchive) {
      setTestimonials([...testimonials, ...archiveTestimonials]);
      setShowArchive(true);
    }
  };

  return (
    <div className="testimonials-page">
      <section className="page-hero">
        <div className="container">
          <h1>Client Testimonials</h1>
          <p>Read what quality management system practitioners and organizations say about us</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Testimonials</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="testimonials-layout-grid">
          {/* Left Column: Testimonial List */}
          <div className="testimonials-list-column">
            <span className="testimonials-subheading">FEEDBACK</span>
            <h2 className="testimonials-mainheading">Practitioner Success Stories</h2>
            
            <div className="testimonials-grid-cards">
              {testimonials.map((t, idx) => (
                <div key={idx} className="testimonial-premium-card">
                  <div className="card-quote-icon">
                    <Quote size={24} />
                  </div>
                  <div className="testimonial-rating-row">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < t.rating ? 'var(--neutral-iron)' : 'none'} 
                        color={i < t.rating ? 'var(--neutral-iron)' : '#eaeaea'} 
                      />
                    ))}
                  </div>
                  <p className="testimonial-card-text">"{t.text}"</p>
                  <div className="testimonial-card-author">
                    <div className="author-avatar-circle">
                      <User size={16} color="var(--primary-color)" />
                    </div>
                    <div className="author-card-meta">
                      <h4>{t.name}</h4>
                      <span>{t.role} • {t.org}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!showArchive && (
              <div className="load-more-testimonials-row">
                <button className="btn btn-secondary load-more-btn" onClick={handleLoadMore}>
                  View More Testimonials
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Testimony Submission Form */}
          <div className="testimony-form-column">
            <div className="testimony-form-card">
              <h3>Share Your Story</h3>
              <p>We value your feedback. Let us know how IBMSSP has impacted your organization or professional growth.</p>
              
              {!submitted ? (
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
                    <label>DESIGNATION / JOB TITLE</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        placeholder="e.g. Quality Assurance Manager"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        required 
                      />
                      <Briefcase size={16} className="input-field-icon" />
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>ORGANIZATION / BUSINESS NAME</label>
                    <div className="input-with-icon-wrapper">
                      <input 
                        type="text" 
                        placeholder="e.g. Zenith Agri-Tech"
                        value={formData.org}
                        onChange={(e) => setFormData({...formData, org: e.target.value})}
                        required 
                      />
                      <User size={16} className="input-field-icon" />
                    </div>
                  </div>

                  {/* Stars selector */}
                  <div className="premium-form-group">
                    <label>YOUR RATING</label>
                    <div className="rating-selector-row" style={{ display: 'flex', gap: '0.45rem', marginTop: '0.25rem' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={24} 
                          onClick={() => handleRatingChange(i + 1)}
                          style={{ cursor: 'pointer' }}
                          fill={i < formData.rating ? 'var(--neutral-iron)' : 'none'}
                          color={i < formData.rating ? 'var(--neutral-iron)' : '#cccccc'}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="premium-form-group">
                    <label>YOUR EXPERIENCE / TESTIMONY</label>
                    <textarea 
                      placeholder="Write your feedback details here..." 
                      rows={5}
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'block', padding: '0.9rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                    <Send size={14} style={{ marginRight: '0.5rem', display: 'inline-block', verticalAlign: 'middle' }} /> Submit Testimony
                  </button>
                </form>
              ) : (
                <div className="testimony-success-feedback" style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div className="success-icon-badge" style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(57, 131, 138, 0.1)', borderRadius: '50%', color: 'var(--neutral-iron)', marginBottom: '1.25rem' }}>
                    <Star size={32} fill="var(--neutral-iron)" />
                  </div>
                  <h4>Testimony Received!</h4>
                  <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', lineHeight: '1.6' }}>
                    Thank you for sharing your experience. Your testimony has been sent to our editorial board for review and verification approval before publishing.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
