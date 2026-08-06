import React from 'react';
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
    name: 'Femi Kolawole',
    role: 'Chief Executive Officer',
    image: femiKolawoleImg
  },
  {
    name: 'Sunday Adegboyega',
    role: 'Chairman / Board Director',
    image: sundayAdegboyegaImg
  },
  {
    name: 'Babatunde Oduniyi',
    role: 'Board Director',
    image: babatundeOduniyiImg
  },
  {
    name: 'David Musa',
    role: 'Board Member',
    image: davidMusaImg
  },
  {
    name: 'Babatunde Adedokun',
    role: 'Board Member',
    image: babatundeAdedokunImg
  },
  {
    name: 'Faith Ezeugoh',
    role: 'Board Member',
    image: faithEzeugohImg
  },
  {
    name: 'Olayinka Alabi',
    role: 'Board Member',
    image: olayinkaAlabiImg
  }
];

export default function Team() {
  return (
    <div className="team-page">
      <section className="page-hero">
        <div className="container">
          <h1>Our Board of Directors</h1>
          <p>The strategic leadership driving standardizations and compliance</p>
        </div>
      </section>

      <section className="section-padding container">
        <div className="section-header text-center">
          <span className="section-tag">Leadership</span>
          <h2>Board of Directors</h2>
          <p className="section-subtitle">
            Our governing board provides oversight, guidelines compliance monitoring, and strategic direction to facilitate growth.
          </p>
        </div>

        <div className="grid-3 team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <div 
                className="member-image-placeholder" 
                style={{ backgroundImage: `url(${member.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
              />
              <div className="member-info">
                <span>{member.role}</span>
                <h3>{member.name}</h3>
                <p>Dedicated to fostering business stability and standardizations implementation across enterprises.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
