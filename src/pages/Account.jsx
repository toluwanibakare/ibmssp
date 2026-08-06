import React, { useState } from 'react';
import { User, Award, CheckCircle, Clock, BookOpen, Download } from 'lucide-react';
import './Account.css';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="account-page">
        <section className="page-hero">
          <div className="container">
            <h1>Membership Account</h1>
            <p>Access your IBMSSP practitioner dashboard</p>
          </div>
        </section>

        <section className="section-padding container login-section">
          <div className="login-card">
            <h2>Log In</h2>
            <p>Enter your practitioner credentials to access files and certificates.</p>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  required 
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">Sign In</button>
            </form>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="account-page">
      <section className="page-hero portal-hero">
        <div className="container portal-hero-container">
          <div className="portal-user-info">
            <div className="portal-avatar">
              <User size={32} />
            </div>
            <div>
              <h1>Welcome, Standards Practitioner</h1>
              <p>Corporate Practitioner Tier • Member ID: #SSP-2026-9043</p>
            </div>
          </div>
          <button className="btn btn-secondary text-white" onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      </section>

      <section className="section-padding container portal-grid">
        {/* Left Column: Dashboard metrics */}
        <div className="portal-main">
          <div className="portal-metrics">
            <div className="metric-box">
              <CheckCircle size={24} className="metric-icon green" />
              <h3>Active</h3>
              <p>Account Status</p>
            </div>
            <div className="metric-box">
              <Award size={24} className="metric-icon gold" />
              <h3>ISO 9001</h3>
              <p>Primary Standards Tracker</p>
            </div>
            <div className="metric-box">
              <Clock size={24} className="metric-icon blue" />
              <h3>3</h3>
              <p>Upcoming Workshops</p>
            </div>
          </div>

          <div className="portal-card cert-card">
            <div className="card-header">
              <Award size={22} className="card-icon" />
              <h3>Practitioner Certificate</h3>
            </div>
            <p>Your annual membership is active and compliant. You can download your official compliance certification below.</p>
            <button className="btn btn-primary" onClick={() => alert('Certificate PDF download started!')}>
              <Download size={16} /> Download Certificate
            </button>
          </div>
        </div>

        {/* Right Column: Resources & courses */}
        <div className="portal-sidebar">
          <div className="portal-card">
            <div className="card-header">
              <BookOpen size={22} className="card-icon" />
              <h3>Exclusive Resources</h3>
            </div>
            <ul className="resources-list">
              <li>
                <a href="#doc1" onClick={(e) => { e.preventDefault(); alert('Opening file...'); }}>
                  ISO 9001:2015 Audit Checklist.pdf
                </a>
              </li>
              <li>
                <a href="#doc2" onClick={(e) => { e.preventDefault(); alert('Opening file...'); }}>
                  SME Compliance Guide.pdf
                </a>
              </li>
              <li>
                <a href="#doc3" onClick={(e) => { e.preventDefault(); alert('Opening file...'); }}>
                  System Standard Codes of Ethics.pdf
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
