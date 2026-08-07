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
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1600&q=80'
  },
  {
    tag: 'Credibility',
    title: 'Ethical Practices',
    desc: 'We prioritize accountability and commitment to high standards and professional credibility within the industry.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80'
  },
  {
    tag: 'Business Stability',
    title: 'Empowering Organizations for Growth & Sustained Success',
    desc: 'We assist in monitoring the implementation of standards and hold organizations accountable for compliance.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80'
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

      {/* 2. Mission & Vision Section */}
      <section className="section-padding vision-mission-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Professionals</span>
            <h2 className="section-title">Globally Recognized</h2>
          </div>

          <div className="grid-2 vision-mission-grid reveal">
            <div className="vm-card">
              <div className="vm-header">
                <div className="vm-icon-box">
                  <Target size={28} className="vm-icon" />
                  <span className="vm-number">01</span>
                </div>
                <h3>Mission</h3>
              </div>
              <p>Advocating strategic partnerships with qualified practitioners and forward-thinking organizations, committed to implementing globally recognized management system standards.</p>
            </div>

            <div className="vm-card">
              <div className="vm-header">
                <div className="vm-icon-box">
                  <Eye size={28} className="vm-icon" />
                  <span className="vm-number">02</span>
                </div>
                <h3>Vision</h3>
              </div>
              <p>To enable sustainable Business Success through the adoption of globally recognized Standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Section */}
      <section className="values-section section-padding">
        <div className="container">
          <div className="grid-2 values-grid reveal">
            <div className="value-card">
              <div className="value-icon-circle">
                <span>01</span>
              </div>
              <h3>Networking & Collaboration</h3>
              <p>
                The institution connects members with industry peers, experts, and potential partners. This will enable knowledge sharing and expanding professional circles and provide a peer support network where members can exchange experiences and advice, helping tackle challenges collectively.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">
                <span>02</span>
              </div>
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
              <div className="solution-card-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80')`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
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
              <div className="solution-card-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80')`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
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
              <div className="solution-card-image" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80')`, height: '180px', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px', marginBottom: '1.5rem' }}></div>
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
          <div className="section-header text-center">
            <span className="section-tag">The Steps of</span>
            <h2 className="section-title">Membership</h2>
          </div>

          <div className="grid-4 steps-grid reveal">
            <div className="step-card">
              <span className="step-num">Step 01</span>
              <h3>Identify the Membership Type</h3>
              <p>Choose the type of membership from our listed structure.</p>
              <Link to="/membership/business" className="step-link">Read more</Link>
            </div>

            <div className="step-card">
              <span className="step-num">Step 02</span>
              <h3>Choose a Sub-Category</h3>
              <p>Choose a sub-category from the selected membership type.</p>
              <Link to="/membership/business" className="step-link">Read more</Link>
            </div>

            <div className="step-card">
              <span className="step-num">Step 03</span>
              <h3>Pay your Registration Fee</h3>
              <p>Make registration payment using your preferred payment option.</p>
              <Link to="/membership/business" className="step-link">Read more</Link>
            </div>

            <div className="step-card">
              <span className="step-num">Step 04</span>
              <h3>Screening and Shortlisting</h3>
              <p>Get your login details sent directly to your email inbox.</p>
              <Link to="/membership/business" className="step-link">Read more</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials / Quote Section */}
      <section className="testimonials-section section-padding">
        <div className="container testimonials-grid reveal">
          <div className="testimonials-left">
            <div className="collage-placeholder" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                      fill={i < testimonials[currentTestimonial].rating ? 'var(--primary-color)' : 'none'} 
                      color={i < testimonials[currentTestimonial].rating ? 'var(--primary-color)' : 'rgba(255,255,255,0.2)'}
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
              <div className="testimonial-controls">
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
                <span className="control-count">
                  {currentTestimonial + 1} / {testimonials.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
