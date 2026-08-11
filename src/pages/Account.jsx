import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Award, CheckCircle, Clock, BookOpen, Download, ShieldAlert, Edit, Save, FileText, Lock, Mail } from 'lucide-react';
import './Account.css';

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Profile fields states (Editable)
  const [profileName, setProfileName] = useState('Supreme Standards Ltd');
  const [profileEmail, setProfileEmail] = useState('operations@supremestandards.com');
  const [profilePhone, setProfilePhone] = useState('+234 803 570 6827');
  const [profileAddress, setProfileAddress] = useState('334 Ikorodu Road, Anthony, Lagos');
  
  // Dashboard tab state
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    alert('Profile settings saved successfully!');
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
              <div className="premium-form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary-slate)', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'block' }}>YOUR EMAIL</label>
                <div className="input-with-icon-wrapper" style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Your Email"
                    style={{ width: '100%', padding: '0.85rem 2.5rem 0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    required 
                  />
                  <Mail size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-color)' }} />
                </div>
              </div>

              <div className="premium-form-group" style={{ marginBottom: '2rem', textAlign: 'left' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary-slate)', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'block' }}>PASSWORD</label>
                <div className="input-with-icon-wrapper" style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    style={{ width: '100%', padding: '0.85rem 2.5rem 0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                    required 
                  />
                  <Lock size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-color)' }} />
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'block', padding: '0.9rem', fontWeight: 700, letterSpacing: '0.5px' }}>Sign In</button>
            </form>
            <div className="login-signup-prompt" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', marginBottom: '0.85rem' }}>Don't have an account or cannot sign in?</p>
              <Link to="/membership" className="btn btn-secondary w-full text-center" style={{ display: 'block' }}>Become a Member</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="account-page">
      {/* Portal Header */}
      <section className="page-hero portal-hero">
        <div className="container portal-hero-container">
          <div className="portal-user-info">
            <div className="portal-avatar">
              <User size={32} />
            </div>
            <div>
              <h1>Welcome, {profileName}</h1>
              <p>Corporate Organization Tier • Member ID: #SSP-2026-9043</p>
            </div>
          </div>
          <button className="btn btn-secondary text-white" onClick={() => setIsLoggedIn(false)}>Log Out</button>
        </div>
      </section>

      {/* Portal Tabs Bar */}
      <div className="container portal-tabs-bar">
        <button 
          className={`portal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Award size={16} /> <span>Dashboard Overview</span>
        </button>
        <button 
          className={`portal-tab-btn ${activeTab === 'edit-profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('edit-profile')}
        >
          <Edit size={16} /> <span>Edit Profile Info</span>
        </button>
        <button 
          className={`portal-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          <BookOpen size={16} /> <span>Resources & Certs</span>
        </button>
      </div>

      <section className="section-padding container">
        {activeTab === 'overview' && (
          <div className="portal-overview-tab">
            {/* 1. Payment Pending Alert Warning Box */}
            <div className="portal-warning-box">
              <div className="warning-box-left">
                <ShieldAlert size={28} />
              </div>
              <div className="warning-box-right">
                <h3>Payment Pending</h3>
                <p>
                  Your registration is complete, but your annual corporate membership fee of <strong>₦20,000</strong> is currently pending. Settle the invoice to fully activate your portal and access all certification study keys.
                </p>
                <button className="btn btn-primary btn-settle-payment" onClick={() => alert('Redirecting to invoice secure payment gateway...')}>
                  Complete Registration Payment
                </button>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="portal-metrics" style={{ marginTop: '2.5rem' }}>
              <div className="metric-box">
                <Clock size={24} className="metric-icon gold" />
                <h3>Pending Activation</h3>
                <p>Account Status</p>
              </div>
              <div className="metric-box">
                <Award size={24} className="metric-icon blue" />
                <h3>QMS Maturity Assessment</h3>
                <p>Pending Payment</p>
              </div>
              <div className="metric-box">
                <FileText size={24} className="metric-icon green" />
                <h3>ISO 9001:2015</h3>
                <p>Standard Module Tracker</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'edit-profile' && (
          <div className="portal-edit-profile-tab">
            <div className="edit-profile-card">
              <h3>Edit Profile Information</h3>
              <p>Update your corporate registration and contact detail parameters below.</p>
              
              <form onSubmit={handleProfileSave} className="edit-profile-form">
                <div className="edit-form-grid">
                  <div className="form-group">
                    <label>Organization / Full Name</label>
                    <input 
                      type="text" 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Email</label>
                    <input 
                      type="email" 
                      value={profileEmail} 
                      onChange={(e) => setProfileEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact Phone</label>
                    <input 
                      type="text" 
                      value={profilePhone} 
                      onChange={(e) => setProfilePhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Office Address Location</label>
                    <input 
                      type="text" 
                      value={profileAddress} 
                      onChange={(e) => setProfileAddress(e.target.value)} 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary save-profile-btn">
                  <Save size={16} /> <span>Save Profile Settings</span>
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="portal-resources-tab grid-2">
            {/* Download Certificate Card */}
            <div className="portal-card cert-card">
              <div className="card-header">
                <Award size={22} className="card-icon" />
                <h3>Practitioner Certificate</h3>
              </div>
              <p>Complete your registration payment to activate and download your official compliance certification.</p>
              <button className="btn btn-primary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                <Download size={16} /> Download Certificate (Locked)
              </button>
            </div>

            {/* Exclusive Resources List */}
            <div className="portal-card resources-card">
              <div className="card-header">
                <BookOpen size={22} className="card-icon" />
                <h3>Exclusive Resources</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', marginBottom: '1.5rem' }}>
                The resources below are locked until your payment is confirmed.
              </p>
              <ul className="resources-list-locked">
                <li style={{ opacity: 0.65, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                  <Clock size={14} /> <span>ISO 9001:2015 Audit Checklist.pdf</span>
                </li>
                <li style={{ opacity: 0.65, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                  <Clock size={14} /> <span>SME Compliance Guide.pdf</span>
                </li>
                <li style={{ opacity: 0.65, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                  <Clock size={14} /> <span>System Standard Codes of Ethics.pdf</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
