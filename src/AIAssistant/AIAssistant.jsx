import React, { useEffect, useRef, useState } from 'react';
import profilePic from '../assets/profile.jpg';

const initialAssistantMessage = `I'm Mithuusan's AI assistant. Ask me about anything!`;

const quickPrompts = [
  { label: 'Work', prompt: "Summarize Mithuusan's work experience and measurable impact." },
  { label: 'About Me', prompt: 'Give a concise professional summary of Mithuusan.' },
  { label: 'Skills', prompt: "Summarize Mithuusan's strongest technical skills and stack." },
  { label: 'Contact', prompt: 'How can someone contact Mithuusan for opportunities?' },
];

const fallbackReply = `I could not reach the live model right now. You can still ask about Mithuusan's experience, skills, projects, and fit, or contact him at mithuusank@gmail.com.`;

const normalizeAssistantText = (text = '') => {
  const raw = typeof text === 'string' ? text : '';
  const normalized = raw
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/^\s*[-*]\s+/gm, '')
    .trim();

  return normalized || raw.trim();
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', text: initialAssistantMessage }]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !scrollRef.current) {
      return;
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [isOpen, messages, isThinking]);

  const requestAssistantReply = async (conversation) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);
    let response;

    try {
      response = await fetch('/.netlify/functions/portfolio-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          messages: conversation.slice(-8),
        }),
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || `Request failed with ${response.status}`);
    }

    const reply = typeof payload.reply === 'string' ? payload.reply : '';
    return reply.trim() || fallbackReply;
  };

  const submitQuestion = async (value) => {
    const question = value.trim();

    if (!question || isThinking) {
      return;
    }

    const userMessage = { role: 'user', text: question };
    const nextConversation = [...messages, userMessage];

    setMessages(nextConversation);
    setInput('');
    setIsThinking(true);

    try {
      const reply = await requestAssistantReply(nextConversation);
      const normalizedReply = normalizeAssistantText(reply);
      setMessages((prev) => [...prev, { role: 'assistant', text: normalizedReply || fallbackReply }]);
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', text: fallbackReply }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitQuestion(input);
  };

  return (
    <div className={`assistant-widget ${isOpen ? 'open' : 'closed'}`} aria-live="polite">
      <article
        className={`panel assistant-panel ${isOpen ? 'is-open' : 'is-closed'}`}
        role="dialog"
        aria-label="Mithuusan AI assistant"
        aria-hidden={!isOpen}
      >
        <header className="assistant-panel-header">
          <div className="assistant-title-block">
            <div className="assistant-avatar-wrap">
              <img src={profilePic} alt="Mithuusan AI avatar" className="assistant-avatar" />
              <span className="assistant-avatar-status" aria-hidden="true" />
            </div>
            <div>
              <p className="assistant-title">&gt; Mithuusan.ai</p>
              <p className="assistant-subtitle">// Open to Work</p>
            </div>
          </div>

          <button
            type="button"
            className="assistant-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close assistant"
          >
            x
          </button>
        </header>

        <div className="assistant-messages" ref={scrollRef}>
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`assistant-bubble ${message.role}`}>
              <p>{message.text}</p>
            </div>
          ))}

          {isThinking ? (
            <div className="assistant-bubble assistant typing">
              <p>Thinking...</p>
            </div>
          ) : null}
        </div>

        <div className="assistant-quick-actions">
          {quickPrompts.map((item) => (
            <button key={item.label} type="button" onClick={() => submitQuestion(item.prompt)}>
              {item.label}
            </button>
          ))}
        </div>

        <form className="assistant-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Message Mithuusan AI"
          />
          <button type="submit" disabled={!input.trim() || isThinking}>
            Send
          </button>
        </form>
      </article>

      <button
        type="button"
        className="assistant-launcher"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close Mithuusan AI assistant' : 'Open Mithuusan AI assistant'}
      >
        <span className="assistant-launcher-ring" />
        <img src={profilePic} alt="Open assistant" />
        <span className="assistant-launcher-status" aria-hidden="true" />
      </button>
    </div>
  );
};

export default AIAssistant;
