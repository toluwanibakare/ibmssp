import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Share2, X } from 'lucide-react';
import './Team.css';

// Import board member images
import femiKolawoleImg from '../assets/femi-kolawole-1.jpg';
import sundayAdegboyegaImg from '../assets/sunday-adegboyega-1-1.jpg';
import babatundeOduniyiImg from '../assets/babatunde-oduniyi.jpg';
import davidMusaImg from '../assets/david-musa.jpg';
import babatundeAdedokunImg from '../assets/babatunde-adedokun.jpg';
import faithEzeugohImg from '../assets/faith-ezeugoh.jpg';
import olayinkaAlabiImg from '../assets/olayinka-alabi.jpg';

const teamMembers = [
  {
    name: 'Olufemi Kolawole',
    role: 'CHAIRMAN',
    image: femiKolawoleImg,
    bio: 'Profile bio details will be updated shortly.'
  },
  {
    name: 'Olayinka Alabi',
    role: 'VICE CHAIRMAN',
    image: olayinkaAlabiImg,
    bio: 'Profile bio details will be updated shortly.'
  },
  {
    name: 'Faith Ezeugoh',
    role: 'SECRETARY & PRO',
    image: faithEzeugohImg,
    bio: 'Profile bio details will be updated shortly.'
  },
  {
    name: 'Adegboyega Sunday',
    role: 'ASSISTANT SECRETARY',
    image: sundayAdegboyegaImg,
    bio: 'Profile bio details will be updated shortly.'
  },
  {
    name: 'David Musa',
    role: 'FINANCIAL SECRETARY',
    image: davidMusaImg,
    bio: 'Profile bio details will be updated shortly.'
  },
  {
    name: 'Babatunde Adedokun',
    role: 'TREASURER',
    image: babatundeAdedokunImg,
    bio: 'Profile bio details will be updated shortly.'
  },
  {
    name: 'Babatunde Oduniyi',
    role: 'WELFARE SECRETARY',
    image: babatundeOduniyiImg,
    bio: 'Profile bio details will be updated shortly.'
  }
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleShare = (e, memberName) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `${memberName} - IBMSSP Board Member`,
        text: `Meet ${memberName}, a member of the Board of Directors at IBMSSP.`,
        url: window.location.href,
      }).catch(err => console.log(err));
    } else {
      alert(`Sharing details for ${memberName}`);
    }
  };

  return (
    <div className="team-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Board of Directors</h1>
          <p>The strategic leadership driving standardizations and compliance</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Board of Directors</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
          <span className="section-tag-underlined">Dedicated Team Of</span>
          <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Professional Individuals</h2>
        </div>

        <div className="grid-3 team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card-premium">
              <div 
                className="member-premium-image" 
                style={{ backgroundImage: `url(${member.image})` }}
              >
                {/* Vertical Share Tag */}
                <div className="share-vertical-tag">
                  <span>SHARE</span>
                  <button className="share-circle-btn" onClick={(e) => handleShare(e, member.name)} aria-label="Share profile">
                    <Share2 size={12} />
                  </button>
                </div>

                {/* View Profile Hover Button Overlay */}
                <div className="member-hover-overlay">
                  <button className="view-profile-btn" onClick={() => setSelectedMember(member)}>
                    View Profile
                  </button>
                </div>
              </div>

              {/* Bottom Info Gradient Bar */}
              <div className="member-premium-info">
                <span className="member-premium-role">{member.role}</span>
                <h3 className="member-premium-name">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Profile Lightbox Modal */}
      {selectedMember && (
        <div className="profile-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className="profile-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMember(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            <div className="modal-body">
              <div className="modal-img-col">
                <img src={selectedMember.image} alt={selectedMember.name} />
              </div>
              <div className="modal-info-col">
                <span className="modal-role">{selectedMember.role}</span>
                <h2>{selectedMember.name}</h2>
                <div className="modal-divider"></div>
                <p className="modal-bio">{selectedMember.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
