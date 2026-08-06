import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Mail, Phone, Menu, X, ChevronDown } from 'lucide-react';
import './Header.css';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (index) => {
    if (activeDropdown === index) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(index);
    }
  };

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
      {/* Top Bar Info */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-info-left">
            <div className="info-item">
              <MapPin size={14} className="info-icon" />
              <span>334 Ikorodu Road, Anthony/Maryland, Lagos.</span>
            </div>
            <div className="info-item">
              <Mail size={14} className="info-icon" />
              <a href="mailto:info@ibmssp.org.ng">info@ibmssp.org.ng</a>
            </div>
          </div>
          <div className="top-info-right">
            <div className="info-item">
              <Phone size={14} className="info-icon" />
              <a href="tel:08023644148">08023644148</a>, <a href="tel:08036706827">08036706827</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="nav-bar">
        <div className="container nav-container">
          <Link to="/" className="header-logo">
            <img 
              src={(location.pathname === '/' && !scrolled) ? "/ibmssp-logo-white.png" : "/ibmssp-logo.png"} 
              alt="IBMSSP Logo" 
              className="logo-image" 
              style={{ height: '40px', objectFit: 'contain' }} 
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              <li>
                <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
              </li>
              
              <li className="dropdown-parent" 
                  onMouseEnter={() => setActiveDropdown('about')} 
                  onMouseLeave={() => setActiveDropdown(null)}>
                <button className={`nav-link dropdown-toggle ${location.pathname.startsWith('/about') ? 'active' : ''}`}>
                  About Us <ChevronDown size={14} />
                </button>
                <ul className={`dropdown-menu ${activeDropdown === 'about' ? 'show' : ''}`}>
                  <li><Link to="/about">Our Identity</Link></li>
                  <li><Link to="/team">Our Team</Link></li>
                </ul>
              </li>

              <li className="dropdown-parent"
                  onMouseEnter={() => setActiveDropdown('membership')} 
                  onMouseLeave={() => setActiveDropdown(null)}>
                <button className={`nav-link dropdown-toggle ${location.pathname.startsWith('/membership') ? 'active' : ''}`}>
                  Membership <ChevronDown size={14} />
                </button>
                <ul className={`dropdown-menu ${activeDropdown === 'membership' ? 'show' : ''}`}>
                  <li><Link to="/membership/business">Business Organizations</Link></li>
                  <li><Link to="/membership/individuals">Individual Private Membership</Link></li>
                  <li><Link to="/membership/graduates">Graduates</Link></li>
                  <li><Link to="/membership/students">Students</Link></li>
                </ul>
              </li>

              <li>
                <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
              </li>

              <li>
                <Link to="/insights" className={`nav-link ${location.pathname === '/insights' ? 'active' : ''}`}>Insights</Link>
              </li>

              <li>
                <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
              </li>

              <li>
                <Link to="/account" className="btn btn-primary nav-cta">Account</Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Toggler */}
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li className="mobile-dropdown-parent">
            <button onClick={() => toggleDropdown('about')}>
              About Us <ChevronDown size={16} />
            </button>
            <ul className={`mobile-dropdown-menu ${activeDropdown === 'about' ? 'show' : ''}`}>
              <li><Link to="/about">Our Identity</Link></li>
              <li><Link to="/team">Our Team</Link></li>
            </ul>
          </li>
          <li className="mobile-dropdown-parent">
            <button onClick={() => toggleDropdown('membership')}>
              Membership <ChevronDown size={16} />
            </button>
            <ul className={`mobile-dropdown-menu ${activeDropdown === 'membership' ? 'show' : ''}`}>
              <li><Link to="/membership/business">Business Organizations</Link></li>
              <li><Link to="/membership/individuals">Individual Private Membership</Link></li>
              <li><Link to="/membership/graduates">Graduates</Link></li>
              <li><Link to="/membership/students">Students</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/insights">Insights</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li className="mobile-cta-li">
            <Link to="/account" className="btn btn-primary">Account</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
