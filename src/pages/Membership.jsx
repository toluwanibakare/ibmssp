import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Building2, UserCheck, GraduationCap, ArrowRight } from 'lucide-react';
import './Membership.css';

const tiers = {
  business: {
    title: 'Corporate Membership',
    subtitle: 'For Business Organizations.',
    desc: 'These are business organizations already practicing ISO implementation and certification. They form the bulk of IBMSSP members.',
    bullets: [
      'Access to MSAT benchmarking dashboards',
      'Specialized ISO implementation support frameworks',
      'One-time free Annual Performance Assessment of QMS Maturity Level'
    ],
    price: '₦20,000 / One-Time'
  },
  individuals: {
    title: 'Individual Private Membership',
    subtitle: 'For ISO registered stakeholders.',
    desc: 'These are ISO registered stakeholders who have acquired evidence of training and experience in the implementation process of ISO practices either as trained individuals, Consultants, and Tutors.',
    bullets: [
      'Access to standard knowledge bases and research libraries',
      'Networking with industrial executives and standards leaders',
      'Eligibility to join facilitation panels'
    ],
    price: '₦10,000 / One-Time'
  },
  graduates: {
    title: 'Graduate Membership',
    subtitle: 'For fresh graduates.',
    desc: 'For fresh graduates with interest to choose a career in the ISO business sector.',
    bullets: [
      'Mentorship alignment with industry compliance auditors',
      'Foundation workshops'
    ],
    price: '₦10,000 / One-Time'
  },
  students: {
    title: 'Student Membership',
    subtitle: 'For undergraduates.',
    desc: 'For undergraduates with interest to choose a career in the ISO business sector.',
    bullets: [
      'Introductory systems standards study guides',
      'Student chapter resources'
    ],
    price: '₦5,000 / One-Time'
  }
};

export default function Membership() {
  const { type } = useParams();
  const [fileName, setFileName] = React.useState('');
  const [individualCategory, setIndividualCategory] = React.useState('auditor');

  // If no type is provided, show the landing overview dashboard with all sections
  if (!type) {
    return (
      <div className="membership-page">
        <section className="page-hero">
          <div className="container">
            <h1>Membership</h1>
            <p>Join a network dedicated to business standardizations and sustainability</p>
          </div>
        </section>

        {/* 1. Membership Structure Section */}
        <section className="section-padding container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-tag-underlined">Overview</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Membership Structure</h2>
          </div>

          <div className="structure-grid">
            <div className="structure-col">
              <div className="structure-icon-box">
                <Building2 size={24} color="#ffffff" />
              </div>
              <h3>Corporate Members</h3>
              <p>These are business organizations already practicing ISO implementation and certification. They form the bulk of IBMSSP members.</p>
            </div>

            <div className="structure-col">
              <div className="structure-icon-box">
                <UserCheck size={24} color="#ffffff" />
              </div>
              <h3>Individual Private Members</h3>
              <p>These are ISO registered stakeholders who have acquired evidence of training and experience in the implementation process of ISO practices either as a trained individuals, Consultants, and Tutors.</p>
            </div>

            <div className="structure-col">
              <div className="structure-icon-box">
                <GraduationCap size={24} color="#ffffff" />
              </div>
              <h3>Student Members</h3>
              <p>These are intending candidates with interest to choose a career in the ISO business sector.</p>
            </div>
          </div>
        </section>

        {/* 2. Membership Benefits Section */}
        <section className="benefits-section section-padding">
          <div className="container">
            <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
              <span className="section-tag-underlined">Privileges</span>
              <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Membership Benefits</h2>
            </div>

            <div className="benefits-grid">
              {/* Column 1 */}
              <div className="benefits-col">
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>Subsidized ISO training & development programmes and consultancy services through workshops and seminars.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>Promotion of business linkages and networking.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>For all those that register under any corporate membership plan, there is a one-time free Annual Performance Assessment of QMS Maturity Level.</p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="benefits-col">
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>Knowledge sharing with access to comparative info and data on ISO.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>Intervention Programme to support your journey of constant improvement.</p>
                </div>
              </div>

              {/* Column 3 */}
              <div className="benefits-col">
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>Access to information and advisory services on ISO related issues.</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-check">
                    <Check size={16} color="#ffffff" />
                  </div>
                  <p>Representation of interest.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Membership Categories Grid (iStock-style Pricing layout) */}
        <section className="section-padding container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-tag-underlined">One-Time Registration</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Membership Categories</h2>
          </div>

          {/* Row 1: 2 Tall Cards */}
          <div className="pricing-top-row">
            {/* Corporate Membership */}
            <div className="pricing-card-tall">
              <div className="pricing-card-badge">For Organizations</div>
              <div className="pricing-card-content">
                <h3>Corporate Membership</h3>
                <div className="price-label">
                  <strong>20k</strong> <span>/ One-Time</span>
                </div>
                <p>For business organizations already practicing ISO implementation and certification.</p>
                <Link to="/membership/business" className="btn-get-started">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Individual Private Membership */}
            <div className="pricing-card-tall">
              <div className="pricing-card-badge">For Individuals</div>
              <div className="pricing-card-content">
                <h3>Individual Private Membership</h3>
                <div className="price-label">
                  <strong>10k</strong> <span>/ One-Time</span>
                </div>
                <p>For ISO registered stakeholders who have acquired evidence of training and experience in the implementation process of ISO practices either as a trained Individuals, Consultants or Tutors.</p>
                <Link to="/membership/individuals" className="btn-get-started">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Row 2: 2 Horizontal Cards */}
          <div className="pricing-bottom-row">
            {/* Graduate Membership */}
            <div className="pricing-card-horizontal">
              <div className="pricing-left-price">
                <strong>10k</strong>
                <span>One-Time</span>
              </div>
              <div className="pricing-right-info">
                {/* Default state */}
                <div className="pricing-right-default">

                  <h3>Graduate Membership</h3>
                  <p>For fresh graduates with interest to choose a career in the ISO business sector.</p>
                </div>
                {/* Hover state */}
                <div className="pricing-right-hover">
                  <p className="subscribe-prompt">Click on the button below to subscribe</p>
                  <Link to="/membership/graduates" className="btn btn-primary pill-btn">Get Started</Link>
                </div>
              </div>
            </div>

            {/* Student Membership */}
            <div className="pricing-card-horizontal">
              <div className="pricing-left-price">
                <strong>5k</strong>
                <span>One-Time</span>
              </div>
              <div className="pricing-right-info">
                {/* Default state */}
                <div className="pricing-right-default">

                  <h3>Student Membership</h3>
                  <p>For undergraduates with interest to choose a career in the ISO business sector.</p>
                </div>
                {/* Hover state */}
                <div className="pricing-right-hover">
                  <p className="subscribe-prompt">Click on the button below to subscribe</p>
                  <Link to="/membership/students" className="btn btn-primary pill-btn">Get Started</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // If type is provided, show the tabbed deep detail view
  const activeType = tiers[type] ? type : 'business';
  const tier = tiers[activeType];

  return (
    <div className="membership-page">
      <section className="page-hero">
        <div className="container">
          <h1>Membership Tiers</h1>
          <p>Join a network dedicated to business standardizations and sustainability</p>
        </div>
      </section>

      <section className="section-padding container">
        <div className="membership-tabs">
          <Link to="/membership/business" className={`tab-btn ${activeType === 'business' ? 'active' : ''}`}>Business</Link>
          <Link to="/membership/individuals" className={`tab-btn ${activeType === 'individuals' ? 'active' : ''}`}>Individual</Link>
          <Link to="/membership/graduates" className={`tab-btn ${activeType === 'graduates' ? 'active' : ''}`}>Graduates</Link>
          <Link to="/membership/students" className={`tab-btn ${activeType === 'students' ? 'active' : ''}`}>Students</Link>
        </div>

        <div className="grid-2 membership-grid">
          <div className="membership-details">
            <span className="section-tag">MEMBERSHIP CATEGORY</span>
            <h2>{tier.title}</h2>
            <p className="tier-subtitle">{tier.subtitle}</p>
            <p className="tier-desc">{tier.desc}</p>
            
            <ul className="tier-bullets">
              {tier.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="membership-card-box">
            <div className="price-card">
              <h4>Annual Registration</h4>
              <div className="price-tag">{tier.price}</div>
              <p>Get listed, access resources, and join standardisation workshops immediately.</p>
              
              <div className="registration-form">
                <h3>Apply for Membership</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully!'); }}>
                  {/* Login Credentials */}
                  <input type="email" placeholder="Login Email" required />
                  <input type="password" placeholder="Password" required />

                  {/* Business Category specific fields */}
                  {activeType === 'business' && (
                    <>
                      <input type="text" placeholder="Organization Name" required />
                      <input type="email" placeholder="Organization Contact Email" required />
                      <input type="tel" placeholder="Contact Phone Number" required />
                      <div className="file-upload-container">
                        <label className="file-upload-label">
                          <span>{fileName || 'Upload ISO Certificate / Proof'}</span>
                          <input 
                            type="file" 
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => setFileName(e.target.files[0] ? e.target.files[0].name : '')} 
                            required 
                          />
                        </label>
                      </div>
                    </>
                  )}

                  {/* Individual Category specific fields */}
                  {activeType === 'individuals' && (
                    <>
                      <input type="text" placeholder="Full Name" required />
                      <input type="tel" placeholder="Phone Number" required />
                      
                      <div className="form-group">
                        <label className="input-field-label">Select Your Category</label>
                        <select 
                          value={individualCategory} 
                          onChange={(e) => setIndividualCategory(e.target.value)} 
                          className="form-select"
                          required
                        >
                          <option value="auditor">Trained Auditors</option>
                          <option value="consultant">Registered Consultants</option>
                        </select>
                      </div>

                      <div className="file-upload-container">
                        <label className="input-field-label" style={{ display: 'block', textAlign: 'left', marginBottom: '0.25rem' }}>Document Upload</label>
                        <p className="file-upload-subtext">Please upload a copy of your ISO-related document (PDF, DOC, DOCX, JPG, PNG, JPEG — Maximum size: 5MB).</p>
                        <label className="file-upload-label">
                          <span>{fileName || 'Upload ISO-related document'}</span>
                          <input 
                            type="file" 
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => setFileName(e.target.files[0] ? e.target.files[0].name : '')} 
                            required 
                          />
                        </label>
                      </div>

                      <div className="notice-box">
                        <strong>Important Notice:</strong> Ensure that the document provided corresponds correctly with the category selected above. Submitting a document that does not match your chosen category may delay or invalidate your verification.
                      </div>
                    </>
                  )}

                  {/* Graduates Category specific fields */}
                  {activeType === 'graduates' && (
                    <>
                      <input type="text" placeholder="Full Name" required />
                      <input type="tel" placeholder="Phone Number" required />
                      
                      <input type="text" placeholder="Name of Institution" required />
                      <input type="text" placeholder="Degree Obtained" required />
                      <input type="text" placeholder="Course of Study" required />
                      <input type="text" placeholder="Year of Graduation (e.g. 2022)" required />
                      <input type="text" placeholder="Duration of Study (e.g. 4 years)" required />

                      <div className="file-upload-container">
                        <label className="input-field-label" style={{ display: 'block', textAlign: 'left', marginBottom: '0.25rem' }}>Upload Certificate</label>
                        <label className="file-upload-label">
                          <span>{fileName || 'No file chosen'}</span>
                          <input 
                            type="file" 
                            accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                            onChange={(e) => setFileName(e.target.files[0] ? e.target.files[0].name : '')} 
                            required 
                          />
                        </label>
                      </div>
                    </>
                  )}

                  {/* Students Category specific fields */}
                  {activeType === 'students' && (
                    <>
                      <input type="text" placeholder="Full Name" required />
                      <input type="tel" placeholder="Phone Number" required />
                      
                      <input type="text" placeholder="Name of School" required />
                      <input type="text" placeholder="Course of Study" required />

                      <div className="file-upload-container">
                        <label className="input-field-label" style={{ display: 'block', textAlign: 'left', marginBottom: '0.25rem' }}>Upload Student ID Verification</label>
                        <label className="file-upload-label">
                          <span>{fileName || 'No file chosen'}</span>
                          <input 
                            type="file" 
                            accept=".pdf,.png,.jpg,.jpeg"
                            onChange={(e) => setFileName(e.target.files[0] ? e.target.files[0].name : '')} 
                            required 
                          />
                        </label>
                      </div>
                    </>
                  )}

                  {/* Acceptance Checkbox */}
                  <div className="form-checkbox-row">
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I accept the Terms & Conditions and Privacy Policy</label>
                  </div>

                  {/* Optional Newsletter Checkbox */}
                  <div className="form-checkbox-row">
                    <input type="checkbox" id="newsletter" />
                    <label htmlFor="newsletter">Subscribe to newsletter & updates</label>
                  </div>

                  <button type="submit" className="btn btn-primary w-full" style={{ marginTop: '0.5rem' }}>
                    Upload & Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
