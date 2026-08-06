import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './Membership.css';

const tiers = {
  business: {
    title: 'Business Organizations',
    subtitle: 'For Corporate Members driving ISO implementation and business stability.',
    desc: 'Connecting organizations with structured self-assessment tooling, resources, compliance auditing trackers, and certification support networks.',
    bullets: [
      'Access to MSAT (Management Systems Assessment Tool) benchmarking dashboards',
      'Specialized ISO implementation support frameworks',
      'Employee capacity building workshops and webinars',
      'Corporate visibility in our member network directory',
      'Corporate affairs compliance checks and advice'
    ],
    price: 'Contact for Quote'
  },
  individuals: {
    title: 'Individual Private Membership',
    subtitle: 'For professional practitioners and corporate standards consultants.',
    desc: 'Enable career growth, build connections with corporate buyers, share standards-related insights, and access top-tier advisory networks.',
    bullets: [
      'Access to standard knowledge bases and research libraries',
      'Networking with industrial executives and standards leaders',
      'Eligibility to join facilitation panels',
      'Discounted access to certified professional courses',
      'Individual profile features on our members database'
    ],
    price: '₦50,000 / Year'
  },
  graduates: {
    title: 'Graduates',
    subtitle: 'For post-university professionals stepping into compliance and management standards careers.',
    desc: 'Accelerate your career in standards auditing and management systems. Gain mentoring and essential foundation credentials.',
    bullets: [
      'Graduate internship tracking and mentorship match matching',
      'Access to industry compliance webinars',
      'Essential systems standards study guides',
      'Professional standards peer networks',
      'Discounted access to foundation workshops'
    ],
    price: '₦20,000 / Year'
  },
  students: {
    title: 'Students',
    subtitle: 'For aspiring students preparing for careers in standards and management systems.',
    desc: 'Learn the fundamentals of quality control, ISO systems, safety protocols, and auditing directly from professional mentors.',
    bullets: [
      'Student chapter resources and materials',
      'Access to student-only webinars and QA panels',
      'Career planning guidance in standardization and compliance',
      'Participation in research and audit review sessions',
      'Free or highly discounted access to introductory webinars'
    ],
    price: '₦5,000 / Year'
  }
};

export default function Membership() {
  const { type } = useParams();
  const activeType = type && tiers[type] ? type : 'business';
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
                <h3>Quick Application</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully!'); }}>
                  <input type="text" placeholder="Full Name / Organization" required />
                  <input type="email" placeholder="Email Address" required />
                  <input type="tel" placeholder="Phone Number" required />
                  <button type="submit" className="btn btn-primary w-full">Apply Now</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
