import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Membership from './pages/Membership';
import Services from './pages/Services';
import Insights from './pages/Insights';
import Contact from './pages/Contact';
import Facilitator from './pages/Facilitator';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Account from './pages/Account';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);

  useEffect(() => {
    // Hide splash screen after 2 seconds
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 1500);

    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2300);

    // Scroll reveal logic
    const handleScrollReveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal);
    // Initial check
    const initialTimer = setTimeout(handleScrollReveal, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      clearTimeout(initialTimer);
      window.removeEventListener('scroll', handleScrollReveal);
    };
  }, []);

  return (
    <Router>
      {showSplash && (
        <div className={`splash-screen ${fadeSplash ? 'fade-out' : ''}`}>
          <div className="splash-logo" style={{ color: 'white', fontSize: '2.5rem', fontWeight: 800, fontFamily: 'sans-serif' }}>
            <span style={{ color: '#078586' }}>IBM</span>SSP
          </div>
          <div className="splash-loader"></div>
        </div>
      )}

      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        
        <main className="main-content" style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/membership/:type" element={<Membership />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/services" element={<Services />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/facilitator" element={<Facilitator />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
