// App.jsx
import React from 'react';
import ChatContainer from './components/ChatInterface/ChatContainer';
import './App.css';

function App() {
  return (
    <div className="app-bg">
      {/* Header */}
      <header className="vb-header">
        <div className="vb-header-logo">
          {/* Placeholder SVG bot icon */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vb-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                <stop stopColor="#7B61FF" />
                <stop offset="1" stopColor="#4F8CFF" />
              </linearGradient>
            </defs>
            <rect width="40" height="40" rx="12" fill="url(#vb-gradient)"/>
            <path d="M13 25V19C13 16.7909 14.7909 15 17 15H23C25.2091 15 27 16.7909 27 19V25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="17" cy="21" r="1" fill="white"/>
            <circle cx="23" cy="21" r="1" fill="white"/>
          </svg>
        </div>
        <div>
          <div className="vb-header-title">VentureBot</div>
          <div className="vb-header-subtitle">AgentLab v5</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="vb-hero">
        <div className="vb-hero-icon">
          {/* Reuse logo icon */}
          <svg width="56" height="56" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="12" fill="url(#vb-gradient)"/>
            <path d="M13 25V19C13 16.7909 14.7909 15 17 15H23C25.2091 15 27 16.7909 27 19V25" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="17" cy="21" r="1" fill="white"/>
            <circle cx="23" cy="21" r="1" fill="white"/>
          </svg>
        </div>
        <h1 className="vb-hero-title">Welcome to <span className="vb-gradient-text">VentureBot</span></h1>
        <p className="vb-hero-desc">
          Your AI-powered companion for building innovative products.<br/>
          Integrating key concepts from BADM 350 to guide you through the complete product development journey.
        </p>
        <button className="vb-hero-btn">
          Start Your Journey <span className="vb-hero-btn-arrow">→</span>
        </button>
        <div className="vb-features-grid">
          <div className="vb-feature-card">
            <div className="vb-feature-icon">
              {/* Idea icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#E9E7FD"/><path d="M12 7v4l3 2" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="vb-feature-title">Idea Generation</div>
            <div className="vb-feature-desc">Brainstorm innovative AI-powered product ideas tailored to your interests and market needs.</div>
          </div>
          <div className="vb-feature-card">
            <div className="vb-feature-icon">
              {/* Validation icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#E9E7FD"/><path d="M8 12l2 2 4-4" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="vb-feature-title">Validation & Analysis</div>
            <div className="vb-feature-desc">Validate your ideas with comprehensive market analysis and feasibility assessment.</div>
          </div>
          <div className="vb-feature-card">
            <div className="vb-feature-icon">
              {/* Product icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#E9E7FD"/><path d="M8 16v-4a4 4 0 018 0v4" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="vb-feature-title">Product Development</div>
            <div className="vb-feature-desc">Create detailed Product Requirements and development plans for your AI solution.</div>
          </div>
          <div className="vb-feature-card">
            <div className="vb-feature-icon">
              {/* Prompt icon */}
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#E9E7FD"/><path d="M8 12h8M8 16h8" stroke="#7B61FF" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="vb-feature-title">Prompt Engineering</div>
            <div className="vb-feature-desc">Craft effective AI prompts for no-code app integration and automation.</div>
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <main className="vb-chat-section">
        <ChatContainer />
      </main>
    </div>
  );
}

export default App;