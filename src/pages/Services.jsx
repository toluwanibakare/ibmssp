import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ThumbsUp } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    title: 'Consultation & Advisory on ISO Implementation & Certification',
    desc: 'Professional Guidance on ISO Based Performance Improvements and Sustained Success.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    link: '/contact'
  },
  {
    title: 'Capacity Building (Learning & Development)',
    desc: 'Business Performance Improvement Assessment Training.',
    image: 'https://images.unsplash.com/photo-1531535934027-667f6db87590?auto=format&fit=crop&w=600&q=80',
    link: '/contact'
  },
  {
    title: 'Recognition',
    desc: 'Recognition certificate that matches the maturity level achieved.',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b5a5e06e?auto=format&fit=crop&w=600&q=80',
    link: '/contact'
  },
  {
    title: 'Knowledge Base',
    desc: 'Access to ISO Based Information and Data.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    link: '/contact'
  },
  {
    title: 'Advocacy',
    desc: 'Representation on related policies through a collaborative approach.',
    image: 'https://images.unsplash.com/photo-1521791136368-1a851900d141?auto=format&fit=crop&w=600&q=80',
    link: '/contact'
  },
  {
    title: 'Business Help Desk Services',
    desc: 'Timely guidance on management systems implementation and certification.',
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80',
    link: '/contact'
  }
];

export default function Services() {
  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>We work with organizations to improve performance, priorities, and people</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Services</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="services-premium-grid">
          {servicesList.map((svc, index) => (
            <div key={index} className="service-premium-card">
              {/* Image Section */}
              <div 
                className="service-card-image" 
                style={{ backgroundImage: `url(${svc.image})` }}
              >
                {/* Floating ThumbsUp Sparkle Badge */}
                <div className="service-floating-icon">
                  <ThumbsUp size={18} color="#ffffff" style={{ transform: 'rotate(-5deg)' }} />
                </div>
              </div>

              {/* Text Section */}
              <div className="service-card-content">
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                
                {/* Centered Expandable Arrow Button */}
                <div className="service-button-wrapper">
                  <Link to={svc.link} className="service-expand-btn">
                    <span className="btn-read-more-text">Read More</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
