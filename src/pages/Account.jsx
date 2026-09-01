import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Award, CheckCircle, Clock, BookOpen, Download, ShieldAlert, Edit, Save, FileText, Lock, Mail, Loader, Key, Eye, EyeOff } from 'lucide-react';
import { supabase, callEdgeFunction } from '../lib/supabase';
import html2canvas from 'html2canvas';
import RegistrationCertificate from '../components/RegistrationCertificate';
import './Account.css';

// Paystack configuration is fetched dynamically in the handler

export default function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionUser, setSessionUser] = useState(null);
  const [memberData, setMemberData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Login / Reset state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Forgot Password / OTP states
  const [forgotMode, setForgotMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Profile editable fields
  const [profileFirstName, setProfileFirstName] = useState('');
  const [profileLastName, setProfileLastName] = useState('');
  const [profileOtherName, setProfileOtherName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileAddress, setProfileAddress] = useState('');
  const [profileState, setProfileState] = useState('');
  const [profileCountry, setProfileCountry] = useState('');
  const [profileSaveLoading, setProfileSaveLoading] = useState(false);

  // Category-specific details
  const [catOrgName, setCatOrgName] = useState('');
  const [catRcNumber, setCatRcNumber] = useState('');
  const [catContactPerson, setCatContactPerson] = useState('');
  const [catCompanyEmail, setCatCompanyEmail] = useState('');
  const [catCompanyPhone, setCatCompanyPhone] = useState('');

  const [catInstitution, setCatInstitution] = useState('');
  const [catCourse, setCatCourse] = useState('');
  const [catLevel, setCatLevel] = useState('');
  const [catMatricNumber, setCatMatricNumber] = useState('');
  const [catGraduationYear, setCatGraduationYear] = useState('');

  const [catProfession, setCatProfession] = useState('');
  const [catSpecialization, setCatSpecialization] = useState('');
  const [catCurrentCompany, setCatCurrentCompany] = useState('');
  const [catYearsExp, setCatYearsExp] = useState('');

  // Dashboard tab state
  const [activeTab, setActiveTab] = useState('overview');

  const certificateRef = React.useRef(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    try {
      // Ensure all fonts are fully loaded before rendering
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      } else {
        // Fallback timeout
        await new Promise(res => setTimeout(res, 800));
      }
      
      const canvas = await html2canvas(certificateRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imgData;
      link.download = `IBMSSP-Certificate-${memberData?.first_name}-${memberData?.last_name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Error generating certificate', err);
    }
  };

  // Monitor active session
  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSessionUser(session.user);
        setIsLoggedIn(true);
        await fetchMemberRecord(session.user.email);
      }
      setIsLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSessionUser(session.user);
        setIsLoggedIn(true);
        await fetchMemberRecord(session.user.email);
      } else {
        setSessionUser(null);
        setIsLoggedIn(false);
        setMemberData(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // OTP Resend Timer effect
  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const fetchMemberRecord = async (userEmail) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('email', userEmail)
        .maybeSingle();

      if (!error && data) {
        setMemberData(data);
        setProfileFirstName(data.first_name || '');
        setProfileLastName(data.last_name || '');
        setProfileOtherName(data.other_name || '');
        setProfilePhone(data.phone || '');
        setProfileAddress(data.address || '');
        setProfileState(data.state || '');
        setProfileCountry(data.country || '');

        // Fetch Category Specific Record
        const cat = (data.category || '').toLowerCase();
        if (cat === 'business') {
          const { data: org } = await supabase.from('organization_details').select('*').eq('member_id', data.member_id).maybeSingle();
          if (org) {
            setCatOrgName(org.organization_name || '');
            setCatRcNumber(org.rc_number || '');
            setCatContactPerson(org.contact_person || '');
            setCatCompanyEmail(org.company_email || '');
            setCatCompanyPhone(org.company_phone || '');
          }
        } else if (cat === 'student') {
          const { data: st } = await supabase.from('student_details').select('*').eq('member_id', data.member_id).maybeSingle();
          if (st) {
            setCatInstitution(st.institution_name || '');
            setCatCourse(st.course_of_study || '');
            setCatLevel(st.level || '');
            setCatMatricNumber(st.matric_number || '');
            setCatGraduationYear(st.expected_graduation_year || '');
          }
        } else if (cat === 'graduate') {
          const { data: gr } = await supabase.from('graduate_details').select('*').eq('member_id', data.member_id).maybeSingle();
          if (gr) {
            setCatInstitution(gr.institution || '');
            setCatCourse(gr.qualification || '');
            setCatGraduationYear(gr.graduation_year || '');
          }
        } else if (cat === 'individual' || cat === 'professional') {
          const { data: pr } = await supabase.from('professional_details').select('*').eq('member_id', data.member_id).maybeSingle();
          if (pr) {
            setCatProfession(pr.profession || '');
            setCatSpecialization(pr.specialization || '');
            setCatCurrentCompany(pr.current_company || '');
            setCatYearsExp(pr.years_of_experience || '');
          }
        }
      }
    } catch (err) {
      console.error('Error fetching member record:', err);
    }
  };

  // ─── Login Handler ────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
    } catch (err) {
      setLoginError(err.message || 'Failed to authenticate.');
    } finally {
      setLoginLoading(false);
    }
  };

  // ─── Forgot Password OTP Sending ──────────────────────────────────────────
  const handleSendResetOTP = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setOtpError('');
    setOtpLoading(true);

    try {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

      await callEdgeFunction('send-email', {
        type: 'otp',
        to: email,
        otp: generatedOtp,
      });

      setOtpSent(true);
      setResendTimer(60);
    } catch (err) {
      setOtpError(err.message || 'Error sending OTP code. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── OTP Token Verification & Reset ───────────────────────────────────────
  const handleVerifyOTPAndReset = async (e) => {
    e.preventDefault();
    setOtpError('');
    setOtpLoading(true);

    try {
      // 1. Verify OTP with Edge Function
      const data = await callEdgeFunction('send-email', {
        type: 'verify_otp',
        to: email,
        otp: otpToken,
      });

      if (data?.error) throw new Error(data.error || 'Invalid OTP');

      // 2. Sign in user with temporary default password or update password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: 'IBMSSP_User@2026!',
      });

      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updateError) {
        throw new Error(updateError.message || 'Failed to update password.');
      }

      setForgotMode(false);
      setOtpSent(false);
      setPassword('');
      alert('Password reset successfully! You can now log in with your new password.');
    } catch (err) {
      setOtpError(err.message || 'OTP Verification failed.');
    } finally {
      setOtpLoading(false);
    }
  };

  // ─── Profile Update Handler ───────────────────────────────────────────────
  const handleProfileSave = async (e) => {
    e.preventDefault();
    setProfileSaveLoading(true);

    try {
      // 1. Update main member record
      const { error } = await supabase
        .from('members')
        .update({
          first_name: profileFirstName,
          last_name: profileLastName,
          other_name: profileOtherName,
          phone: profilePhone,
          address: profileAddress,
          state: profileState,
          country: profileCountry,
          updated_at: new Date().toISOString()
        })
        .eq('member_id', memberData.member_id);

      if (error) throw error;

      // 2. Upsert Category Specific Detail Record
      const cat = (memberData.category || '').toLowerCase();
      if (cat === 'business') {
        await supabase.from('organization_details').upsert({
          member_id: memberData.member_id,
          organization_name: catOrgName,
          rc_number: catRcNumber,
          contact_person: catContactPerson,
          company_email: catCompanyEmail,
          company_phone: catCompanyPhone
        });
      } else if (cat === 'student') {
        await supabase.from('student_details').upsert({
          member_id: memberData.member_id,
          institution_name: catInstitution,
          course_of_study: catCourse,
          level: catLevel,
          matric_number: catMatricNumber,
          expected_graduation_year: parseInt(catGraduationYear) || null
        });
      } else if (cat === 'graduate') {
        await supabase.from('graduate_details').upsert({
          member_id: memberData.member_id,
          institution: catInstitution,
          qualification: catCourse,
          graduation_year: parseInt(catGraduationYear) || null
        });
      } else if (cat === 'individual' || cat === 'professional') {
        await supabase.from('professional_details').upsert({
          member_id: memberData.member_id,
          profession: catProfession,
          specialization: catSpecialization,
          current_company: catCurrentCompany,
          years_of_experience: parseInt(catYearsExp) || null
        });
      }

      alert('Profile information updated successfully!');
      await fetchMemberRecord(sessionUser.email);
    } catch (err) {
      alert(err.message || 'Failed to update profile settings.');
    } finally {
      setProfileSaveLoading(false);
    }
  };

  const [paymentProcessing, setPaymentProcessing] = useState(false);

  // ─── Paystack Payment Popup Handler ────────────────────────────────────────
  const handlePaystackPayment = async () => {
    if (!memberData) return;
    setPaymentProcessing(true);

    // Fetch the current global Paystack mode ('test' or 'live')
    let mode = 'test';
    try {
      const { data } = await supabase.from('app_settings').select('setting_value').eq('setting_key', 'paystack_mode').single();
      if (data && typeof data.setting_value === 'string') {
        mode = data.setting_value;
      }
    } catch(err) {
      console.error('Error fetching paystack mode:', err);
    }
    
    const activePublicKey = mode === 'live' 
      ? (import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY)
      : (import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_KEY || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);

    // Calculate fee based on category
    let amount = 10000; // default for individual/graduate (10k)
    if (memberData.category === 'business') amount = 20000;
    if (memberData.category === 'student') amount = 5000;

    // Dynamically load Paystack script if not present
    if (!window.PaystackPop) {
      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://js.paystack.co/v1/inline.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('Failed to load Paystack SDK script.'));
          document.head.appendChild(script);
        });
      } catch (scriptErr) {
        setPaymentProcessing(false);
        alert('Could not load Paystack Payment Gateway. Please check your internet connection.');
        return;
      }
    }

    const handler = window.PaystackPop.setup({
      key: activePublicKey,
      email: memberData.email,
      amount: amount * 100, // Paystack works in kobo
      currency: 'NGN',
      ref: 'SSP-' + Math.floor(Math.random() * 1000000000 + 1),
      callback: function(response) {
        (async () => {
          try {
            const { error } = await supabase
              .from('members')
              .update({
                payment_status: 'paid',
                registration_status: 'approved'
              })
              .eq('member_id', memberData.member_id);

            if (error) throw error;

            await supabase.from('activity_logs').insert({
              member_id: memberData.member_id,
              action: 'PAYMENT_RECEIVED',
              description: `Payment of ₦${amount} received via Paystack. Ref: ${response.reference}`,
              performed_by: 'system',
            });

            // 1. Send payment confirmation email to the member
            await callEdgeFunction('send-email', {
              type: 'payment_confirmation',
              to: memberData.email,
              name: `${memberData.first_name || ''} ${memberData.last_name || ''}`.trim() || 'Member',
              memberId: memberData.public_id || memberData.member_id,
              amount: `₦${amount.toLocaleString()}`,
            });

            // 2. Send payment notification email to the admin
            await callEdgeFunction('send-email', {
              type: 'announcement',
              to: 'ibmssp.media2@gmail.com',
              subject: `Payment Alert: ${memberData.first_name} ${memberData.last_name} (${memberData.public_id || memberData.member_id})`,
              headline: 'New Membership Payment Received',
              content: `A new payment of ₦${amount.toLocaleString()} was successfully received from ${memberData.first_name} ${memberData.last_name} (${memberData.email}).\nMember ID: ${memberData.public_id || memberData.member_id}\nTransaction Ref: ${response.reference}\nStatus: Approved & Active.`
            });

            alert('Payment Successful! Your membership account is now fully active.');
            await fetchMemberRecord(sessionUser.email);
          } catch (err) {
            console.error('Error confirming transaction:', err);
            alert('Payment recorded, but failed to update status automatically. Please contact support.');
          } finally {
            setPaymentProcessing(false);
          }
        })();
      },
      onClose: function() {
        setPaymentProcessing(false);
        console.log('Paystack popup closed.');
      }
    });

    handler.openIframe();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="account-page-loading" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader className="spin-icon" size={32} color="var(--primary-color)" />
      </div>
    );
  }

  // ─── Login Screen (Logged out) ───────────────────────────────────────────
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
          <div className="login-card animate-fadeIn">
            
            {/* ── Normal Login View ── */}
            {!forgotMode ? (
              <>
                <h2>Log In</h2>
                <p>Enter your credentials to access certification files and directories.</p>
                {loginError && <div className="form-error-banner">{loginError}</div>}
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

                  <div className="premium-form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary-slate)', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'block' }}>PASSWORD</label>
                    <div className="input-with-icon-wrapper" style={{ position: 'relative' }}>
                      <input 
                        type={showPassword ? "text" : "password"} 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        style={{ width: '100%', padding: '0.85rem 2.8rem 0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                        required 
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', padding: 0 }}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', marginBottom: '1.5rem' }}>
                    <button type="button" onClick={() => setForgotMode(true)} className="forgot-password-link" style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}>
                      Forgot Password?
                    </button>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.9rem', fontWeight: 700, letterSpacing: '0.5px' }} disabled={loginLoading}>
                    {loginLoading ? <Loader size={16} className="spin-icon" /> : 'Sign In'}
                  </button>
                </form>
              </>
            ) : (
              // ── Reset Password View ──
              <>
                <h2>Reset Password</h2>
                <p>Request an OTP token to reset your practitioner login password.</p>
                {otpError && <div className="form-error-banner">{otpError}</div>}
                
                {!otpSent ? (
                  <form onSubmit={handleSendResetOTP}>
                    <div className="premium-form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary-slate)', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'block' }}>YOUR REGISTERED EMAIL</label>
                      <div className="input-with-icon-wrapper" style={{ position: 'relative' }}>
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Enter your email"
                          style={{ width: '100%', padding: '0.85rem 2.5rem 0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                          required 
                        />
                        <Mail size={16} style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-color)' }} />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={otpLoading}>
                      {otpLoading ? <Loader size={16} className="spin-icon" /> : 'Send OTP'}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTPAndReset}>
                    <div className="premium-form-group" style={{ marginBottom: '1rem', textAlign: 'left' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary-slate)', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'block' }}>OTP CODE FROM EMAIL</label>
                      <input 
                        type="text" 
                        value={otpToken}
                        onChange={(e) => setOtpToken(e.target.value)}
                        placeholder="6-Digit Code"
                        style={{ width: '100%', padding: '0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                        required 
                      />
                    </div>
                    <div className="premium-form-group" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary-slate)', letterSpacing: '0.5px', marginBottom: '0.5rem', display: 'block' }}>NEW PASSWORD</label>
                      <div className="input-with-icon-wrapper" style={{ position: 'relative' }}>
                        <input 
                          type={showNewPassword ? "text" : "password"} 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Min 8 characters"
                          style={{ width: '100%', padding: '0.85rem 2.8rem 0.85rem 1rem', border: '1px solid var(--border-color)', borderRadius: '6px', outline: 'none' }}
                          minLength={8}
                          required 
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', padding: 0 }}
                        >
                          {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={otpLoading}>
                      {otpLoading ? <Loader size={16} className="spin-icon" /> : 'Verify & Set Password'}
                    </button>
                    <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                      <button 
                        type="button" 
                        onClick={handleSendResetOTP} 
                        disabled={resendTimer > 0 || otpLoading}
                        style={{ background: 'none', border: 'none', color: resendTimer > 0 ? '#9ca3af' : 'var(--primary-color)', fontSize: '0.85rem', fontWeight: 600, cursor: resendTimer > 0 ? 'not-allowed' : 'pointer' }}
                      >
                        {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                      </button>
                    </div>
                  </form>
                )}

                <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                  <button type="button" onClick={() => { setForgotMode(false); setOtpSent(false); }} className="forgot-password-link" style={{ background: 'none', border: 'none', color: 'var(--secondary-slate)', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                    Back to Sign In
                  </button>
                </div>
              </>
            )}

            <div className="login-signup-prompt" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', marginBottom: '0.85rem' }}>Don't have an account?</p>
              <Link to="/membership" className="btn btn-secondary w-full text-center" style={{ display: 'block' }}>Become a Member</Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Calculate payment details
  const isPaid = memberData?.payment_status === 'paid';
  const isFlagged = memberData?.registration_status === 'rejected'; // 'rejected' represents flagged state
  let pricingText = '₦10,000';
  if (memberData?.category === 'business') pricingText = '₦20,000';
  if (memberData?.category === 'student') pricingText = '₦5,000';

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
              <h1>Welcome, {profileFirstName} {profileLastName}</h1>
              <p>
                {memberData?.category?.toUpperCase()} MEMBER • {memberData?.public_id || 'Pending ID'}
              </p>
            </div>
          </div>
          <button className="btn btn-secondary text-white" onClick={handleLogout}>Log Out</button>
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
          <BookOpen size={16} /> <span>Resources &amp; Certs</span>
        </button>
      </div>

      <section className="section-padding container">
        {activeTab === 'overview' && (
          <div className="portal-overview-tab">

            {/* ── FLAG ALERT BANNER (If flagged by Admin) ── */}
            {isFlagged && (
              <div className="portal-warning-box flagged-box" style={{ borderColor: '#dc2626', backgroundColor: '#fef2f2', marginBottom: '2rem' }}>
                <div className="warning-box-left" style={{ color: '#dc2626' }}>
                  <ShieldAlert size={28} />
                </div>
                <div className="warning-box-right">
                  <h3 style={{ color: '#991b1b' }}>Registration Flagged</h3>
                  <p style={{ color: '#7f1d1d' }}>
                    Your verification documents or form was flagged by the credentials board for the following reason:
                  </p>
                  <div className="flagged-reason-quote" style={{ margin: '0.75rem 0', padding: '0.75rem 1rem', background: '#ffffff', borderLeft: '3px solid #dc2626', borderRadius: '4px', fontStyle: 'italic', color: '#4b5563', fontSize: '0.88rem' }}>
                    "{memberData?.other_name || 'Invalid or expired document uploaded. Please re-upload matching files.'}"
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#991b1b', fontWeight: 600 }}>
                    Please update your records under "Edit Profile" or contact our registration officer at info@ibmssp.org.ng.
                  </p>
                </div>
              </div>
            )}

            {/* ── Payment Alert Box (If unpaid and not flagged) ── */}
            {!isPaid && !isFlagged && (
              <div className="portal-warning-box">
                <div className="warning-box-left">
                  <ShieldAlert size={28} />
                </div>
                <div className="warning-box-right">
                  <h3>Payment Pending</h3>
                  <p>
                    Your registration form is saved, but your one-time membership fee of <strong>{pricingText}</strong> is currently unpaid. Pay now via Paystack to unlock your training resources and printable certificates.
                  </p>
                  <button 
                    className="btn btn-primary btn-settle-payment" 
                    onClick={handlePaystackPayment} 
                    disabled={paymentProcessing}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    {paymentProcessing ? (
                      <>
                        <Loader size={16} className="spin-icon" />
                        <span>Processing Payment Gateway...</span>
                      </>
                    ) : (
                      <span>Complete Registration Payment</span>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* ── Active Success Box (If paid and approved) ── */}
            {isPaid && !isFlagged && (
              <div className="portal-warning-box success-box" style={{ borderColor: 'var(--primary-color)', backgroundColor: 'rgba(48, 88, 88, 0.05)' }}>
                <div className="warning-box-left" style={{ color: 'var(--primary-color)' }}>
                  <CheckCircle size={28} />
                </div>
                <div className="warning-box-right">
                  <h3 style={{ color: 'var(--primary-color)' }}>Account Activated</h3>
                  <p>
                    Thank you! Your transaction is complete and your practitioner portal is fully active. You now have unrestricted access to all standard templates and training certificates.
                  </p>
                  <button 
                    className="btn btn-secondary mt-3" 
                    onClick={downloadCertificate}
                    style={{display: 'inline-flex', alignItems: 'center', gap: '8px'}}
                  >
                    <Download size={16} /> Download Registration Certificate
                  </button>
                </div>
              </div>
            )}

            {/* Metrics cards */}
            <div className="portal-metrics" style={{ marginTop: '2.5rem' }}>
              <div className="metric-box">
                {isPaid ? <CheckCircle size={24} className="metric-icon green" /> : <Clock size={24} className="metric-icon gold" />}
                <h3>{isPaid ? 'Active' : 'Pending Payment'}</h3>
                <p>Account Status</p>
              </div>
              <div className="metric-box">
                <Award size={24} className="metric-icon blue" />
                <h3>{isPaid ? 'Maturity Access Granted' : 'Access Locked'}</h3>
                <p>QMS Maturity Assessment</p>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-dark)', fontSize: '1.25rem' }}>Edit Profile Information</h3>
                  <p style={{ margin: '0.25rem 0 0 0', color: 'var(--secondary-slate)', fontSize: '0.88rem' }}>Update your account details and category parameters below.</p>
                </div>
                <div style={{ background: 'var(--primary-color)', color: '#ffffff', padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {memberData?.category || 'General'} Member
                </div>
              </div>
              
              <form onSubmit={handleProfileSave} className="edit-profile-form">
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>1. Personal Information</h4>
                <div className="edit-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  <div className="form-group">
                    <label className="input-field-label">First Name</label>
                    <input 
                      type="text" 
                      value={profileFirstName} 
                      onChange={(e) => setProfileFirstName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-field-label">Last Name</label>
                    <input 
                      type="text" 
                      value={profileLastName} 
                      onChange={(e) => setProfileLastName(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-field-label">Other Name</label>
                    <input 
                      type="text" 
                      value={profileOtherName} 
                      onChange={(e) => setProfileOtherName(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-field-label">Contact Phone</label>
                    <input 
                      type="text" 
                      value={profilePhone} 
                      onChange={(e) => setProfilePhone(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-field-label">Office / Contact Address</label>
                    <input 
                      type="text" 
                      value={profileAddress} 
                      onChange={(e) => setProfileAddress(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-field-label">State</label>
                    <input 
                      type="text" 
                      value={profileState} 
                      onChange={(e) => setProfileState(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label className="input-field-label">Country</label>
                    <input 
                      type="text" 
                      value={profileCountry} 
                      onChange={(e) => setProfileCountry(e.target.value)} 
                    />
                  </div>
                </div>

                {/* ── 2. Category Specific Parameters ── */}
                <h4 style={{ color: 'var(--primary-color)', fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
                  2. {memberData?.category?.toUpperCase()} Category Details
                </h4>

                <div className="edit-form-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
                  {(memberData?.category || '').toLowerCase() === 'business' && (
                    <>
                      <div className="form-group">
                        <label className="input-field-label">Organization Name</label>
                        <input type="text" value={catOrgName} onChange={(e) => setCatOrgName(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">RC / CAC Number</label>
                        <input type="text" value={catRcNumber} onChange={(e) => setCatRcNumber(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Contact Person Name</label>
                        <input type="text" value={catContactPerson} onChange={(e) => setCatContactPerson(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Company Official Email</label>
                        <input type="email" value={catCompanyEmail} onChange={(e) => setCatCompanyEmail(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Company Official Phone</label>
                        <input type="tel" value={catCompanyPhone} onChange={(e) => setCatCompanyPhone(e.target.value)} />
                      </div>
                    </>
                  )}

                  {(memberData?.category || '').toLowerCase() === 'student' && (
                    <>
                      <div className="form-group">
                        <label className="input-field-label">Institution Name</label>
                        <input type="text" value={catInstitution} onChange={(e) => setCatInstitution(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Course of Study</label>
                        <input type="text" value={catCourse} onChange={(e) => setCatCourse(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Current Academic Level</label>
                        <input type="text" value={catLevel} onChange={(e) => setCatLevel(e.target.value)} placeholder="e.g. 400 Level" />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Matriculation Number</label>
                        <input type="text" value={catMatricNumber} onChange={(e) => setCatMatricNumber(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Expected Graduation Year</label>
                        <input type="number" value={catGraduationYear} onChange={(e) => setCatGraduationYear(e.target.value)} placeholder="e.g. 2026" />
                      </div>
                    </>
                  )}

                  {(memberData?.category || '').toLowerCase() === 'graduate' && (
                    <>
                      <div className="form-group">
                        <label className="input-field-label">Graduated Institution</label>
                        <input type="text" value={catInstitution} onChange={(e) => setCatInstitution(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Degree / Qualification</label>
                        <input type="text" value={catCourse} onChange={(e) => setCatCourse(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Graduation Year</label>
                        <input type="number" value={catGraduationYear} onChange={(e) => setCatGraduationYear(e.target.value)} placeholder="e.g. 2024" />
                      </div>
                    </>
                  )}

                  {((memberData?.category || '').toLowerCase() === 'individual' || (memberData?.category || '').toLowerCase() === 'professional') && (
                    <>
                      <div className="form-group">
                        <label className="input-field-label">Profession</label>
                        <input type="text" value={catProfession} onChange={(e) => setCatProfession(e.target.value)} required />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Specialization / Area of Expertise</label>
                        <input type="text" value={catSpecialization} onChange={(e) => setCatSpecialization(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Current Company / Employer</label>
                        <input type="text" value={catCurrentCompany} onChange={(e) => setCatCurrentCompany(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label className="input-field-label">Years of Experience</label>
                        <input type="number" value={catYearsExp} onChange={(e) => setCatYearsExp(e.target.value)} placeholder="e.g. 5" />
                      </div>
                    </>
                  )}
                </div>

                <button type="submit" className="btn btn-primary save-profile-btn" disabled={profileSaveLoading} style={{ padding: '0.85rem 1.75rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  {profileSaveLoading ? <Loader size={16} className="spin-icon" /> : <Save size={16} />}
                  <span>Save Profile Settings</span>
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
              <p>{isPaid ? 'Your official IBMSSP compliance certification is available for download.' : 'Complete your registration payment to activate and download your official compliance certification.'}</p>
              
              {isPaid ? (
                <a href={`https://rihltpxgyocqqjbspmrw.supabase.co/storage/v1/object/public/assets/certificates/SSP-${memberData?.public_id}.pdf`} target="_blank" rel="noopener noreferrer" className="btn btn-primary text-center" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Download size={16} /> Download Certificate
                </a>
              ) : (
                <button className="btn btn-primary" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                  <Download size={16} /> Download Certificate (Locked)
                </button>
              )}
            </div>

            {/* Exclusive Resources List */}
            <div className="portal-card resources-card">
              <div className="card-header">
                <BookOpen size={22} className="card-icon" />
                <h3>Exclusive Resources</h3>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', marginBottom: '1.5rem' }}>
                {isPaid ? 'You have unrestricted access to all our standard guides and audit worksheets.' : 'The resources below are locked until your payment is confirmed.'}
              </p>
              
              {isPaid ? (
                <ul className="resources-list-active" style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                    <FileText size={16} color="var(--primary-color)" />
                    <a href="https://rihltpxgyocqqjbspmrw.supabase.co/storage/v1/object/public/assets/docs/QMS-Audit-Checklist.pdf" download style={{ color: 'var(--text-color)', fontWeight: 600 }}>ISO 9001:2015 Audit Checklist.pdf</a>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', fontSize: '0.9rem' }}>
                    <FileText size={16} color="var(--primary-color)" />
                    <a href="https://rihltpxgyocqqjbspmrw.supabase.co/storage/v1/object/public/assets/docs/SME-Compliance-Guide.pdf" download style={{ color: 'var(--text-color)', fontWeight: 600 }}>SME Compliance Guide.pdf</a>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                    <FileText size={16} color="var(--primary-color)" />
                    <a href="https://rihltpxgyocqqjbspmrw.supabase.co/storage/v1/object/public/assets/docs/SSP-Codes-of-Ethics.pdf" download style={{ color: 'var(--text-color)', fontWeight: 600 }}>System Standard Codes of Ethics.pdf</a>
                  </li>
                </ul>
              ) : (
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
              )}
            </div>
          </div>
        )}
      </section>

      {/* Hidden Certificate Component */}
      <RegistrationCertificate memberData={memberData} certificateRef={certificateRef} />
    </div>
  );
}
