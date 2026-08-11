import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target, Star, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import './Home.css';

import heroImg1 from '../assets/hero_image1.png';

// Hero Slider Data
const heroSlides = [
  {
    tag: 'Advocacy',
    title: 'Multi-Stakeholder Engagement',
    desc: 'We promote broad and balanced engagement, ensuring diverse voices are heard through networking and collaboration.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1600&q=80'
  },
  {
    tag: 'Credibility',
    title: 'Ethical Practices',
    desc: 'We prioritize accountability and commitment to high standards and professional credibility within the industry.',
    image: 'https://images.unsplash.com/photo-1573166364524-d9dbfd8bbf83?auto=format&fit=crop&w=1600&q=80'
  },
  {
    tag: 'Business Stability',
    title: 'Empowering Organizations for Growth & Sustained Success',
    desc: 'We assist in monitoring the implementation of standards and hold organizations accountable for compliance.',
    image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=1600&q=80'
  }
];

// Testimonials Data
const testimonials = [
  {
    rating: 5,
    name: 'Mark Olufemi',
    role: 'Managing Director of Menotech',
    comment: 'The management systems implementation support from the institution met our expectations. The team was very knowledgeable and provided adequate guidance and needed support.'
  },
  {
    rating: 5,
    name: 'Angela Bello',
    role: 'Quality Director of Scat Media',
    comment: 'The professional institution provided exceptional support throughout the management systems implementation. Their expertise and timely assistance significantly streamlined our processes, ensuring a smooth transition. We are highly satisfied with their commitment to customer success.'
  },
  {
    rating: 4,
    name: 'Max Benjamin',
    role: 'Quality Manager of Nexora Dynamics',
    comment: 'The support offered during the management systems implementation was generally helpful, there were key bottlenecks that were helped addressed on our project timeline with improved communication and more proactive updates.'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Auto-play Hero slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  // Auto-play Testimonial slider
  useEffect(() => {
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(testimonialInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="home-page">
      {/* 1. Hero Slider Section */}
      <section className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div 
            key={index} 
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `linear-gradient(rgba(30, 88, 88, 0.7), rgba(4, 4, 4, 0.8)), url(${slide.image})` }}
          >
            <div className="container hero-container">
              <div className="hero-content">
                <span className="hero-tag animate-in">{slide.tag}</span>
                <h1 className="hero-title animate-in">{slide.title}</h1>
                <p className="hero-desc animate-in">{slide.desc}</p>
                <div className="hero-buttons animate-in">
                  <Link to="/about" className="btn btn-primary">Read More</Link>
                  <Link to="/contact" className="btn btn-secondary text-white">Contact Us</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Navigation arrows */}
        <button className="slider-arrow arrow-left" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="slider-arrow arrow-right" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
        {/* Indicators */}
        <div className="slider-indicators">
          {heroSlides.map((_, index) => (
            <button 
              key={index} 
              className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* 2. Globally Recognized Section */}
      <section className="globally-recognized-section section-padding">
        <div className="container globally-recognized-grid">
          {/* Left Column: Vision & Mission */}
          <div className="gr-left-col reveal">
            <div className="section-header-left">
              <span className="section-tag-underlined">Professionals</span>
              <h2 className="section-title-large">Globally Recognized</h2>
            </div>

            <div className="gr-vision-mission-list">
              {/* Vision Item */}
              <div className="gr-item">
                <div className="gr-icon-container">
                  <Eye size={24} color="#ffffff" />
                </div>
                <div className="gr-text">
                  <h3>Vision</h3>
                  <div className="gr-short-line"></div>
                  <p>To enable sustainable Business Success through the adoption of globally recognized Standards.</p>
                </div>
              </div>

              {/* Mission Item */}
              <div className="gr-item">
                <div className="gr-icon-container">
                  <Target size={24} color="#ffffff" />
                </div>
                <div className="gr-text">
                  <h3>Mission</h3>
                  <div className="gr-short-line"></div>
                  <p>Advocating strategic partnerships with qualified practitioners and forward-thinking organizations, committed to implementing globally recognized management system standards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Staggered Cards */}
          <div className="gr-right-col reveal">
            {/* Networking & Collaboration Card */}
            <div className="gr-card card-networking">
              {/* Illustration */}
              <svg viewBox="0 0 200 120" className="gr-illustration illustration-networking">
                {/* Floor line */}
                <path d="M20 95 h160" stroke="#798382" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Desk */}
                <path d="M50 85 h100 M65 85 v20 M135 85 v20" stroke="#525656" strokeWidth="2.5" />
                {/* Laptop */}
                <path d="M92 85 l3-12 h10 l3 12" stroke="#525656" strokeWidth="2" />
                {/* Person Left */}
                <circle cx="70" cy="42" r="8" stroke="#305858" strokeWidth="2" />
                <path d="M70 50 c-4 8-12 12-12 25" stroke="#305858" strokeWidth="2" />
                <path d="M70 50 c4 4 8 12 8 20" stroke="#305858" strokeWidth="2" />
                <path d="M52 75 h14" stroke="#525656" strokeWidth="1.5" /> {/* Chair Left */}
                <path d="M52 75 v15 M64 75 v15" stroke="#525656" strokeWidth="1.5" />
                {/* Person Right */}
                <circle cx="130" cy="42" r="8" stroke="#305858" strokeWidth="2" />
                <path d="M130 50 c4 8 12 12 12 25" stroke="#305858" strokeWidth="2" />
                <path d="M130 50 c-4 4-8 12-8 20" stroke="#305858" strokeWidth="2" />
                <path d="M148 75 h-14" stroke="#525656" strokeWidth="1.5" /> {/* Chair Right */}
                <path d="M136 75 v15 M148 75 v15" stroke="#525656" strokeWidth="1.5" />
              </svg>
              <h3>Networking & Collaboration</h3>
              <p>
                The institution connects members with industry peers, experts, and potential partners. This will enable knowledge sharing and expanding professional circles and provide a peer support network where members can exchange experiences and advice, helping tackle challenges collectively.
              </p>
            </div>

            {/* Industry Knowledge Card */}
            <div className="gr-card card-knowledge">
              {/* Illustration */}
              <svg viewBox="0 0 200 120" className="gr-illustration illustration-knowledge">
                {/* Floor line */}
                <path d="M20 95 h160" stroke="#798382" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Three people holding hands */}
                {/* Person 1 Left */}
                <circle cx="65" cy="40" r="8" stroke="#1E1F1E" strokeWidth="2" />
                <path d="M65 48 v22 M65 56 l-12 12 M65 56 l12-6" stroke="#1E1F1E" strokeWidth="2" />
                <path d="M65 70 l-8 20 M65 70 l8 20" stroke="#1E1F1E" strokeWidth="2" />
                {/* Person 2 Center */}
                <circle cx="100" cy="40" r="8" stroke="#1E1F1E" strokeWidth="2" />
                <path d="M100 48 v22 M100 56 l-23-6 M100 56 l23-6" stroke="#1E1F1E" strokeWidth="2" />
                <path d="M100 70 l-8 20 M100 70 l8 20" stroke="#1E1F1E" strokeWidth="2" />
                {/* Person 3 Right */}
                <circle cx="135" cy="40" r="8" stroke="#1E1F1E" strokeWidth="2" />
                <path d="M135 48 v22 M135 56 l-12-6 M135 56 l12 12" stroke="#1E1F1E" strokeWidth="2" />
                <path d="M135 70 l-8 20 M135 70 l8 20" stroke="#1E1F1E" strokeWidth="2" />
              </svg>
              <h3>Industry Knowledge & Resources</h3>
              <p>
                Members will receive access to the latest best practices, research findings, market insights, and standards updates. Keep up to date with industrial standards changes and certifications seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Solutions Summary (Services) */}
      <section className="solutions-section section-padding">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Leading</span>
            <h2 className="section-title">Effective Solutions</h2>
            <p className="section-subtitle">
              We work with business organizations deliver positive performance, and achieve improvement on their priorities, their purpose, and their people.
            </p>
          </div>

          <div className="grid-3 solutions-grid reveal">
            {/* Empowerment Hub */}
            <div className="solution-card">
              <div className="solution-card-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80')`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
              <div className="solution-header">
                <h4>Empowerment Hub</h4>
                <p>Fostering growth through capacity building, knowledge sharing, business support, and specialized ISO workshops.</p>
              </div>
              <ul className="solution-bullets">
                <li>Capacity Building</li>
                <li>Knowledge Sharing</li>
                <li>Business Support</li>
                <li>Specialized ISO workshops</li>
              </ul>
              <Link to="/services" className="solution-link">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>

            {/* Advisory Services */}
            <div className="solution-card active-card">
              <div className="solution-card-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=600&q=80')`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
              <div className="solution-header">
                <h4>Advisory Services</h4>
                <p>Unlock business excellence, ensuring growth, resilience, and global best practices.</p>
              </div>
              <ul className="solution-bullets">
                <li>Improving Communication</li>
                <li>Employee issue resolution</li>
                <li>Proper Documentation Process</li>
              </ul>
              <Link to="/services" className="solution-link">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>

            {/* Professionalism */}
            <div className="solution-card">
              <div className="solution-card-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80')`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
              <div className="solution-header">
                <h4>Professionalism</h4>
                <p>Championing continuous excellence in global business standards.</p>
              </div>
              <ul className="solution-bullets">
                <li>Advocacy & Representation on ISO related business management issues</li>
                <li>Promote ISO practices among SMEs</li>
                <li>Recognizing stakeholders’ global standards excellence</li>
              </ul>
              <Link to="/services" className="solution-link">
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Membership Banner */}
      <section className="membership-banner-section" style={{ backgroundImage: `linear-gradient(rgba(48, 88, 88, 0.8), rgba(4, 4, 4, 0.85)), url(${heroImg1})` }}>
        <div className="banner-overlay">
          <div className="container banner-grid">
            <div className="banner-left">
              <button className="video-play-btn">
                <Play size={24} fill="currentColor" />
              </button>
            </div>
            <div className="banner-right">
              <h2>Creating Meaningful Experiences for Members</h2>
              <p>
                Whether you're a Corporate Member driving ISO implementation, an Individual Private Member with expertise, or a Student Member aspiring for a career in ISO, joining IBMSSP unlocks a realm of benefits tailored to enhance your professional journey and contribute to the global standardization community.
              </p>
              <Link to="/membership/business" className="btn btn-primary">Read More</Link>
            </div>
          </div>
        </div>
        {/* Expertise Tiers Quickbar */}
        <div className="expertise-quickbar">
          <div className="container quickbar-container">
            <Link to="/membership/business" className="qb-item">
              <span className="qb-letter">A.</span>
              <span>Corporate Members</span>
            </Link>
            <Link to="/membership/individuals" className="qb-item">
              <span className="qb-letter">B.</span>
              <span>Individual Private Members</span>
            </Link>
            <Link to="/membership/students" className="qb-item">
              <span className="qb-letter">C.</span>
              <span>Student Members</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Steps of Membership */}
      <section className="steps-section section-padding">
        <div className="container">
          <div className="section-header-left reveal" style={{ marginBottom: '3rem' }}>
            <span className="section-tag-underlined">The Steps of</span>
            <h2 className="section-title-large">Membership</h2>
          </div>

          <div className="grid-4 steps-grid reveal">
            {/* Step 1 */}
            <div className="step-card-new">
              <span className="step-badge">STEP 01</span>
              <div className="step-header-row">
                <svg viewBox="0 0 48 48" className="step-icon-svg" fill="none" stroke="#305858" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="14" width="36" height="26" rx="4" />
                  <path d="M16 14V10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v4" />
                  <circle cx="24" cy="27" r="5" />
                  <path d="M28 31l5 5" />
                </svg>
                <h3>Identify the Membership Type</h3>
              </div>
              <p>Choose the type of membership from our listed structure.</p>
              <Link to="/membership/business" className="btn-step-readmore">READ MORE</Link>
            </div>

            {/* Step 2 */}
            <div className="step-card-new">
              <span className="step-badge">STEP 02</span>
              <div className="step-header-row">
                <svg viewBox="0 0 48 48" className="step-icon-svg" fill="none" stroke="#305858" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="8" width="32" height="32" rx="4" />
                  <path d="M14 16h12M14 24h10 M14 32h6" />
                  <path d="M30 20l6 6-10 10-6-6z" />
                </svg>
                <h3>Choose a Sub-Category</h3>
              </div>
              <p>Choose a sub-category from the selected membership type.</p>
              <Link to="/membership/business" className="btn-step-readmore">READ MORE</Link>
            </div>

            {/* Step 3 */}
            <div className="step-card-new">
              <span className="step-badge">STEP 03</span>
              <div className="step-header-row">
                <svg viewBox="0 0 48 48" className="step-icon-svg" fill="none" stroke="#305858" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="10" width="36" height="26" rx="4" />
                  <path d="M14 40h20M24 36v4" />
                  <circle cx="28" cy="18" r="4" />
                  <path d="M22 26a6 6 0 0 1 12 0" />
                </svg>
                <h3>Pay your Registration Fee</h3>
              </div>
              <p>Make registration payment using your preferred payment option.</p>
              <Link to="/membership/business" className="btn-step-readmore">READ MORE</Link>
            </div>

            {/* Step 4 */}
            <div className="step-card-new">
              <span className="step-badge">STEP 04</span>
              <div className="step-header-row">
                <svg viewBox="0 0 48 48" className="step-icon-svg" fill="none" stroke="#305858" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 20V8a4 4 0 0 1 8 0v12" />
                  <path d="M22 14h10a4 4 0 0 1 4 4v4a4 4 0 0 1-4 4H22" />
                  <path d="M10 20h4v16h-4z" />
                  <path d="M14 36h14a6 6 0 0 0 6-6V24" />
                </svg>
                <h3>Screening and Shortlisting</h3>
              </div>
              <p>Get your login details sent directly to your email inbox.</p>
              <Link to="/membership/business" className="btn-step-readmore">READ MORE</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials / Quote Section */}
      <section className="testimonials-section section-padding">
        <div className="container testimonials-grid reveal">
          <div className="testimonials-left">
            <div className="collage-placeholder" style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwM_3gPnd0uQhLwOjcQaSTmxPDVbd4aPceCi2_Lm8d4GHRsF8vumwxUjx&s=10')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
          </div>
          <div className="testimonials-right">
            <span className="section-tag">Quote About</span>
            <h2 className="section-title text-white">Customers Experience</h2>

            <div className="testimonial-slider">
              <div className="testimonial-slide active">
                <div className="stars-row">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      fill={i < testimonials[currentTestimonial].rating ? '#ffc107' : 'none'} 
                      color={i < testimonials[currentTestimonial].rating ? '#ffc107' : 'rgba(255,255,255,0.2)'}
                    />
                  ))}
                </div>
                <p className="testimonial-comment">
                  "{testimonials[currentTestimonial].comment}"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar-placeholder"></div>
                  <div className="author-info">
                    <h4>{testimonials[currentTestimonial].name}</h4>
                    <span>{testimonials[currentTestimonial].role}</span>
                  </div>
                </div>
              </div>

              {/* Slider Arrows */}
              <div className="testimonial-controls" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                    className="control-btn"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                    className="control-btn"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <span className="control-count" style={{ marginLeft: '0.5rem' }}>
                    {currentTestimonial + 1} / {testimonials.length}
                  </span>
                </div>
                
                <Link to="/testimonials" className="btn-step-readmore" style={{ margin: 0, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1.5px', color: '#ffffff', borderBottom: '2px solid var(--primary-color)' }}>
                  View All Testimonials
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
