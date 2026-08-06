import React from 'react';
import './Insights.css';

const posts = [
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
    title: 'Preparing for ISO Audits: A Clean Framework',
    date: 'June 15, 2026',
    excerpt: 'A practical, step-by-step checklist to organize internal documentation, align team leaders, and pass management systems inspections seamlessly.'
  }
];

export default function Insights() {
  return (
    <div className="insights-page">
      <section className="page-hero">
        <div className="container">
          <h1>Insights & News</h1>
          <p>Read the latest research findings, market updates, and standards guidelines</p>
        </div>
      </section>

      <section className="section-padding container">
        <div className="grid-3 insights-grid">
          {posts.map((post, index) => (
            <div key={index} className="post-card">
              <span className="post-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <button className="post-link" onClick={() => alert('Article details arriving soon!')}>Read Article →</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
