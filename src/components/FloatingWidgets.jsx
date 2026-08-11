import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send, ChevronUp, RotateCcw } from 'lucide-react';
import IBMSSP_KNOWLEDGE_BASE from '../data/knowledgeBase';
import './FloatingWidgets.css';

const STORAGE_KEY = 'ibmssp_chat_history';
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL = 'llama-3.1-8b-instant';

const SYSTEM_PROMPT = `You are the official IBMSSP virtual assistant. Your name is "IBMSSP Assistant".

Your role is to help visitors to the IBMSSP website (ibmssp.org.ng) by answering questions clearly and helpfully based ONLY on the knowledge base provided below.

STRICT RULES you must always follow:
1. Only answer questions that can be answered from the knowledge base below. If a question is outside the knowledge base, politely say you do not have that information and direct them to contact support via email at info@ibmssp.org.ng or visit /contact.
2. Never make up information, invent fees, dates, names, or policies that are not in the knowledge base.
3. Tone: Friendly and professional, like a customer service representative. Warm but concise.
4. Do NOT use emojis.
5. Do NOT use double dashes (--).
6. Keep answers short and direct. Avoid lengthy paragraphs or excessive grammar.
7. When relevant, suggest the user visit a specific page on the site. Format page suggestions like this exactly: [PAGE:/path|Link Text] — for example: [PAGE:/membership|Visit Membership Page]
8. You may include up to two page suggestion links per response.
9. If the user wants to speak to a human or you cannot help, tell them a support representative will assist them and ask them to email info@ibmssp.org.ng or visit the contact page. Say this in a friendly and reassuring way.
10. Do not discuss topics unrelated to IBMSSP, ISO standards, quality management, or using the IBMSSP website.

KNOWLEDGE BASE:
${IBMSSP_KNOWLEDGE_BASE}`;

const INITIAL_MESSAGE = {
  role: 'assistant',
  text: 'Hello and welcome to IBMSSP. I am here to help you find information about our membership, services, assessments, and how to use the site. What can I help you with today?',
  links: []
};

const QUICK_ACTIONS = [
  { label: 'Membership Options', message: 'Tell me about membership categories' },
  { label: 'Our Services', message: 'What services does IBMSSP offer?' },
  { label: 'How to Register', message: 'How do I register or join IBMSSP?' },
  { label: 'Contact IBMSSP', message: 'How can I contact IBMSSP?' },
];

function parseLinks(text) {
  const linkRegex = /\[PAGE:([^\|]+)\|([^\]]+)\]/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(text)) !== null) {
    links.push({ path: match[1], label: match[2] });
  }
  const cleanText = text.replace(linkRegex, '').replace(/\s{2,}/g, ' ').trim();
  return { cleanText, links };
}

export default function FloatingWidgets() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [INITIAL_MESSAGE];
    } catch {
      return [INITIAL_MESSAGE];
    }
  });
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasError, setHasError] = useState(false);
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);

  // Persist messages to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Scroll logic: users go to bottom, bot responses align at their top
  useEffect(() => {
    const container = chatMessagesRef.current;
    if (!container || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];

    if (isTyping) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
      return;
    }

    if (lastMessage.role === 'user') {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    } else if (lastMessage.role === 'assistant') {
      // Give a tiny timeout for DOM to paint updated text
      setTimeout(() => {
        const messageElements = container.querySelectorAll('.chat-message');
        if (messageElements.length > 0) {
          const lastElement = messageElements[messageElements.length - 1];
          container.scrollTo({
            top: lastElement.offsetTop - 10,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isChatOpen]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) setScrollProgress((currentScroll / totalScroll) * 100);
      setIsVisible(currentScroll > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
    localStorage.removeItem(STORAGE_KEY);
    setHasError(false);
  };

  const sendMessage = async (userText) => {
    if (!userText.trim() || isTyping) return;

    const userMsg = { role: 'user', text: userText, links: [] };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInputVal('');
    setIsTyping(true);
    setHasError(false);

    // Build conversation history for Groq
    const history = updated
      .filter(m => m.role !== 'assistant' || m !== INITIAL_MESSAGE)
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

    try {
      if (!GROQ_API_KEY) throw new Error('API key not configured');

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history
          ],
          max_tokens: 400,
          temperature: 0.3,
        }),
      });

      if (!response.ok) throw new Error(`API error ${response.status}`);

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content || '';
      const { cleanText, links } = parseLinks(rawText);
      const sanitizedText = cleanText.replace(/--/g, '-').replace(/—/g, '-');

      setMessages(prev => [...prev, { role: 'assistant', text: sanitizedText, links }]);
    } catch (err) {
      setHasError(true);
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'I am having trouble connecting right now. Please try again in a moment or reach out to us directly at info@ibmssp.org.ng.',
        links: [{ path: '/contact', label: 'Visit Contact Page' }]
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputVal);
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* Chat Widget (Bottom Left) */}
      <div className="chatbot-widget-container">
        <button
          className={`chat-bubble-launcher ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open Chat"
        >
          {isChatOpen ? <X size={22} /> : <MessageSquare size={22} />}
        </button>

        <div className={`chat-window ${isChatOpen ? 'chat-window-open' : ''}`}>
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <span className="online-indicator"></span>
              <div>
                <h4>IBMSSP Assistant</h4>
                <span>Powered by AI</span>
              </div>
            </div>
            <div className="chat-header-actions">
              <button className="chat-clear-btn" onClick={clearChat} title="Clear chat" aria-label="Clear chat">
                <RotateCcw size={14} />
              </button>
              <button className="chat-close" onClick={() => setIsChatOpen(false)} aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.role}`}>
                {msg.role === 'assistant' && (
                  <div className="bot-avatar">
                    <span>I</span>
                  </div>
                )}
                <div className="message-content-wrap">
                  <div className="message-bubble">{msg.text}</div>
                  {msg.links && msg.links.length > 0 && (
                    <div className="message-link-buttons">
                      {msg.links.map((link, li) => (
                        <Link
                          key={li}
                          to={link.path}
                          className="chat-link-btn"
                          onClick={() => setIsChatOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message assistant">
                <div className="bot-avatar"><span>I</span></div>
                <div className="message-content-wrap">
                  <div className="message-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions (shown only when just opened / first message) */}
          {messages.length <= 1 && (
            <div className="chat-quick-actions">
              {QUICK_ACTIONS.map((qa, i) => (
                <button
                  key={i}
                  className="quick-action-btn"
                  onClick={() => sendMessage(qa.message)}
                  disabled={isTyping}
                >
                  {qa.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your question..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="chat-send-btn" disabled={isTyping || !inputVal.trim()} aria-label="Send">
              <Send size={16} />
            </button>
          </form>

          <div className="chat-footer-note">
            Questions outside our knowledge base will be escalated to a support rep.
          </div>
        </div>
      </div>

      {/* Scroll-to-Top Button with Progress Ring (Bottom Right) */}
      <button
        className={`scroll-to-top-progress ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <svg width="46" height="46" className="progress-ring">
          <circle className="progress-ring-circle-bg" stroke="rgba(0,0,0,0.06)" strokeWidth="3" fill="transparent" r={radius} cx="23" cy="23" />
          <circle
            className="progress-ring-circle"
            stroke="var(--primary-color)"
            strokeWidth="3"
            fill="transparent"
            r={radius}
            cx="23"
            cy="23"
            style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset }}
          />
        </svg>
        <div className="scroll-arrow"><ChevronUp size={18} /></div>
      </button>
    </>
  );
}
