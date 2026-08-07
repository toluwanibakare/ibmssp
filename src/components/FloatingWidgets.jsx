import React, { useState, useEffect } from 'react';
import { ChevronUp, MessageSquare, X, Send } from 'lucide-react';
import './FloatingWidgets.css';

export default function FloatingWidgets() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello! Welcome to IBMSSP. How can we assist you today?' }
  ]);
  const [inputVal, setInputVal] = useState('');

  // Handle scroll progress and visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      if (currentScroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal;
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');

    // Simulated automated responses
    setTimeout(() => {
      let replyText = "Thank you for contacting IBMSSP. Our representative will get back to you shortly.";
      const lowerMsg = userMsg.toLowerCase();
      if (lowerMsg.includes('membership') || lowerMsg.includes('join')) {
        replyText = "We offer Corporate, Individual, and Student membership packages. You can explore them in our Membership page under the menu.";
      } else if (lowerMsg.includes('services') || lowerMsg.includes('iso')) {
        replyText = "IBMSSP provides ISO standards training, advisory services, auditing, and corporate workshops. Visit our Services page for details.";
      } else if (lowerMsg.includes('contact') || lowerMsg.includes('office')) {
        replyText = "Our main office is at 334 Ikorodu Road, Anthony/Maryland, Lagos. You can also call us on 08036706827.";
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: replyText }]);
    }, 1000);
  };

  // Math for progress ring
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* 1. Chatbot Widget (Bottom Left) */}
      <div className="chatbot-widget-container">
        {/* Chat Bubble Launcher */}
        <button 
          className={`chat-bubble-launcher ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open Chat"
        >
          {isChatOpen ? <X size={22} /> : <MessageSquare size={22} />}
        </button>

        {/* Chat Window Popup */}
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <div className="chat-title">
                <span className="online-indicator"></span>
                <div>
                  <h4>IBMSSP Helper</h4>
                  <span>Online Support</span>
                </div>
              </div>
              <button className="chat-close" onClick={() => setIsChatOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div className="chat-messages">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender}`}>
                  <div className="message-bubble">{msg.text}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-input-area">
              <input 
                type="text" 
                placeholder="Type a message..." 
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
              />
              <button type="submit" className="chat-send-btn">
                <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 2. Scroll-to-Top Button with Progress Ring (Bottom Right) */}
      <button 
        className={`scroll-to-top-progress ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="46" height="46" className="progress-ring">
          <circle 
            className="progress-ring-circle-bg"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="3"
            fill="transparent"
            r={radius}
            cx="23"
            cy="23"
          />
          <circle 
            className="progress-ring-circle"
            stroke="var(--primary-color)"
            strokeWidth="3"
            fill="transparent"
            r={radius}
            cx="23"
            cy="23"
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: strokeDashoffset
            }}
          />
        </svg>
        <div className="scroll-arrow">
          <ChevronUp size={18} />
        </div>
      </button>
    </>
  );
}
