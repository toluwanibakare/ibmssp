import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, X } from 'lucide-react';
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
    bio: [
      "A business professional on management system global standards, Femi Kolawole has a technical background as a Mechanical Engineer and a master’s degree holder in project management. His work experience for more than 20 years has been across various sectors including construction, oil and gas, banking, and he is currently in the conformity assessment sector on management systems standards.",
      "Prior to becoming a business management consultant, he worked as a senior lead auditor with Bureau Veritas Certification and other various national and international certification bodies.",
      "Femi Kolawole has been a business management system lead auditor and tutor for over a decade, having been trained by an international organization (Bureau Veritas) that provides conformity assessments services against global standards, where he has conducted over 900 system audits on quality, environmental, occupational health and Safety, information security, and food Safety, management system certification and surveillance audits in various Countries.",
      "As an IRCA lead auditor and a certified assessor by the American Society for Testing and Materials (ASTM). He has his education & professional certifications as below:"
    ],
    certifications: [
      "BSc in Mechanical Engineering",
      "MSc in Project Management",
      "IRCA Lead Auditor on Quality Management System (ISO 9001:2015)",
      "IRCA Lead Auditor on Environmental Management System (ISO 14001:2015)",
      "IRCA Lead Auditor on Health & Safety Management System (ISO 45001:2015)",
      "IRCA Lead Auditor on Info. Security Management System (ISO 27001:2013)",
      "ASTM Certified Property Condition Assessor, Atlanta Georgia, USA",
      "Supply Chain Auditor (SMETA and Social Accountability), France",
      "General Data Protection Regulation (GDPR) Certification",
      "Fire Risk Assessment Certification"
    ]
  },
  {
    name: 'Olayinka Alabi',
    role: 'VICE CHAIRMAN',
    image: olayinkaAlabiImg,
    bio: [
      "Olayinka is a certified NEBOSH tutor, trainer, auditor, and member of various professional bodies, including the Institute of Safety Professionals of Nigeria (ISPON), World Safety Organization (WSO), Technical Member of Institution of Occupational Safety and Health (IOSH), and Chartered Institute of Personnel Management (CIPM). She holds a Bachelor of Science (B.Sc.) degree in Geology and a Masters (M.Sc.) degree in Environmental & Petroleum Technology Management.",
      "With over 2 decades' experience in diverse sectors such as Engineering, Construction, Environmental, Manufacturing, and Oil & Gas Servicing Industries, she has held various roles such as strategic business development, management system auditing, human capital optimization, quality, health, safety, and environment management.",
      "Olayinka is the Lead Consultant at Safetywise Integrated Services Ltd. (www.safetywiseservices.com), an organization that specializes in Quality, Health, Safety, Environment, Human Capital, and Facility Management. She's also the QHSSE Manager of Makon Group, an EPICOM Company based in Lagos, Nigeria.",
      "Her expertise lies in implementing Integrated Management System procedures and standards across sectors, using the required soft and professional skill sets to optimize resources and achieve the overall organizational objective.",
      "Beyond her work, Olayinka is passionate about empowering individuals to make informed decisions that contribute to making the world a better place."
    ]
  },
  {
    name: 'Faith Ezeugoh',
    role: 'SECRETARY & PRO',
    image: faithEzeugohImg,
    bio: [
      "Faith is a seasoned Construction Manager with 19 years industry experience. She holds HND in Quantity Surveying, B.sc Building and M.sc Construction Management. Faith is a fellow of the Nigerian Institute of Quantity Surveyors (FNIQS). She is a registered Quantity Surveyor (RQS). She is a member of Project Management Institute (PMI). She is a certified Professional Project Manager (PMP). A certified Lead Auditor (ISO9001).",
      "She is an experienced Commercial Team Lead managing various construction projects across Nigeria. She started her career in as a Project QS in Logic Sciences Limited working on Extra Low Voltage Systems. She was Project Manager in H&O Automation Systems. At Arbico plc, she was the Contract Package Coordinator. Cost Administrator at Alpha Mead Facilities & Management Services Limited. General Manager (Commercial) at M&E Kaiser. She was Head, Commercial Reporting and Audits at Construction Kaiser Limited. She deployed and implemented the Quality Management System (ISO 9001:2015) for M&E Kaiser and Construction Kaiser Limited. She was Head, System Compliance for both organizations. She has trained and managed successfully a team of Internal Auditors from various professions. Faith is a staunch ambassador of transparency. She has also deployed and integrated the COSO framework for internal controls into her organization's business processes.",
      "She is a member of the Building Collapse Prevention Guild (BCPG), a non-profit organization, reinforcing standard practices in the construction industry, where she has served in various capacities to strengthen the guild."
    ]
  },
  {
    name: 'Adeyeye Sunday Adegboyega',
    role: 'ASSISTANT SECRETARY',
    image: sundayAdegboyegaImg,
    bio: [
      "Mr. Adeyeye Sunday ADEGBOYEGA is a passionate HSE Management professional with more than 20years experience in diverse areas of Oil & Gas operation ranging from Crude Oil and natural gas production and processing operations, facilities engineering and maintenance, and project management.",
      "Mr. Adegboyega or Ade (as fondly called by colleagues and peers) bagged HND in Chemical Laboratory Technology from Petroleum Training Institute, 1996 and later a PGD and master’s degree in environmental management technology, from Federal University of Technology, Owerri. He also holds an MBA Degree from LUTECH, Ogbomosho in 2002.",
      "Professionally, he obtained an International Diploma Certificate in Environmental Management from British Safety Council in 2007 and NEBOSH International General Certificate, also in 2007. Ade’ is a IRCA registered Auditor/Lead Auditor in ISO 9001:2015 – QMS, ISO 14001:2015 – EMS and ISO 45001:2018 – OHSMS.",
      "Mr. Adegboyega started his HSE career as an intern in the then Mobil Producing Nigeria in 1994 where he later served as a Corps member and eventually got retained on contract until 2000 when he left to join the service of CES Nigeria Limited as an HSE Coordinator where he helped to managed numbers of Environmental studies projects for MPNU, Total, etc. He joined the service of Titian Engineer & Constructors in 2003 as a PreCommissioning HSE Engineer on the multi-million dollars SPDC Forcardos Yokri Integrated Project (FYIP) – Onshore with the primary mandate to develop/implement appropriate plans and programs to ensure safety in design, construction safety, regulatory compliance, contractor management, etc necessary to achieve safe and workplace and operations.",
      "He joined the service of NNPC in 2005 as an Environmental Specialist. His selfless effort and wealth of experience was utilized in conjunction with the other HSE Team members the result of which is evident in the continual transformation and progress recorded over the years in the pursuit of goal zero (no-harm to people and no-harm to environment) objective in all NNPC operations and locations.",
      "Ade’ has within the few years in NNPC served selflessly in the various capacities within the HSE Skill pool during which he played a key role in the development, implementation, and monitoring of effective HSE Management System in NNPC. He rose through the rank to become HSE Manager of NNPC Gas Infrastructure Company in 2021. The position he still holds till date.",
      "Ade’ is a member/fellow of numbers of professional bodies, he is married and blessed with lovely children."
    ]
  },
  {
    name: 'Musa Sunday David',
    role: 'FINANCIAL SECRETARY',
    image: davidMusaImg,
    bio: [
      "Engr. Musa, Sunday David is a graduate of Mechanical Engineering from the Federal University of Technology Minna, Niger State, Nigeria. He is presently rounding up his MSc. Engineering Management study at University of Pretoria, Republic of South Africa.",
      "Over the past twenty years, David as he is largely known, has grown to become an accomplished quality, occupational health, safety and environment professional with vast experiences across varied industries like construction, consulting, engineering, manufacturing and the oil and gas.",
      "His career, which started in 2003, has seen him work with reputable companies like Sttrutt Engineering, Dunlop Nigeria PLC, Divcon Engineering limited, Hexon Environmental Consultants and Engineers Limited, Technip Group in Nigeria (comprising CresTech Engineering Limited, Technip Offshore Nigeria Limited and Neptune Maritime Nigeria Limited) and Falcon Corporation Limited. In all these organizations, his service and contribution were within the QHSE and Management sphere.",
      "David is currently in the employ of Prime Atlantic Cegelec Nigeria Limited (PACE, which is a Prime Atlantic Group and Vinci Energies Oil & Gas Group company). He also serves as the Group QHSE Manager for the Prime Atlantic Group (which has seven business units including PACE). He still holds these positions.",
      "David is a full member of the Institute of Safety Professionals of Nigeria (ISPON), a graduate member of Institute of Occupational Safety and Health (IOSH), a member of Nigeria Institute of Safety Engineers (NiSafetyE) and International Safety Quality Environment Management Association. He is also a COREN registered engineer, a member of Nigeria Society of Engineers and Nigeria Institute of Mechanical Engineers.",
      "His hobbies include Reading; writing; learning, listening to music; listening to news; training; swimming; chess; photography and languages (he speaks and writes English, Nupe, Yoruba, Hausa and a little French).",
      "He is married to a lovely wife and together they are blessed with three children."
    ]
  },
  {
    name: 'Adedokun Babatunde',
    role: 'TREASURER',
    image: babatundeAdedokunImg,
    bio: [
      "Babatunde holds a Bachelor of Technology in Mechanical Engineering from the University of South Africa, Pretoria. He is a certified HSE Professional with over 15 years of experience. He has worked in various capacities at different multinationals such as Frieslandcampina WAMCO Nigeria PLC, Nestle Nigeria PLC, Boulos Enterprises Limited, and Nigeria Machine Tools, especially in engineering and HSE fields. He has certification in NEBOSH IGC, NEBOSH Environmental Management, OHSAS 18001:2007 lead auditor, QMS ISO 9001:2015 lead auditor, EMS ISO 14001: 2015 lead auditor and OH&S ISO 45001:2018 lead Auditor.",
      "Over the years, ‘Tunde gained considerable experience in multinational companies managing Health, Safety and Environment (HSE) across many ISO certified manufacturing and non manufacturing sites, at Corporate and Sub Saharan Africa levels.",
      "He is a trained lead HSE Auditor with many years of international audit experience. He is a certified Organizational Behaviour Management Super Trainer. He has trained over 300 managers and executive management in Behavioral Safety and implemented leadership Personal Safety Program for the functional head of departments.",
      "He is the current Zonal chairman of Ogba/Oregun HSE committee of the Manufacturer Association of Nigeria (MAN) and also a member of the Institute of Safety Professionals of Nigeria (ISPON).",
      "He was also trained in advanced fire and emergency preparedness in the Netherlands. He also holds a certification in Tripod Beta analysis, Organizational Behaviour Management(OBM) and ATEX in the Netherlands and he has anchored training for various Organizations on different HSE fields such as OBM, fire safety, incident reporting system, hazard identification, risk assessment & determination of control, environmental impact assessment, Contractor safety, defensive driving, environmental management to mention but a few.",
      "He has also helped a lot of organizations with ISO Standards gap analysis in preparation for ISO standards integrated management system (IMS) certifications.",
      "He has worked with Bureau Veritas as an observer for IMS ISO standards certification audits of various organizations such as Reliance Chemical Products Limited, Crestech Engineering Limited, Fortis Engineering Services Limited, G.O.S.L Nigeria Limited, Smartflow Technologies Limited etc.",
      "He has also anchored training for the following organizations: FrieslandCampina WAMCO Nigeria PLC, Fanmilk Nigeria Limited, Neimeth Nigeria PLC, Multichem Nigeria Limited, Tanamont Nigeria Limited, Nigerbev Nigeria Limited, Drum Cussac Nigeria Limited etc."
    ]
  },
  {
    name: 'Babatunde Oduniyi',
    role: 'WELFARE SECRETARY',
    image: babatundeOduniyiImg,
    bio: [
      "BABATUNDE ODUNIYI, is a graduate of Mechanical Engineering from Obafemi Awolowo University, Ile-Ife, Osun State, Nigeria and a Master of Business Administration from Nexford University USA. He is a trained lead assessor in Quality, Environmental and Occupational Health and Safety Management Systems. He has over two decades of experience working in the oil and gas manufacturing, gas distribution and fabrication industry.",
      "He is a Certified Manager of Quality/Organizational Excellence (CMQ/OE) from the American Society of Quality, and member of a number of international organizations that advance the practice of quality worldwide."
    ]
  }
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);



  const renderBio = (member) => {
    if (Array.isArray(member.bio)) {
      return (
        <div className="bio-rich-text">
          {member.bio.map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem', fontSize: '0.95rem', lineHeight: '1.65' }}>{paragraph}</p>
          ))}
          {member.certifications && (
            <div style={{ marginTop: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.75rem', color: 'var(--text-color)', fontSize: '0.98rem' }}>Education & Professional Certifications:</strong>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {member.certifications.map((cert, index) => (
                  <li key={index} style={{ fontSize: '0.9rem', color: 'var(--secondary-slate)' }}>{cert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    return <p style={{ fontSize: '0.95rem', lineHeight: '1.65' }}>{member.bio}</p>;
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

                {/* Normal overlay (Name & Role) at the bottom */}
                <div className="member-card-details-overlay">
                  <span className="member-role-overlay">{member.role}</span>
                  <h3 className="member-name-overlay">{member.name}</h3>
                </div>

                {/* View Profile Hover Button Overlay */}
                <div className="member-hover-overlay">
                  <button className="view-profile-btn" onClick={() => setSelectedMember(member)}>
                    View Profile
                  </button>
                </div>
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
                <div className="modal-bio-container">
                  {renderBio(selectedMember)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
