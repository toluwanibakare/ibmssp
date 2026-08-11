import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ThumbsUp, Phone, Mail, CheckSquare } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    id: 'consultation-advisory',
    title: 'Consultation & Advisory on ISO Implementation & Certification',
    desc: 'Professional Guidance on ISO Based Performance Improvements and Sustained Success.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    details: [
      "We provide professional advice and guidance on ISO based business management systems performance evaluation for improvements and sustained success.",
      "Through our evidence-based assessments, technology platform, data, and analytics, we help organizations improve and manage change through measurement, tracking and improving performance in their key business areas and processes.",
      "We help organizations build up internal capability to demonstrate how well the organization is performing towards growth and sustained success using an advanced technology that is based on global practices on management systems performance measures and parameters."
    ],
    keyAreasIntro: "The service involves an assessment by external international team of experts from wide variety of backgrounds with feedback that provide:",
    keyAreas: [
      "Data-driven insights backed up by the organizational experts, to fit your priorities, your purpose, and your people.",
      "Detailed analysis and gap identification at strategic, operational & performance level.",
      "Improvement baseline analysis and road map."
    ],
    benefitsIntro: 'The output of the assessment process is a "Performance Assessment Report" which gives a detailed analysis of where your organization is currently at strategic, operational and performance levels. This will also:',
    benefits: [
      "Enable your organization to compare its performance on a global level.",
      "Help your organization to focus on what really matters.",
      "Strengthen alignment & tracking.",
      "Enable your organization to gain expert insights to tackle its future challenges."
    ]
  },
  {
    id: 'capacity-building',
    title: 'Capacity Building (Learning & Development)',
    desc: 'Business Performance Improvement Assessment Training.',
    image: 'https://images.unsplash.com/photo-1531535934027-667f6db87590?auto=format&fit=crop&w=600&q=80',
    details: [
      "We provide specialized systems standards training programs, self-assessment training, and capacity-building models.",
      "We help organizations develop inside expertise to conduct internal compliance checks and prepare for international certification reviews.",
      "Through our customized development program, we target specific gaps in operational standards controls to accelerate employee performance and standardisation compliance."
    ],
    keyAreasIntro: "Our training programs target core systems compliance:",
    keyAreas: [
      "Structured training modules for managers and team leads.",
      "Practical interactive case studies and implementation logs.",
      "Auditor alignment workshops."
    ],
    benefitsIntro: "Enrolling in our capacity building programs will:",
    benefits: [
      "Build direct inside auditing capabilities.",
      "Empower staff to track and measure performance.",
      "Reduce operational waste and increase compliance."
    ]
  },
  {
    id: 'recognition',
    title: 'Recognition',
    desc: 'Recognition certificate that matches the maturity level achieved.',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b5a5e06e?auto=format&fit=crop&w=600&q=80',
    details: [
      "Get audited and recognized for your systems compliance maturity levels with official certificates.",
      "We benchmark and assess standardizations maturity ratings logs to verify business stability status."
    ],
    keyAreasIntro: "Our evaluation frameworks focus on maturity markers:",
    keyAreas: [
      "Maturity rating logs and score sheets.",
      "Verification of compliance markers."
    ],
    benefitsIntro: "Achieving official recognition helps to:",
    benefits: [
      "Demonstrate conformity to global partners.",
      "Gain corporate trust and buyer preference.",
      "Motivate inside teams towards continuous improvement."
    ]
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    desc: 'Access to ISO Based Information and Data.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    details: [
      "Our library features rich standards research, case databases, self-assessment guidelines, and audit logs."
    ],
    keyAreasIntro: "The library includes documentation tools:",
    keyAreas: [
      "Implementation guide blueprints.",
      "Self-assessment templates.",
      "Compliance audit checklist sheets."
    ],
    benefitsIntro: "Leveraging our database enables you to:",
    benefits: [
      "Reduce documentation design hours.",
      "Access expert templates instantly.",
      "Stay updated on changes to systems standards."
    ]
  },
  {
    id: 'advocacy',
    title: 'Advocacy',
    desc: 'Representation on related policies through a collaborative approach.',
    image: 'https://images.unsplash.com/photo-1521791136368-1a851900d141?auto=format&fit=crop&w=600&q=80',
    details: [
      "We advocate on standardization policies to protect business interests and shape global compliance updates."
    ],
    keyAreasIntro: "Our advocacy networks drive policy updates:",
    keyAreas: [
      "Representation in standards development panels.",
      "Joint regulatory policy workshops.",
      "Enterprise representation logs."
    ],
    benefitsIntro: "Participating in our advocacy forums will:",
    benefits: [
      "Give your business a voice on standards committees.",
      "Provide early insights on upcoming policy updates.",
      "Foster collaborative synergy across sectors."
    ]
  },
  {
    id: 'help-desk',
    title: 'Business Help Desk Services',
    desc: 'Timely guidance on management systems implementation and certification.',
    image: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?auto=format&fit=crop&w=600&q=80',
    details: [
      "Access real-time, expert help desk support to troubleshoot compliance gaps and manage certificate applications."
    ],
    keyAreasIntro: "Our support agents troubleshoot critical bottlenecks:",
    keyAreas: [
      "Instant messaging and query support channels.",
      "ISO application submission checkers.",
      "Audit readiness diagnostic logs."
    ],
    benefitsIntro: "Subscribing to our help desk support enables you to:",
    benefits: [
      "Get instant answers from certified auditors.",
      "Speed up your compliance tracking and approvals.",
      "Maintain audit readiness round-the-clock."
    ]
  }
];

export default function Services() {
  const { type } = useParams();

  // If no specific service is selected, show the overview grid dashboard
  if (!type) {
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
                <div 
                  className="service-card-image" 
                  style={{ backgroundImage: `url(${svc.image})` }}
                >
                  <div className="service-floating-icon">
                    <ThumbsUp size={18} color="#ffffff" style={{ transform: 'rotate(-5deg)' }} />
                  </div>
                </div>

                <div className="service-card-content">
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                  
                  <div className="service-button-wrapper">
                    <Link to={`/services/${svc.id}`} className="service-expand-btn">
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

  // Find active service details
  const activeSvc = servicesList.find((s) => s.id === type) || servicesList[0];

  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', maxWidth: '850px', margin: '0 auto 0.5rem auto', lineHeight: '1.25' }}>
            {activeSvc.title}
          </h1>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> 
            <Link to="/services">Services</Link> <ChevronRight size={14} className="breadcrumb-separator" /> 
            <span>{activeSvc.title}</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="services-detail-layout">
          {/* Left Column: Sidebar */}
          <aside className="services-sidebar">
            <div className="sidebar-nav-container">
              <span className="sidebar-title-line">Our Services</span>
              <ul className="sidebar-nav-list">
                {servicesList.map((s) => (
                  <li key={s.id}>
                    <Link 
                      to={`/services/${s.id}`} 
                      className={`sidebar-nav-link ${s.id === activeSvc.id ? 'active' : ''}`}
                    >
                      <span>{s.title}</span>
                      <ChevronRight size={16} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Have Questions Widget */}
            <div className="have-questions-widget">
              <h3>Have Questions?</h3>
              <p>Reach out to us using the details below.</p>
              
              <div className="widget-icon-graphic">
                <span className="question-mark-symbol">?</span>
              </div>

              <div className="widget-contact-info">
                <a href="tel:+23408035706827" className="contact-link">
                  <Phone size={14} />
                  <span>(+234) 08035706827</span>
                </a>
                <a href="mailto:admin@ibmssp.org" className="contact-link">
                  <Mail size={14} />
                  <span>admin@ibmssp.org</span>
                </a>
              </div>

              <div className="widget-btn-wrapper">
                <Link to="/contact" className="btn btn-primary widget-contact-btn">
                  Contact Us
                </Link>
              </div>
            </div>
          </aside>

          {/* Right Column: Detailed content */}
          <article className="services-detail-content">
            <span className="detail-highlight-subtitle">{activeSvc.desc}</span>
            <h2 className="detail-main-title">{activeSvc.title}</h2>
            
            <div className="detail-paragraphs">
              {activeSvc.details.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Key Areas Section */}
            {activeSvc.keyAreas && (
              <div className="detail-section">
                <h3>Key Areas</h3>
                <p>{activeSvc.keyAreasIntro}</p>
                <ul className="detail-checklist">
                  {activeSvc.keyAreas.map((item, idx) => (
                    <li key={idx}>
                      <div className="checklist-square">
                        <div className="checklist-inner-square"></div>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits Section */}
            {activeSvc.benefits && (
              <div className="detail-section" style={{ marginTop: '2.5rem' }}>
                <h3>Benefits</h3>
                <p>{activeSvc.benefitsIntro}</p>
                <ul className="detail-checklist">
                  {activeSvc.benefits.map((item, idx) => (
                    <li key={idx}>
                      <div className="checklist-square">
                        <div className="checklist-inner-square"></div>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </div>
      </section>
    </div>
  );
}
