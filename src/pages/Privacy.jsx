import React from 'react';

export default function Privacy() {
  return (
    <div className="privacy-page">
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How we handle your application records and personal credentials</p>
        </div>
      </section>
      <section className="section-padding container">
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
          <h2>1. Collection of Information</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We collect names, emails, phone numbers, CV attachments, and competence metrics purely for membership registration and facilitator assessment programs.
          </p>
          <h2>2. Sharing of Information</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            We do not sell or rent user details to third-party marketing companies. Data is kept encrypted on secure server locations.
          </p>
          <h2>3. Cookies</h2>
          <p>
            We use essential cookies to maintain user session states on our membership account screens.
          </p>
        </div>
      </section>
    </div>
  );
}
