import React from 'react';
import './RegistrationCertificate.css';

export default function RegistrationCertificate({ memberData, certificateRef }) {
  if (!memberData) return null;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getCategoryTitle = (category) => {
    switch (category) {
      case 'individual': return 'Individual Member';
      case 'business': return 'Corporate Member';
      case 'student': return 'Student Member';
      case 'graduate': return 'Graduate Member';
      default: return 'Registered Member';
    }
  };

  return (
    <div className="certificate-wrapper-offscreen">
      <div className="certificate-container" ref={certificateRef}>
        <div className="certificate-border">
          <div className="certificate-inner">
            
            {/* Header */}
            <div className="certificate-header">
              <img src="/ibmssp-logo.png" alt="IBMSSP Logo" className="certificate-logo" />
              <div className="certificate-institute-name">
                Institute of Business Management System<br />
                Sustainability Standardization &amp; Practitioners
              </div>
            </div>

            {/* Title */}
            <div className="certificate-title-section">
              <h1 className="certificate-title">CERTIFICATE OF REGISTRATION</h1>
              <p className="certificate-subtitle">This is to certify that</p>
            </div>

            {/* Member Name */}
            <div className="certificate-name-section">
              <h2 className="certificate-name">
                {memberData.first_name} {memberData.last_name}
              </h2>
            </div>

            {/* Statement */}
            <div className="certificate-statement">
              <p>
                has satisfied all requirements and is officially recognized as a
              </p>
              <h3 className="certificate-category">{getCategoryTitle(memberData.category)}</h3>
              <p>of the Institute with all the rights, privileges, and responsibilities thereto appertaining.</p>
            </div>

            {/* Meta details */}
            <div className="certificate-meta">
              <div className="meta-item">
                <span className="meta-label">Membership ID:</span>
                <span className="meta-value">{memberData.public_id || 'Pending'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Date of Issue:</span>
                <span className="meta-value">{today}</span>
              </div>
            </div>

            {/* Footer Signatures */}
            <div className="certificate-footer">
              <div className="certificate-seal">
                <div className="seal-inner">
                  <span>VERIFIED</span>
                  <small>IBMSSP</small>
                </div>
              </div>

              <div className="certificate-signature">
                <div className="signature-line"></div>
                <p className="signature-name">Olufemi Kolawole</p>
                <p className="signature-title">President &amp; Chairman of Council</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
