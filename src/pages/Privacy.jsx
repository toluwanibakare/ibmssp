import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './Legal.css';

export default function Privacy() {
  return (
    <div className="legal-page">
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>How we collect, use, and protect your personal information</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Privacy Policy</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="legal-content-wrap">

          <aside className="legal-toc">
            <h4>Contents</h4>
            <ul>
              <li><a href="#collection">Information We Collect</a></li>
              <li><a href="#use">Use of Your Information</a></li>
              <li><a href="#sharing">Sharing Your Information</a></li>
              <li><a href="#transfer">Transfer of Data</a></li>
              <li><a href="#disclosure">Disclosure of Data</a></li>
              <li><a href="#cookies">Cookies &amp; Tracking</a></li>
              <li><a href="#security">Security Measures</a></li>
              <li><a href="#thirdparty">Third-Party Links</a></li>
              <li><a href="#retention">Data Retention</a></li>
              <li><a href="#children">Children's Privacy</a></li>
              <li><a href="#changes">Changes to Policy</a></li>
            </ul>
            <div className="legal-toc-updated">
              <span>Last Updated</span>
              <strong>2024</strong>
            </div>
          </aside>

          <div className="legal-body">

            <div id="collection" className="legal-section">
              <h2>1. Information We Collect</h2>
              <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
              <p><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This includes but is not limited to: email address, first name and last name, phone number, address, state, province, ZIP / Postal code, city, and cookies and usage data.</p>
              <p><strong>Usage Data:</strong> We may also collect information on how the Service is accessed and used ("Usage Data"). This may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, and time spent on those pages.</p>
            </div>

            <div id="use" className="legal-section">
              <h2>2. Use of Your Information</h2>
              <p>IBMSSP uses the collected data for various purposes:</p>
              <ul className="legal-list">
                <li>To provide and maintain the Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer care and support</li>
                <li>To provide analysis or valuable information so that we can improve the Service</li>
                <li>To monitor the usage of the Service</li>
                <li>To detect, prevent and address technical issues</li>
              </ul>
            </div>

            <div id="sharing" className="legal-section">
              <h2>3. Sharing Your Information</h2>
              <p>We may also share your information with third parties where we outsource certain functions, including but not limited to our payroll and logistics functions, assessment service providers, membership retention and engagement functions and other service products that we use. We would do this, for the effective performance of your membership contract with us, and for our legitimate interests, such as the effective financial and business management.</p>
              <p>We may also disclose Personal Information to establish, exercise or defend our legal rights including providing information to others and/or in connection with any ongoing or prospective legal proceedings.</p>
              <p className="legal-highlight"><strong>We never sell any of your Personal Information to third parties.</strong></p>
            </div>

            <div id="transfer" className="legal-section">
              <h2>4. Transfer of Your Personal Data</h2>
              <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
              <p>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. IBMSSP will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy.</p>
            </div>

            <div id="disclosure" className="legal-section">
              <h2>5. Disclosure of Your Personal Data</h2>
              <p><strong>Business Transactions:</strong> If IBMSSP is involved in a merger, acquisition or asset sale, your Personal Data may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.</p>
              <p><strong>Law Enforcement:</strong> Under certain circumstances, IBMSSP may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).</p>
              <p><strong>Other Legal Requirements:</strong> IBMSSP may disclose your Personal Data in the good faith belief that such action is necessary to comply with a legal obligation, protect and defend the rights or property of IBMSSP, prevent or investigate possible wrongdoing in connection with the Service, protect the personal safety of users of the Service or the public, or protect against legal liability.</p>
            </div>

            <div id="cookies" className="legal-section">
              <h2>6. Cookies and Tracking</h2>
              <p>We use Cookies and similar tracking technologies to track the activity on our Service and store certain information. Types of cookies we use include:</p>
              <ul className="legal-list">
                <li><strong>Analytical cookies</strong> — Allow us to recognize and count visitors and see how visitors move around the Website when they are using it.</li>
                <li><strong>Strictly necessary cookies</strong> — Required for the operation of our Website, including login sessions and e-billing services.</li>
                <li><strong>Functionality cookies</strong> — Used to recognize you when you return to our Website, enabling us to personalise our content.</li>
                <li><strong>Targeting cookies</strong> — Record your visit to our Website, the pages you have visited and the links you have followed to make advertising more relevant to your interests.</li>
              </ul>
              <p>You may block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you block all cookies you may not be able to access all or parts of the Website.</p>
            </div>

            <div id="security" className="legal-section">
              <h2>7. Security Measures</h2>
              <p>The security of your Personal Data is important to us. IBMSSP implements reasonable physical, administrative and technical safeguards to help us protect your personal information from unauthorized access, use and disclosure. For example, we encrypt certain sensitive personal information such as credit card information when we transmit such information over the Internet.</p>
              <p>Remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>
            </div>

            <div id="thirdparty" className="legal-section">
              <h2>8. Third-Party Links</h2>
              <p>Our Service may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third-party sites or services.</p>
            </div>

            <div id="retention" className="legal-section">
              <h2>9. Retention of Your Personal Data</h2>
              <p>IBMSSP will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.</p>
            </div>

            <div id="children" className="legal-section">
              <h2>10. Children's Privacy</h2>
              <p>Our Service does not address anyone under the age of 18. We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, please contact us immediately.</p>
            </div>

            <div id="changes" className="legal-section">
              <h2>11. Changes to This Privacy Policy</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.</p>
            </div>

            <div className="legal-footer-note">
              <p>If you have any questions about this Privacy Policy, contact us at: <a href="mailto:info@ibmssp.org.ng">info@ibmssp.org.ng</a></p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
