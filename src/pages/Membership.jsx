import React, { useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Check, Building2, UserCheck, GraduationCap, ArrowRight, Loader, Eye, EyeOff } from 'lucide-react';
import { supabase, callEdgeFunction } from '../lib/supabase';
import './Membership.css';

const tiers = {
  business: {
    title: 'Corporate Membership',
    subtitle: 'For Business Organizations.',
    desc: 'These are business organizations already practicing ISO implementation and certification. They form the bulk of IBMSSP members.',
    bullets: [
      'Access to MSAT benchmarking dashboards',
      'Specialized ISO implementation support frameworks',
      'One-time free Annual Performance Assessment of QMS Maturity Level'
    ],
    price: '₦20,000 / One-Time',
    dbCategory: 'business'
  },
  individuals: {
    title: 'Individual Private Membership',
    subtitle: 'For ISO registered stakeholders.',
    desc: 'These are ISO registered stakeholders who have acquired evidence of training and experience in the implementation process of ISO practices either as trained individuals, Consultants, and Tutors.',
    bullets: [
      'Access to standard knowledge bases and research libraries',
      'Networking with industrial executives and standards leaders',
      'Eligibility to join facilitation panels'
    ],
    price: '₦10,000 / One-Time',
    dbCategory: 'individual'
  },
  graduates: {
    title: 'Graduate Membership',
    subtitle: 'For fresh graduates.',
    desc: 'For fresh graduates with interest to choose a career in the ISO business sector.',
    bullets: [
      'Mentorship alignment with industry compliance auditors',
      'Foundation workshops'
    ],
    price: '₦10,000 / One-Time',
    dbCategory: 'graduate'
  },
  students: {
    title: 'Student Membership',
    subtitle: 'For undergraduates.',
    desc: 'For undergraduates with interest to choose a career in the ISO business sector.',
    bullets: [
      'Introductory systems standards study guides',
      'Student chapter resources'
    ],
    price: '₦5,000 / One-Time',
    dbCategory: 'student'
  }
};

export default function Membership() {
  const { type } = useParams();
  const fileRef = useRef(null);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [fileName, setFileName] = React.useState('');
  const [fileObj, setFileObj] = React.useState(null);
  const [cacFileName, setCacFileName] = React.useState('');
  const [cacFileObj, setCacFileObj] = React.useState(null);
  const [individualCategory, setIndividualCategory] = React.useState('auditor');
  const [termsAccepted, setTermsAccepted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  // Business-specific
  const [orgName, setOrgName] = React.useState('');
  const [orgEmail, setOrgEmail] = React.useState('');
  const [orgPhone, setOrgPhone] = React.useState('');
  // Graduate-specific
  const [institution, setInstitution] = React.useState('');
  const [degree, setDegree] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [gradYear, setGradYear] = React.useState('');
  const [studyDuration, setStudyDuration] = React.useState('');
  // Student-specific
  const [school, setSchool] = React.useState('');
  const [studentCourse, setStudentCourse] = React.useState('');

  // ─── Supabase Registration Handler ───────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tier = tiers[activeType];

      // 1. Create Supabase Auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });

      if (authError) throw new Error(authError.message);

      // 2. Upload document file to Supabase Storage if provided
      let fileUrl = null;
      if (fileObj) {
        const ext = fileObj.name.split('.').pop();
        const path = `member-docs/${Date.now()}-${email.replace('@','_')}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('member-documents')
          .upload(path, fileObj, { upsert: false });
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('member-documents')
            .getPublicUrl(path);
          fileUrl = urlData?.publicUrl || null;
        }
      }

      // Upload CAC document if provided (for business members)
      let cacFileUrl = null;
      if (cacFileObj) {
        const ext = cacFileObj.name.split('.').pop();
        const path = `member-docs/${Date.now()}-cac-${email.replace('@','_')}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('member-documents')
          .upload(path, cacFileObj, { upsert: false });
        if (!uploadError) {
          const { data: urlData } = supabase.storage
            .from('member-documents')
            .getPublicUrl(path);
          cacFileUrl = urlData?.publicUrl || null;
        }
      }

      // 3. Parse first/last name
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      // 4. Insert into members table
      const { data: memberData, error: memberError } = await supabase
        .from('members')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone,
          category: tier.dbCategory,
          payment_status: 'pending',
          registration_status: 'pending',
        })
        .select()
        .single();

      if (memberError) throw new Error(memberError.message);
      const memberId = memberData.member_id;

      // 5. Insert category-specific detail record
      if (activeType === 'business') {
        await supabase.from('organization_details').insert({
          member_id: memberId,
          organization_name: orgName,
          company_email: orgEmail,
          company_phone: orgPhone,
          company_certificate_file: fileUrl,
          cac_document_file: cacFileUrl,
        });
      } else if (activeType === 'individuals') {
        await supabase.from('professional_details').insert({
          member_id: memberId,
          profession: individualCategory === 'auditor' ? 'Trained Auditor' : 'Registered Consultant',
          professional_certifications: individualCategory,
          cv_file: fileUrl,
        });
      } else if (activeType === 'graduates') {
        await supabase.from('graduate_details').insert({
          member_id: memberId,
          institution,
          qualification: degree,
          graduation_year: parseInt(gradYear) || 0,
          study_duration: studyDuration,
          certificate_file: fileUrl,
        });
      } else if (activeType === 'students') {
        // Students use graduate_details table with minimal fields
        await supabase.from('graduate_details').insert({
          member_id: memberId,
          institution: school,
          qualification: studentCourse,
          graduation_year: 0,
          cv_file: fileUrl,
        });
      }

      // 6. Log the activity
      await supabase.from('activity_logs').insert({
        action: 'member_registered',
        description: `New ${tier.dbCategory} member registered: ${email}`,
        member_id: memberId,
        performed_by: 'self-registration',
      });

      // 7. Send welcome registration email
      await callEdgeFunction('send-email', {
        type: 'registration',
        to: email,
        name: fullName.trim() || 'Member',
        memberId: memberData?.public_id || memberId,
      });

      setSubmitted(true);

    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ─── Membership Landing (no type selected) ───────────────────────────────
  if (!type) {
    return (
      <div className="membership-page">
        <section className="page-hero">
          <div className="container">
            <h1>Membership</h1>
            <p>Join a network dedicated to business standardizations and sustainability</p>
          </div>
        </section>

        {/* 1. Membership Structure Section */}
        <section className="section-padding container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-tag-underlined">Overview</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Membership Structure</h2>
          </div>

          <div className="structure-grid">
            <div className="structure-col">
              <div className="structure-icon-box">
                <Building2 size={24} color="#ffffff" />
              </div>
              <h3>Business Organizations</h3>
              <p>ISO-certified companies seeking standardization and operational maturity benchmarking.</p>
            </div>
            <div className="structure-col">
              <div className="structure-icon-box">
                <UserCheck size={24} color="#ffffff" />
              </div>
              <h3>Individual Practitioners</h3>
              <p>Certified ISO auditors, consultants, and QMS trainers seeking professional recognition.</p>
            </div>
            <div className="structure-col">
              <div className="structure-icon-box">
                <GraduationCap size={24} color="#ffffff" />
              </div>
              <h3>Graduates & Students</h3>
              <p>Fresh graduates and undergraduates building careers in quality management and ISO standards.</p>
            </div>
          </div>
        </section>

        {/* 2. Pricing Cards Section */}
        <section className="section-padding container">
          <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
            <span className="section-tag-underlined">Pricing</span>
            <h2 className="section-title-large" style={{ color: 'var(--text-color)', marginTop: '0.75rem' }}>Pick a Membership Tier</h2>
          </div>

          {/* Row 1: 2 Tall Cards */}
          <div className="pricing-top-row">
            <div className="pricing-card-tall">
              <div className="pricing-card-badge">For Organizations</div>
              <div className="pricing-card-content">
                <h3>Corporate Membership</h3>
                <div className="price-label">
                  <strong>20k</strong> <span>/ One-Time</span>
                </div>
                <p>For business organizations already practicing ISO implementation and certification.</p>
                <Link to="/membership/business" className="btn-get-started">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="pricing-card-tall">
              <div className="pricing-card-badge">For Individuals</div>
              <div className="pricing-card-content">
                <h3>Individual Private Membership</h3>
                <div className="price-label">
                  <strong>10k</strong> <span>/ One-Time</span>
                </div>
                <p>For ISO registered stakeholders who have acquired evidence of training and experience in the implementation process of ISO practices either as a trained Individuals, Consultants or Tutors.</p>
                <Link to="/membership/individuals" className="btn-get-started">
                  Get Started <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Row 2: 2 Horizontal Cards */}
          <div className="pricing-bottom-row">
            <div className="pricing-card-horizontal">
              <div className="pricing-left-price">
                <strong>10k</strong>
                <span>One-Time</span>
              </div>
              <div className="pricing-right-info">
                <div className="pricing-right-default">
                  <h3>Graduate Membership</h3>
                  <p>For fresh graduates with interest to choose a career in the ISO business sector.</p>
                </div>
                <div className="pricing-right-hover">
                  <p className="subscribe-prompt">Click on the button below to subscribe</p>
                  <Link to="/membership/graduates" className="btn btn-primary pill-btn">Get Started</Link>
                </div>
              </div>
            </div>

            <div className="pricing-card-horizontal">
              <div className="pricing-left-price">
                <strong>5k</strong>
                <span>One-Time</span>
              </div>
              <div className="pricing-right-info">
                <div className="pricing-right-default">
                  <h3>Student Membership</h3>
                  <p>For undergraduates with interest to choose a career in the ISO business sector.</p>
                </div>
                <div className="pricing-right-hover">
                  <p className="subscribe-prompt">Click on the button below to subscribe</p>
                  <Link to="/membership/students" className="btn btn-primary pill-btn">Get Started</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─── Individual Tier Form ─────────────────────────────────────────────────
  const activeType = Object.keys(tiers).includes(type) ? type : 'business';
  const tier = tiers[activeType];

  return (
    <div className="membership-page">
      <section className="page-hero">
        <div className="container">
          <h1>Membership Tiers</h1>
          <p>Join a network dedicated to business standardizations and sustainability</p>
        </div>
      </section>

      <section className="section-padding container">
        <div className="membership-tabs">
          <Link to="/membership/business" className={`tab-btn ${activeType === 'business' ? 'active' : ''}`}>Business</Link>
          <Link to="/membership/individuals" className={`tab-btn ${activeType === 'individuals' ? 'active' : ''}`}>Individual</Link>
          <Link to="/membership/graduates" className={`tab-btn ${activeType === 'graduates' ? 'active' : ''}`}>Graduates</Link>
          <Link to="/membership/students" className={`tab-btn ${activeType === 'students' ? 'active' : ''}`}>Students</Link>
        </div>

        <div className="grid-2 membership-grid">
          <div className="membership-details">
            <span className="section-tag">MEMBERSHIP CATEGORY</span>
            <h2>{tier.title}</h2>
            <p className="tier-subtitle">{tier.subtitle}</p>
            <p className="tier-desc">{tier.desc}</p>
            <ul className="tier-bullets">
              {tier.bullets.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>

          <div className="membership-card-box">
            <div className="price-card">
              <h4>Annual Registration</h4>
              <div className="price-tag">{tier.price}</div>
              <p>Get listed, access resources, and join standardisation workshops immediately.</p>

              <div className="registration-form">
                {!submitted ? (
                  <>
                    <h3>Apply for Membership</h3>
                    {error && (
                      <div className="form-error-banner">
                        {error}
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>

                      {/* ── Shared Login Credentials ── */}
                      <input type="email" placeholder="Login Email" value={email} onChange={e => setEmail(e.target.value)} required />
                      <div className="input-with-icon-wrapper" style={{ position: 'relative', width: '100%', marginBottom: '1rem' }}>
                        <input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="Password (min 8 characters)" 
                          value={password} 
                          onChange={e => setPassword(e.target.value)} 
                          minLength={8} 
                          style={{ width: '100%', paddingRight: '2.8rem' }}
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

                      {/* ── BUSINESS fields ── */}
                      {activeType === 'business' && (
                        <>
                          <input type="text" placeholder="Contact Person Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                          <input type="tel" placeholder="Contact Person Phone" value={phone} onChange={e => setPhone(e.target.value)} required />
                          <input type="text" placeholder="Organization Name" value={orgName} onChange={e => setOrgName(e.target.value)} required />
                          <input type="email" placeholder="Organization Contact Email" value={orgEmail} onChange={e => setOrgEmail(e.target.value)} required />
                          <input type="tel" placeholder="Organization Phone Number" value={orgPhone} onChange={e => setOrgPhone(e.target.value)} required />
                          <div className="file-upload-container">
                            <label className="file-upload-label">
                              <span>{fileName || 'Upload ISO Certificate / Proof'}</span>
                              <input
                                ref={fileRef}
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => {
                                  const f = e.target.files[0];
                                  setFileObj(f || null);
                                  setFileName(f ? f.name : '');
                                }}
                                required
                              />
                            </label>
                          </div>
                        </>
                      )}

                      {/* ── INDIVIDUAL fields ── */}
                      {activeType === 'individuals' && (
                        <>
                          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                          <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
                          <div className="form-group">
                            <label className="input-field-label">Select Your Category</label>
                            <select value={individualCategory} onChange={(e) => setIndividualCategory(e.target.value)} className="form-select" required>
                              <option value="auditor">Trained Auditors</option>
                              <option value="consultant">Registered Consultants</option>
                            </select>
                          </div>
                          <div className="file-upload-container">
                            <label className="input-field-label" style={{ display: 'block', textAlign: 'left', marginBottom: '0.25rem' }}>Document Upload</label>
                            <p className="file-upload-subtext">Please upload a copy of your ISO-related document (PDF, DOC, DOCX, JPG, PNG, JPEG — Maximum size: 5MB).</p>
                            <label className="file-upload-label">
                              <span>{fileName || 'Upload ISO-related document'}</span>
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                onChange={(e) => {
                                  const f = e.target.files[0];
                                  setFileObj(f || null);
                                  setFileName(f ? f.name : '');
                                }}
                                required
                              />
                            </label>
                          </div>
                          <div className="notice-box">
                            <strong>Important Notice:</strong> Ensure that the document provided corresponds correctly with the category selected above.
                          </div>
                        </>
                      )}

                      {/* ── GRADUATE fields ── */}
                      {activeType === 'graduates' && (
                        <>
                          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                          <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
                          <input type="text" placeholder="Name of Institution" value={institution} onChange={e => setInstitution(e.target.value)} required />
                          <input type="text" placeholder="Degree Obtained" value={degree} onChange={e => setDegree(e.target.value)} required />
                          <input type="text" placeholder="Course of Study" value={course} onChange={e => setCourse(e.target.value)} required />
                          <input type="text" placeholder="Year of Graduation (e.g. 2022)" value={gradYear} onChange={e => setGradYear(e.target.value)} required />
                          <input type="text" placeholder="Duration of Study (e.g. 4 years)" value={studyDuration} onChange={e => setStudyDuration(e.target.value)} required />
                          <div className="file-upload-container">
                            <label className="input-field-label" style={{ display: 'block', textAlign: 'left', marginBottom: '0.25rem' }}>Upload Certificate</label>
                            <label className="file-upload-label">
                              <span>{fileName || 'No file chosen'}</span>
                              <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                                onChange={(e) => {
                                  const f = e.target.files[0];
                                  setFileObj(f || null);
                                  setFileName(f ? f.name : '');
                                }}
                                required
                              />
                            </label>
                          </div>
                        </>
                      )}

                      {/* ── STUDENT fields ── */}
                      {activeType === 'students' && (
                        <>
                          <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
                          <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
                          <input type="text" placeholder="Name of School" value={school} onChange={e => setSchool(e.target.value)} required />
                          <input type="text" placeholder="Course of Study" value={studentCourse} onChange={e => setStudentCourse(e.target.value)} required />
                          <div className="file-upload-container">
                            <label className="input-field-label" style={{ display: 'block', textAlign: 'left', marginBottom: '0.25rem' }}>Upload Student ID Verification</label>
                            <label className="file-upload-label">
                              <span>{fileName || 'No file chosen'}</span>
                              <input
                                type="file"
                                accept=".pdf,.png,.jpg,.jpeg"
                                onChange={(e) => {
                                  const f = e.target.files[0];
                                  setFileObj(f || null);
                                  setFileName(f ? f.name : '');
                                }}
                                required
                              />
                            </label>
                          </div>
                        </>
                      )}

                      {/* ── Terms ── */}
                      <div className="form-checkbox-row">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={termsAccepted}
                          onChange={(e) => setTermsAccepted(e.target.checked)}
                          required
                        />
                        <label htmlFor="terms">
                          I accept the <Link to="/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Terms &amp; Conditions</Link> and <Link to="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>Privacy Policy</Link>
                        </label>
                      </div>

                      <div className="form-checkbox-row">
                        <input type="checkbox" id="newsletter" />
                        <label htmlFor="newsletter">Subscribe to newsletter &amp; updates</label>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                        style={{ marginTop: '0.5rem' }}
                        disabled={!termsAccepted || loading}
                      >
                        {loading ? (
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Loader size={16} className="spin-icon" /> Submitting...
                          </span>
                        ) : 'Upload & Sign Up'}
                      </button>

                      <p style={{ fontSize: '0.78rem', color: 'var(--secondary-slate)', textAlign: 'center', marginTop: '0.75rem' }}>
                        Already have an account? <Link to="/account" style={{ color: 'var(--primary-color)', fontWeight: 700 }}>Log in</Link>
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="application-success-view" style={{ textAlign: 'center', padding: '1rem 0' }}>
                    <div className="success-icon-wrapper" style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'rgba(48, 88, 88, 0.1)', borderRadius: '50%', color: 'var(--primary-color)', marginBottom: '1.25rem' }}>
                      <Check size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-color)', marginBottom: '1rem' }}>Application Submitted!</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--secondary-slate)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                      Thank you for applying. Please check your email to confirm your account, then log in to view your dashboard and complete your payment.
                    </p>
                    <div className="next-steps-box" style={{ backgroundColor: 'var(--bg-offset)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '1.25rem', textAlign: 'left', marginBottom: '1.5rem' }}>
                      <strong style={{ fontSize: '0.82rem', textTransform: 'uppercase', color: 'var(--primary-color)', display: 'block', marginBottom: '0.65rem', letterSpacing: '0.5px' }}>Next Steps:</strong>
                      <ol style={{ paddingLeft: '1.15rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.8rem', color: 'var(--text-color)', lineHeight: '1.45' }}>
                        <li>Check your email inbox (and spam folder) and click the confirmation link.</li>
                        <li>Log in to your <strong>Account</strong> page to view your application status.</li>
                        <li>You will see a <strong>"Payment Pending"</strong> status on your dashboard until payment is confirmed.</li>
                        <li>If there are any issues with your verification documents, our board will contact you directly via email.</li>
                      </ol>
                    </div>
                    <Link to="/account" className="btn btn-primary w-full text-center">Go to My Account</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
