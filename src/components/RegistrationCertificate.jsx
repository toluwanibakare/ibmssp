import React, { useState, useEffect, useRef } from 'react';
import './RegistrationCertificate.css';

export default function RegistrationCertificate({ memberData, certificateRef }) {
  if (!memberData) return null;

  // Ensure full name is cleanly formatted
  const fullName = `${memberData.first_name || ''} ${memberData.last_name || ''}`.trim();
  const memberId = memberData.public_id || memberData.member_id || 'Pending ID';

  return (
    <div className="certificate-wrapper-offscreen">
      <div className="certificate-container-img" ref={certificateRef}>
        {/* Background Template */}
        <img 
          src="/IBMSSP Membership Certificate.png" 
          alt="Certificate Template" 
          className="certificate-bg-img"
          crossOrigin="anonymous" 
        />
        
        {/* Name Overlay */}
        <div className="certificate-name-overlay">
          <TextFit text={fullName} />
        </div>

        {/* ID Overlay (under the gold seal) */}
        <div className="certificate-id-overlay">
          ID: {memberId}
        </div>
      </div>
    </div>
  );
}

/**
 * A helper component that dynamically shrinks text font-size
 * so it perfectly fits within its bounding container without wrapping.
 */
function TextFit({ text }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textNode = textRef.current;
    if (!container || !textNode) return;

    // Reset to a very large font size for high-res output
    let currentSize = 120; 
    textNode.style.fontSize = `${currentSize}px`;

    // Loop and shrink the font size until the text width fits the container width
    while (textNode.scrollWidth > container.clientWidth && currentSize > 20) {
      currentSize -= 2;
      textNode.style.fontSize = `${currentSize}px`;
    }
  }, [text]);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <span ref={textRef} style={{ whiteSpace: 'nowrap' }}>
        {text}
      </span>
    </div>
  );
}
