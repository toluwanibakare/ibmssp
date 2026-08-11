import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Legal.css';

export default function Terms() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1>Terms &amp; Conditions</h1>
          <p>Please read carefully — continued use of our site signifies your agreement</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Terms &amp; Conditions</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="legal-content-wrap">

          <aside className="legal-toc">
            <h4>Contents</h4>
            <ul>
              <li><a href="#introduction">Introduction</a></li>
              <li><a href="#purchasing">Purchasing Goods &amp; Services</a></li>
              <li><a href="#price">Price</a></li>
              <li><a href="#payment">Payment</a></li>
            </ul>
            <div className="legal-toc-updated">
              <span>Last Updated</span>
              <strong>7th February, 2024</strong>
            </div>
          </aside>

          <div className="legal-body">
            <div className="legal-intro-banner">
              <strong>Institute of Business Management Systems Standards Practitioners</strong>
              <p>The Website is offered to you conditional on your agreement with these terms and conditions (the "Terms and Conditions") and your continued use of it signifies agreement with them in their entirety.</p>
              <p>Please read this carefully as it affects your legal rights and sets out these Terms and Conditions on which we, The Institute of Business Management Systems Standards Practitioners ("us", "we", "IBMSSP"), will allow you to use this website and the information contained within it.</p>
              <p>All goods and services sold by IBMSSP, (which also includes those provided free of charge to customers from time to time), whether purchased online through the Website or offline by telephone or paper order, shall be and are subject to these Terms and Conditions and any reference to purchasing goods and services on the Website shall refer in equal measure to any such goods or services purchased offline.</p>
            </div>

            <div id="purchasing" className="legal-section">
              <h2>Purchasing Goods and Services</h2>
              <p>We offer the opportunity to purchase certain goods and services on the Website and Offline, including applications, registrations and payment for examinations, assessments, study materials and courses. "Offline" refers to brochures and other printed publications produced by the IBMSSP from time to time.</p>
            </div>

            <div id="price" className="legal-section">
              <h2>Price</h2>
              <p>The Price means the price for the goods or services, inclusive of VAT. Prices quoted on our Website and Offline are in naira. Goods and services must be paid in naira. The IBMSSP will not accept liability for any local taxes or charges, including currency conversion charges applied by your bank or payment processor.</p>
              <p>Where relevant, standard delivery charges will be applied at the checkout (for web purchases) and are detailed on the relevant application form (for Offline purchases). Expedited deliveries may incur additional postage charges which will be communicated and agreed in advance between us.</p>
            </div>

            <div id="payment" className="legal-section">
              <h2>Payment</h2>
              <p>When you offer to purchase any goods or services from us Offline, by telephone, by paper application form or on the Website by clicking the "Submit" button, you agree to these Terms and Conditions. By completing and submitting the paper application form / electronic order form or ordering by telephone, you are making an offer to purchase goods or services which, if accepted by us, will result in a binding contract.</p>
              <p>We reserve the right to refuse your order, in which case you will be notified accordingly. The Price, in naira, may be paid by credit or charge/debit card (some paper orders and overseas orders are paid by cheque or bankers draft). The Price will be deducted from your card if and when we have accepted your order. If your order is not accepted by us we will inform you.</p>
            </div>

            <div className="legal-footer-note">
              <p>This Terms &amp; Conditions was last updated on <strong>7th February, 2024</strong>.</p>
              <p>For questions, contact us at: <a href="mailto:info@ibmssp.org.ng">info@ibmssp.org.ng</a></p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
