import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, X, Send, ChevronUp, RotateCcw, Headset, User, Bot } from 'lucide-react';
import IBMSSP_KNOWLEDGE_BASE from '../data/knowledgeBase';
import { supabase, callEdgeFunction } from '../lib/supabase';
import './FloatingWidgets.css';

const SESSION_KEY = 'ibmssp_chat_session_id';
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
  role: 'bot',
  content: 'Hello and welcome to IBMSSP. I am here to help you find information about our membership, services, assessments, and how to use the site. What can I help you with today?',
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
  
  const [chatId, setChatId] = useState(null); // The uuid from live_chats
  const [chatStatus, setChatStatus] = useState('bot');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll tracking
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

  // Initialize chat session
  useEffect(() => {
    async function initChat() {
      let currentSession = localStorage.getItem(SESSION_KEY);
      if (!currentSession) {
        currentSession = crypto.randomUUID();
        localStorage.setItem(SESSION_KEY, currentSession);
      }
      setSessionId(currentSession);

      // Check if session exists in DB
      let { data: existingChat } = await supabase
        .from('live_chats')
        .select('*')
        .eq('session_id', currentSession)
        .maybeSingle();

      if (!existingChat) {
        const { data: newChat } = await supabase
          .from('live_chats')
          .insert([{ session_id: currentSession }])
          .select()
          .single();
        existingChat = newChat;
      }
      
      if (existingChat) {
        setChatId(existingChat.id);
        setChatStatus(existingChat.status);
        
        // Fetch existing messages
        const { data: existingMsgs } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('chat_id', existingChat.id)
          .order('created_at', { ascending: true });
          
        if (existingMsgs && existingMsgs.length > 0) {
          setMessages(existingMsgs);
        } else {
          // If no messages, insert initial message
          await insertMessage('bot', INITIAL_MESSAGE.content, existingChat.id);
        }
      }
    }
    
    if (isChatOpen && !chatId) {
      initChat();
    }
  }, [isChatOpen, chatId]);

  // Subscribe to real-time messages (Admin replies) and status updates
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase.channel(`chat_${chatId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `chat_id=eq.${chatId}` }, payload => {
        // Only append if it's not our own message (which we add optimistically)
        setMessages(prev => {
          if (prev.find(m => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'live_chats', filter: `id=eq.${chatId}` }, payload => {
        setChatStatus(payload.new.status);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId]);

  // Scroll to bottom
  useEffect(() => {
    const container = chatMessagesRef.current;
    if (!container || messages.length === 0) return;
    
    // Smooth scroll to bottom
    setTimeout(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, [messages, isTyping]);

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showDetailsForm, setShowDetailsForm] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Focus input when chat opens & reset unread count
  useEffect(() => {
    if (isChatOpen) {
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isChatOpen]);

  // Subscribe to real-time messages (Admin replies) and status updates
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase.channel(`chat_${chatId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `chat_id=eq.${chatId}` }, payload => {
        setMessages(prev => {
          if (prev.find(m => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });

        // Increment unread count if chat window is closed and message is from admin
        if (!isChatOpen && payload.new.role === 'admin') {
          setUnreadCount(prev => prev + 1);
        }
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'live_chats', filter: `id=eq.${chatId}` }, payload => {
        setChatStatus(payload.new.status);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatId, isChatOpen]);

  const insertMessage = async (role, content, targetChatId = chatId) => {
    if (!targetChatId) return null;
    const { data } = await supabase
      .from('chat_messages')
      .insert([{ chat_id: targetChatId, role, content }])
      .select()
      .single();
    if (data) {
       setMessages(prev => [...prev.filter(m => m.id !== 'temp'), data]);
    }
    return data;
  };

  const requestHumanSupport = async () => {
    setShowDetailsForm(true);
  };

  const handleDetailsSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim() || !chatId) return;

    setIsTyping(true);
    setShowDetailsForm(false);

    // Save name & email to live_chats
    await supabase.from('live_chats').update({
      status: 'human_requested',
      user_name: userName.trim(),
      user_email: userEmail.trim(),
      updated_at: new Date().toISOString()
    }).eq('id', chatId);

    // Trigger email notification to admin
    await callEdgeFunction('send-email', {
      type: 'announcement',
      to: 'ibmssp.media2@gmail.com',
      subject: `Live Support Request: ${userName.trim()} (${userEmail.trim()})`,
      headline: 'New Live Chat Support Escalation',
      content: `A visitor has requested human support in the live chat.\n\nVisitor Name: ${userName.trim()}\nVisitor Email: ${userEmail.trim()}\nSession ID: ${chatId}\n\nPlease log in to the admin dashboard live chat module to reply directly.`
    });

    await insertMessage('bot', `Thank you ${userName.trim()}. A human representative has been notified of your request (${userEmail.trim()}) and will be with you shortly. Your conversation will update here instantly!`);
    setChatStatus('human_requested');
    setIsTyping(false);
  };

  const clearChat = async () => {
    if (chatId) {
      await supabase.from('chat_messages').delete().eq('chat_id', chatId);
      const newInitial = await insertMessage('bot', INITIAL_MESSAGE.content);
      setMessages([newInitial]);
    }
  };

  const sendMessage = async (userText) => {
    if (!userText.trim() || isTyping || !chatId) return;

    // Optimistically add
    const tempUserMsg = { id: 'temp', role: 'user', content: userText };
    setMessages(prev => [...prev, tempUserMsg]);
    setInputVal('');
    setIsTyping(true);

    // Save user msg to DB
    await insertMessage('user', userText);

    // If human active/requested, don't use AI
    if (chatStatus === 'human_requested' || chatStatus === 'human_active') {
      setIsTyping(false);
      return;
    }

    // Build Groq history
    const history = messages
      .filter(m => m.role === 'user' || m.role === 'bot')
      .map(m => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content
      }));
    history.push({ role: 'user', content: userText });

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
      const sanitizedText = rawText.replace(/--/g, '-').replace(/—/g, '-');
      
      await insertMessage('bot', sanitizedText);

    } catch (err) {
      await insertMessage('bot', 'I am having trouble connecting right now. Please try again in a moment or reach out to us directly at info@ibmssp.org.ng.');
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
      {/* Chat Widget */}
      <div className="chatbot-widget-container">
        <button
          className={`chat-bubble-launcher ${isChatOpen ? 'active' : ''}`}
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open Chat"
          style={{ position: 'relative' }}
        >
          {isChatOpen ? <X size={22} /> : <MessageSquare size={22} />}
          {!isChatOpen && unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              fontSize: '11px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        <div className={`chat-window ${isChatOpen ? 'chat-window-open' : ''}`}>
          {/* Header */}
          <div className="chat-header">
            <div className="chat-title">
              <span className="online-indicator"></span>
              <div>
                <h4>IBMSSP Support</h4>
                <span>{chatStatus === 'bot' ? 'Powered by AI' : 'Live Support'}</span>
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

          {/* Details Form Modal (When requesting human support) */}
          {showDetailsForm && (
            <div style={{ padding: '1.5rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
              <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary-color)', fontSize: '0.95rem', fontWeight: 700 }}>Request Live Human Support</h5>
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.8rem', color: '#64748b' }}>Please enter your details so our representative can identify and notify you of replies.</p>
              <form onSubmit={handleDetailsSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={userName} 
                  onChange={(e) => setUserName(e.target.value)} 
                  required 
                  style={{ padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={userEmail} 
                  onChange={(e) => setUserEmail(e.target.value)} 
                  required 
                  style={{ padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.82rem', fontWeight: 700 }}>
                    Submit &amp; Connect
                  </button>
                  <button type="button" onClick={() => setShowDetailsForm(false)} className="btn btn-secondary" style={{ padding: '0.5rem 0.8rem', fontSize: '0.82rem' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages */}
          <div className="chat-messages" ref={chatMessagesRef}>
            {messages.map((msg, idx) => {
              const { cleanText, links } = parseLinks(msg.content || '');
              
              return (
                <div key={msg.id || idx} className={`chat-message ${msg.role === 'user' ? 'user' : 'assistant'}`}>
                  {msg.role === 'bot' && (
                    <div className="bot-avatar" title="AI Assistant">
                      <Bot size={16} />
                    </div>
                  )}
                  {msg.role === 'admin' && (
                    <div className="bot-avatar admin-avatar" title="Customer Care Rep" style={{backgroundColor: 'var(--rust-red)'}}>
                      <Headset size={16} color="#fff" />
                    </div>
                  )}
                  <div className="message-content-wrap">
                    {msg.role === 'admin' && <div style={{fontSize: '10px', color: 'var(--rust-red)', marginBottom: '2px', fontWeight: 'bold'}}>Customer Care Rep</div>}
                    <div className="message-bubble">{cleanText}</div>
                    {links && links.length > 0 && (
                      <div className="message-link-buttons">
                        {links.map((link, li) => (
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
              );
            })}

            {isTyping && (
              <div className="chat-message assistant">
                <div className="bot-avatar"><Bot size={16} /></div>
                <div className="message-content-wrap">
                  <div className="message-bubble typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions / Human Request */}
          <div className="chat-quick-actions-wrap">
            {messages.length <= 2 && chatStatus === 'bot' && (
              <div className="chat-quick-actions" style={{marginBottom: '10px'}}>
                {QUICK_ACTIONS.map((qa, i) => (
                  <button key={i} className="quick-action-btn" onClick={() => sendMessage(qa.message)} disabled={isTyping}>
                    {qa.label}
                  </button>
                ))}
              </div>
            )}
            {chatStatus === 'bot' && messages.length > 1 && (
              <div className="chat-quick-actions" style={{justifyContent: 'center', marginBottom: '8px'}}>
                <button 
                  className="quick-action-btn" 
                  style={{backgroundColor: 'var(--rust-red)', color: '#fff', border: 'none'}} 
                  onClick={requestHumanSupport} 
                  disabled={isTyping}
                >
                  <Headset size={12} style={{marginRight: '4px', display: 'inline'}} /> Request Human Support
                </button>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="chat-input-area">
            <input
              ref={inputRef}
              type="text"
              placeholder="Type your message..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="chat-send-btn" disabled={isTyping || !inputVal.trim()} aria-label="Send">
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Scroll-to-Top Button */}
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
