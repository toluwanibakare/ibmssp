import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Send, User, Calendar, MessageSquare, Phone, Mail } from 'lucide-react';
import './Insights.css';

const otherPosts = [
  {
    title: 'Adopting Globally Recognized Standards in SMEs',
    date: 'August 5, 2026',
    excerpt: 'How local organizations can streamline operational bottlenecks, improve internal credibility, and unlock international markets by adopting management systems standards.'
  },
  {
    title: 'The Role of Multi-Stakeholder Partnerships',
    date: 'July 28, 2026',
    excerpt: 'Standards compliance thrives on collective accountability. Explore why network collaboration is the cornerstone of sustainable corporate governance.'
  },
  {
    title: 'Preparing for ISO Audits: A Clean Checklist',
    date: 'June 15, 2026',
    excerpt: 'A practical, step-by-step checklist to organize internal documentation, align team leaders, and pass management systems inspections seamlessly.'
  }
];

export default function Insights() {
  const [likes, setLikes] = useState(148);
  const [hasLiked, setHasLiked] = useState(false);
  const [comments, setComments] = useState([
    {
      name: 'Dr. Evelyn Peters',
      date: 'September 15, 2025',
      content: 'This revision is a welcome improvement. The focus on Ethics and Integrity in Leadership addresses a critical gap in organizational standardization implementations.'
    },
    {
      name: 'Chinedu Okeke',
      date: 'November 22, 2025',
      content: 'The alignment with Industry 4.0 and digital transformation is crucial for tech companies trying to maintain compliance while staying agile.'
    },
    {
      name: 'Sarah Jenkins',
      date: 'February 5, 2026',
      content: 'Extremely detailed analysis! Proactive risk strategies will save companies lots of compliance auditing hours.'
    }
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
    } else {
      setLikes(likes - 1);
      setHasLiked(false);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString('en-US', options);

    setComments([
      ...comments,
      {
        name: newCommentName,
        date: today,
        content: newCommentText
      }
    ]);
    setNewCommentName('');
    setNewCommentText('');
  };

  return (
    <div className="insights-page">
      <section className="page-hero">
        <div className="container">
          <h1>Insights & News</h1>
          <p>Read the latest research findings, market updates, and standards guidelines</p>
          <div className="breadcrumb" style={{ marginTop: '1.25rem', marginBottom: 0 }}>
            <Link to="/">Home</Link> <ChevronRight size={14} className="breadcrumb-separator" /> <span>Insights</span>
          </div>
        </div>
      </section>

      <section className="section-padding container">
        <div className="insights-detail-layout">
          {/* Main Content Column: Full Blog Post */}
          <article className="blog-post-content">
            <span className="blog-category-tag">ISO STANDARDS UPDATE</span>
            <h1 className="blog-title-main">Changes in ISO 9001:2026 Standards</h1>
            
            <div className="blog-meta-bar">
              <span className="blog-meta-item"><Calendar size={14} /> August 11, 2026</span>
              <span className="blog-meta-item"><User size={14} /> Written by standards Board</span>
              <span className="blog-meta-item"><MessageSquare size={14} /> {comments.length} Comments</span>
            </div>

            {/* Featured Blog Image */}
            <div 
              className="blog-featured-image" 
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80')" }}
            />

            <div className="blog-body-text">
              <p className="blog-lead-text">
                The upcoming ISO 9001:2026 revision introduces several significant changes aimed at keeping the quality management standard relevant for modern business environments. Key expected changes include:
              </p>

              <div className="blog-section-list">
                <div className="blog-point-item">
                  <h3>1. Integration of Ethics and Integrity in Leadership</h3>
                  <p>There will be a stronger focus on embedding ethics and integrity within leadership roles, highlighting these as foundational to effective quality management.</p>
                </div>

                <div className="blog-point-item">
                  <h3>2. Enhanced Risk Management</h3>
                  <p>The revision emphasizes proactive risk strategies, including clearer guidance on identifying, assessing, and managing risks separately from opportunities. This aims to help organizations address threats and leverage chances more effectively.</p>
                </div>

                <div className="blog-point-item">
                  <h3>3. Greater Stakeholder Engagement</h3>
                  <p>Businesses will be expected to involve a wider range of stakeholders—customers, employees, suppliers, and the community—in decision-making processes, ensuring their perspectives are central.</p>
                </div>

                <div className="blog-point-item">
                  <h3>4. Digital Transformation and Industry 4.0 Alignment</h3>
                  <p>The standard will incorporate elements of digital technologies like AI, IoT, and big data analytics. Organizations will need to adapt their quality management systems to leverage these tools for better performance and data accuracy.</p>
                </div>

                <div className="blog-point-item">
                  <h3>5. Increased Focus on Sustainability and Social Responsibility</h3>
                  <p>More explicit requirements will mandate that organizations demonstrate environmental stewardship, social accountability, ethical supply chains, and greener operational practices.</p>
                </div>

                <div className="blog-point-item">
                  <h3>6. Flexibility and Simplification</h3>
                  <p>The new ISO 9001 aims to be more adaptable and easier to implement across different sectors and organization sizes, potentially reducing overly complex documentation and streamlining processes.</p>
                </div>

                <div className="blog-point-item">
                  <h3>7. Improved Alignment with Other Management Systems</h3>
                  <p>Editorial changes will better align ISO 9001 with related standards like ISO 14001 (Environmental Management) and ISO 45001 (Occupational Health and Safety) to foster integrated management approaches.</p>
                </div>

                <div className="blog-point-item">
                  <h3>8. Inclusion of Emerging Technologies</h3>
                  <p>There will be requirements to validate software used in quality monitoring and measurement and address the impact of emerging technologies on quality practices.</p>
                </div>

                <div className="blog-point-item">
                  <h3>9. Expanded Concept of Customer Experience</h3>
                  <p>The standard is expected to evolve from focusing solely on customer satisfaction to a broader understanding of the entire customer experience.</p>
                </div>
              </div>

              <p className="blog-closing-text">
                Publication of ISO 9001:2026 is planned for September 2026, with a transition period likely allowing certified organizations a few years to adapt to the new requirements.
              </p>

              <p className="blog-closing-text">
                These changes reflect the growing importance of sustainability, digital innovation, ethics, and risk management in quality management systems, helping organizations maintain competitiveness and compliance in an evolving global landscape.
              </p>
            </div>

            {/* Interactive Likes Widget */}
            <div className="blog-likes-container">
              <button 
                className={`like-action-btn ${hasLiked ? 'liked' : ''}`}
                onClick={handleLike}
                aria-label="Like post"
              >
                <Heart size={20} fill={hasLiked ? 'var(--rust-red)' : 'none'} color={hasLiked ? 'var(--rust-red)' : 'currentColor'} />
                <span>{likes} {likes === 1 ? 'Like' : 'Likes'}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="blog-comments-section">
              <h3>Discussion ({comments.length})</h3>
              
              <ul className="comments-list">
                {comments.map((c, idx) => (
                  <li key={idx} className="comment-item">
                    <div className="comment-header">
                      <div className="comment-avatar">
                        <User size={16} color="var(--primary-color)" />
                      </div>
                      <div className="comment-meta">
                        <h4>{c.name}</h4>
                        <span>{c.date}</span>
                      </div>
                    </div>
                    <p className="comment-body">{c.content}</p>
                  </li>
                ))}
              </ul>

              {/* Comment submission form */}
              <div className="add-comment-box">
                <h4>Leave a Comment</h4>
                <form onSubmit={handleCommentSubmit}>
                  <div className="form-group-row">
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      value={newCommentName}
                      onChange={(e) => setNewCommentName(e.target.value)}
                      required 
                    />
                  </div>
                  <textarea 
                    placeholder="Write your comment here..." 
                    rows={4}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    required
                  ></textarea>
                  <button type="submit" className="btn btn-primary btn-submit-comment">
                    <Send size={14} /> <span>Post Comment</span>
                  </button>
                </form>
              </div>
            </div>
          </article>

          {/* Sidebar Column */}
          <aside className="insights-sidebar">
            {/* Contact / Have Questions form */}
            <div className="sidebar-contact-form-widget">
              <h3>Have Questions?</h3>
              <p>Submit your questions regarding the upcoming ISO 9001:2026 changes.</p>
              
              <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); e.target.reset(); }}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
                <textarea placeholder="Write your question..." rows={3} required></textarea>
                <button type="submit" className="btn btn-primary w-full">Ask a Standards Expert</button>
              </form>

              <div className="widget-quick-details">
                <span className="detail-title">Quick Contacts</span>
                <a href="tel:+23408035706827" className="detail-link"><Phone size={12} /> (+234) 08035706827</a>
                <a href="mailto:admin@ibmssp.org" className="detail-link"><Mail size={12} /> admin@ibmssp.org</a>
              </div>
            </div>

            {/* Recommended Posts list */}
            <div className="sidebar-recommended-widget">
              <h3>Recommended Reading</h3>
              <ul className="recommended-list">
                {otherPosts.map((post, idx) => (
                  <li key={idx} className="recommended-item">
                    <span className="rec-date">{post.date}</span>
                    <h4>{post.title}</h4>
                    <p>{post.excerpt.slice(0, 80)}...</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
