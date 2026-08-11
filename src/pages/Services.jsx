import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ThumbsUp, Phone, Mail } from 'lucide-react';
import './Services.css';

const servicesList = [
  {
    id: 'consultation-advisory',
    title: 'Consultation & Advisory on ISO Implementation & Certification',
    desc: 'Professional Guidance on ISO Based Performance Improvements and Sustained Success.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    details: [
      "We provide professional advice and guidance on ISO based business management performance evaluation for improvements and sustained success.",
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
    desc: 'Business Performance Improvement Assessment Training',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
    details: [
      "We provide training that helps organizations learn how to use of our iconic ISO Based Business Performance Improvement Assessment (BPIA) Model for managing and improving business performance; a diagnostic tools and unique enterprise performance data, that enables organizations analyze their businesses in order to better prepare for their improvement, change and transformation challenges.",
      "The technology that is developed based on the requirements of the international standard organization on management systems and evaluation tools for continual improvement, provides unique insights into your organization to help you master changes, improve and manage business growth and success."
    ],
    keyAreasIntro: "The training courses include:",
    keyAreasTitle: "Courses",
    keyAreas: [
      "Foundation training on ISO Based Business Performance Improvement Assessment (BPIA) Model",
      "Introduction to Performance Improvement Training",
      "Transforming Your Organization with Global Standards",
      "Organizational Change Leadership Training"
    ],
    benefitsIntro: "The participants will be able to:",
    benefits: [
      "Analyze the ecosystem of an organization to provide context for an assessment.",
      "Identify the strategic priorities for an organization.",
      "Prepare value-adding feedback for an organization.",
      "Identify relevant good practices.",
      "Explain how the ISO Based Business Performance Model could benefit their organization and how it could be used to overcome current and future challenges.",
      "Explain how the ISO Based Business Performance Model is structured and how the different elements apply to their organization.",
      "Apply the diagnostic and assessment tool, to identify strengths and areas for improvement.",
      "Conduct a high-level health check of their organization.",
      "The ISO Based Business Performance Model help improve the organization, to achieve its business goals and purpose."
    ]
  },
  {
    id: 'recognition',
    title: 'Recognition',
    desc: 'Recognition certificate that matches the maturity level achieved.',
    image: 'https://images.unsplash.com/photo-1578269174936-2709b5a5e06e?auto=format&fit=crop&w=600&q=80',
    details: [
      "The Institute Recognition Scheme is designed for any organization, regardless of size, sector or location. We can even help you to find the most suitable level of recognition.",
      "It’s an award system to demonstrates stakeholders’ continuous improvement to global standards. The recognition shows how well organization is performing against a globally proven management framework. The process is carried out by independent IBMSSP trained Assessors. They review performance using the ISO Based Business Performance Model and offer tailored feedback throughout the process. Along with their own expertise running organizations all over the world.",
      "It’s a complete management review of your organization, using the Institute ISO Based Business Performance Improvement Assessment (BPIA) Model. It reviews your overall performance against your objectives and challenges."
    ],
    benefitsIntro: "Your organizations can derive significant value by:",
    benefits: [
      "Gaining international visibility by being recognized against the ISO Based Business Performance Improvement Assessment (BPIA) Model demonstrating outstanding organizational performance.",
      "Acquiring highly valued feedback that identifies and helps understand the gaps and possible solutions available, empowering progress and significant improvement in an organization’s performance.",
      "Fully understanding the ISO Based Business Performance Improvement Assessment (BPIA) Model philosophy and the range of intelligence tools we offer, including applying them for effective results.",
      "Motivating your people. The ambition and thrill to succeed inspires, motivates, and energizes your employees at all levels of the organization in a positive and constructive atmosphere."
    ]
  },
  {
    id: 'knowledge-base',
    title: 'Knowledge Base',
    desc: 'Access to ISO Based Information and Data.',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    details: [
      "We provide access to an extensive repository of ISO-based information, compliance guidelines, templates, and self-assessment benchmarks.",
      "This system serves as a central registry to standardisation documentation, enabling organizations to research systems standards requirements and study global best practices efficiently."
    ],
    keyAreasIntro: "Key reference documents and resource files in our database:",
    keyAreas: [
      "ISO standards implementation logs and templates.",
      "Self-assessment toolkits and metrics guides.",
      "Archived auditor reports and case studies."
    ],
    benefitsIntro: "Accessing the Knowledge Base allows your team to:",
    benefits: [
      "Accelerate standards documentation design hours.",
      "Reference verified tools and templates approved by IBMSSP auditors.",
      "Remain up to date on global policy revisions."
    ]
  },
  {
    id: 'advocacy',
    title: 'Advocacy',
    desc: 'Representation on related policies through a collaborative approach.',
    image: 'https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=600&q=80',
    details: [
      "We adopt a multifaceted approach to inform, leverage, voice, organize, and assess all related issues on business management systems with respects to the international standard requirements. We engage with stakeholders, collaborate with networks and coalitions, raise awareness about crucial issues, and drive meaningful change for business success through standardization.",
      "We aim to bring change, whether it's through public awareness, offering support, contracting advocacy services, or influencing policies on business sustainability through standardization. This will help stakeholders to express their views, thoughts, and concerns.",
      "We shall develop and utilize evaluations to inform future activities and measure success.",
      "This shall be stakeholders needs assessments to understand the most pressing issues and gathering feedback from participants and stakeholders to identify areas for improvement."
    ]
  },
  {
    id: 'help-desk',
    title: 'Business Help Desk Services',
    desc: 'Timely guidance on management systems implementation and certification.',
    image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80',
    details: [
      "We provide on time guidance and support to stakeholders and other end-users on business management systems implementation and certification issues, troubleshooting problems, and answering questions, including:"
    ],
    keyAreasIntro: "Our help desk services include:",
    keyAreasTitle: "Support Details",
    keyAreas: [
      "Answering stakeholders’ questions",
      "Resolving stakeholders’ issues",
      "Troubleshooting problems",
      "Providing stakeholders support via telephone, email, or chat",
      "Generating reports on stakeholders’ service activity",
      "Managing stakeholders’ databases"
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
                <h3>{activeSvc.keyAreasTitle || "Key Areas"}</h3>
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
