import React from 'react';

export default function Terms() {
  return (
    <div className="terms-page">
      <section className="page-hero">
        <div className="container">
          <h1>Terms & Conditions</h1>
          <p>Read terms for using the IBMSSP network and resources</p>
        </div>
      </section>
      <section className="section-padding container">
        <div style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-muted)' }}>
          <h2>1. Introduction</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to the Institute of Business Management Systems Standards Practitioners (IBMSSP). These terms govern your use of our site and services.
          </p>
          <h2>2. Membership Rules</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Members are expected to adhere to professional standards, verify credentials honestly during registration, and protect their account access tokens.
          </p>
          <h2>3. Intellectual Property</h2>
          <p>
            All training resources, standard benchmarking structures, assessment questionnaire guides, and logos belong to IBMSSP.
          </p>
        </div>
      </section>
    </div>
  );
}
