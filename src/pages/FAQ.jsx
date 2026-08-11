import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqList = [
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
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="faq-page">
      <section className="page-hero">
        <div className="container">
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about our assessments, registration, and certifications</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>FAQ</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="faq-container-wide">
          <div className="faq-header-block">
            <span className="faq-subtag">GET ANSWERS</span>
            <h2>How can we help you today?</h2>
          </div>

          <div className="faq-list-accordion">
            {faqList.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className={`faq-item-card ${isOpen ? 'open' : ''}`}>
                  <button className="faq-question-btn" onClick={() => toggleFAQ(idx)}>
                    <div className="faq-question-left">
                      <HelpCircle size={18} className="faq-icon" />
                      <span>{faq.question}</span>
                    </div>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-block">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="faq-footer-callout">
            <p>Still have questions? Our support desk is standing by to assist you.</p>
            <Link to="/contact" className="btn btn-primary">Contact Support Desk</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
