import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import axios from 'axios';

export default function Chatbot({ theme, language }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const API_URL = 'http://127.0.0.1:5000';
  const isDark = theme === 'dark';

  const messagesEndRef = useRef(null);

  // ✅ AUTO SCROLL
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userText }]);
    setInput('');

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: userText,
        language: language
      });

      setMessages(prev => [
        ...prev,
        { type: 'bot', text: res.data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text:
            language === 'en'
              ? 'Server error. Please try again.'
              : 'सर्वर त्रुटि, कृपया पुनः प्रयास करें।'
        }
      ]);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="fixed bottom-8 right-8 bg-teal-500 text-white p-4 rounded-full z-50 shadow-xl"
      >
        {open ? <X /> : <MessageCircle />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className={`fixed bottom-24 right-8 w-96 h-96 rounded-2xl shadow-xl z-50 flex flex-col
          ${isDark ? 'bg-slate-800 text-white border border-slate-700' : 'bg-white text-slate-900 border'}
          `}
        >
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <strong>AI Plant Expert</strong>
            <button onClick={() => setOpen(false)}>Close</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap
                    ${
                      m.type === 'user'
                        ? 'bg-teal-500 text-white'
                        : isDark
                        ? 'bg-slate-700 text-slate-100'
                        : 'bg-slate-100 text-slate-900'
                    }
                  `}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {/* 🔽 Auto scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              className={`flex-1 resize-none p-2 rounded-lg outline-none
                ${isDark
                  ? 'bg-slate-700 text-white placeholder-slate-300 border border-slate-600'
                  : 'bg-white text-black border'
                }
              `}
              placeholder={
                language === 'en'
                  ? 'Ask about plant diseases...'
                  : 'पौधों की बीमारी के बारे में पूछें...'
              }
            />
            <button
              onClick={send}
              className="bg-teal-500 text-white px-4 py-2 rounded-lg"
            >
              <Send />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
