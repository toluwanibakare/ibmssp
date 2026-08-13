import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Headset, Bot, User, Send, CheckCircle2 } from 'lucide-react';

export default function LiveChat() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch active chats
  useEffect(() => {
    fetchChats();
    
    // Subscribe to changes in live_chats (new chats or status changes)
    const channel = supabase.channel('admin_live_chats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_chats' }, () => {
        fetchChats();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from('live_chats')
        .select('*')
        .neq('status', 'closed')
        .order('updated_at', { ascending: false });
        
      if (error) throw error;
      setChats(data || []);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching chats:', err);
    }
  };

  // Fetch messages when a chat is selected
  useEffect(() => {
    if (!selectedChat) return;

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('chat_id', selectedChat.id)
        .order('created_at', { ascending: true });
      if (data) setMessages(data);
      scrollToBottom();
    };

    fetchMessages();

    // Subscribe to new messages for this chat
    const channel = supabase.channel(`admin_chat_${selectedChat.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `chat_id=eq.${selectedChat.id}` }, payload => {
        setMessages(prev => {
          if (prev.find(m => m.id === payload.new.id)) return prev;
          return [...prev, payload.new];
        });
        scrollToBottom();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedChat]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputVal.trim() || !selectedChat) return;

    const text = inputVal;
    setInputVal('');

    // Optimistic UI
    const tempMsg = { id: 'temp', chat_id: selectedChat.id, role: 'admin', content: text };
    setMessages(prev => [...prev, tempMsg]);
    scrollToBottom();

    // Update status to human_active if it was requested
    if (selectedChat.status === 'human_requested') {
      await supabase.from('live_chats').update({ status: 'human_active' }).eq('id', selectedChat.id);
      setSelectedChat({ ...selectedChat, status: 'human_active' });
    }

    // Insert message
    const { data } = await supabase.from('chat_messages').insert([
      { chat_id: selectedChat.id, role: 'admin', content: text }
    ]).select().single();

    if (data) {
      setMessages(prev => [...prev.filter(m => m.id !== 'temp'), data]);
    }
  };

  const resolveChat = async (e, chatId) => {
    e.stopPropagation();
    await supabase.from('live_chats').update({ status: 'closed' }).eq('id', chatId);
    if (selectedChat?.id === chatId) {
      setSelectedChat(null);
      setMessages([]);
    }
    fetchChats();
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-100px)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Headset className="text-primary" /> Live Chat Support
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage support requests and chat directly with visitors.</p>
        </div>
      </div>

      <div className="flex-1 bg-card rounded-xl border border-border shadow-card overflow-hidden flex flex-col md:flex-row">
        {/* Chat List Sidebar */}
        <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border flex flex-col">
          <div className="p-4 border-b border-border bg-muted/20">
            <h2 className="font-semibold text-sm">Active Sessions ({chats.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-sm text-muted-foreground">Loading chats...</div>
            ) : chats.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No active chats right now.</div>
            ) : (
              chats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-muted/30 transition-colors ${selectedChat?.id === chat.id ? 'bg-muted/50 border-l-4 border-l-primary' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col max-w-[150px]">
                      <span className="font-semibold text-xs text-foreground truncate">
                        {chat.user_name || 'Anonymous Visitor'}
                      </span>
                      {chat.user_email && (
                        <span className="text-[11px] text-primary font-medium truncate">
                          {chat.user_email}
                        </span>
                      )}
                      <span className="font-mono text-[10px] text-muted-foreground truncate">
                        ID: {chat.session_id.substring(0,8)}
                      </span>
                    </div>
                    {chat.status === 'human_requested' && (
                      <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">Needs Help</span>
                    )}
                    {chat.status === 'human_active' && (
                      <span className="bg-success/10 text-success text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                    )}
                    {chat.status === 'bot' && (
                      <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-0.5 rounded-full">Bot</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(chat.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <button 
                      onClick={(e) => resolveChat(e, chat.id)}
                      className="text-[10px] flex items-center gap-1 text-muted-foreground hover:text-success transition-colors"
                    >
                      <CheckCircle2 size={12} /> Resolve
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-background/50">
          {!selectedChat ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground flex-col gap-3">
              <Headset size={48} className="opacity-20" />
              <p>Select a chat session to start helping</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-sm flex items-center gap-2">
                    <span>{selectedChat.user_name || 'Anonymous Visitor'}</span>
                    {selectedChat.user_email && (
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded font-normal">
                        {selectedChat.user_email}
                      </span>
                    )}
                    <span className="font-mono bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground">
                      {selectedChat.session_id.substring(0,8)}
                    </span>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Status: <span className="capitalize">{selectedChat.status.replace('_', ' ')}</span>
                  </p>
                </div>
                <button 
                  onClick={(e) => resolveChat(e, selectedChat.id)}
                  className="bg-success/10 text-success hover:bg-success hover:text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <CheckCircle2 size={14} /> Resolve Chat
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div key={msg.id || i} className={`flex gap-3 max-w-[80%] ${msg.role === 'admin' ? 'ml-auto flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'admin' ? 'bg-primary text-primary-foreground' : 
                      msg.role === 'bot' ? 'bg-muted text-muted-foreground' : 'bg-secondary text-secondary-foreground'
                    }`}>
                      {msg.role === 'admin' ? <Headset size={14} /> : 
                       msg.role === 'bot' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-3 rounded-lg text-sm ${
                      msg.role === 'admin' ? 'bg-primary text-primary-foreground rounded-tr-none' : 
                      'bg-card border border-border rounded-tl-none shadow-sm'
                    }`}>
                      {msg.role === 'bot' && <div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase">AI Bot</div>}
                      {msg.role === 'user' && <div className="text-[10px] font-bold text-muted-foreground mb-1 uppercase">Visitor</div>}
                      {msg.role === 'admin' && <div className="text-[10px] font-bold text-primary-foreground/70 mb-1 uppercase text-right">You</div>}
                      
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Reply Templates */}
              <div className="px-4 pt-3 pb-1 border-t border-border bg-muted/10 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-muted-foreground mr-1">Quick Templates:</span>
                <button
                  type="button"
                  onClick={() => setInputVal("Hello! Thank you for reaching out to IBMSSP Customer Support. How may I assist you today?")}
                  className="text-xs bg-background hover:bg-primary/10 hover:text-primary border border-border px-2.5 py-1 rounded-full text-muted-foreground transition-colors"
                >
                  👋 Welcome Greeting
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal("For detailed guidance on our membership categories (Student, Graduate, Professional, Corporate), please visit https://ibmssp.org.ng/membership or let me know your current qualifications.")}
                  className="text-xs bg-background hover:bg-primary/10 hover:text-primary border border-border px-2.5 py-1 rounded-full text-muted-foreground transition-colors"
                >
                  🎓 Membership Info
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal("You can reach our admin team directly via email at info@ibmssp.org.ng or by phone at +2348023644148.")}
                  className="text-xs bg-background hover:bg-primary/10 hover:text-primary border border-border px-2.5 py-1 rounded-full text-muted-foreground transition-colors"
                >
                  📞 Direct Contact
                </button>
                <button
                  type="button"
                  onClick={() => setInputVal("Thank you for chatting with IBMSSP support today! If you have any further questions in the future, feel free to reach out anytime. Have a great day!")}
                  className="text-xs bg-background hover:bg-primary/10 hover:text-primary border border-border px-2.5 py-1 rounded-full text-muted-foreground transition-colors"
                >
                  ✅ Resolve & Closing
                </button>
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border bg-card">
                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={e => setInputVal(e.target.value)}
                    placeholder="Type your reply or choose a template above..."
                    className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button 
                    type="submit"
                    disabled={!inputVal.trim()}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md disabled:opacity-50 transition-colors"
                  >
                    <Send size={18} />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
