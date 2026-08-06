import React from 'react';
import './Services.css';

const services = [
  {
    title: 'Empowerment Hub',
    desc: 'Fostering growth through capacity building, knowledge sharing, business support, and specialized ISO workshops.',
    details: 'Our workshops target specific operational controls under international standardization systems, providing actionable implementation paths for small and medium scale enterprises.'
  },
  {
    title: 'Advisory Services',
    desc: 'Unlock business excellence, ensuring growth, resilience, and global best practices.',
    details: 'We support managers in resolving communication blocks, resolving employee alignment bottlenecks, setting up proper documentation processes, and managing audit readiness.'
  },
  {
    title: 'Professionalism & Advocacy',
    desc: 'Championing continuous excellence in global business standards.',
    details: 'We represent and advocate on ISO related business management system policies to help SMEs integrate sustainable, long-term best practices within their current operational systems.'
  }
];

export default function Services() {
  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>We work with organizations to improve performance, priorities, and people</p>
        </div>
      </section>

      <section className="section-padding container">
        <div className="grid-3 services-detail-grid">
          {services.map((svc, index) => (
            <div key={index} className="service-detail-card">
              <h3>{svc.title}</h3>
              <p className="svc-desc">{svc.desc}</p>
              <p className="svc-details">{svc.details}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
