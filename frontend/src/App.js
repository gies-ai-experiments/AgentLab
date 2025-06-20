import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>VentureBot</h1>
        <h2>AgentLab v5</h2>
      </header>
      <main>
        <section className="welcome-section">
          <h2>Welcome to VentureBot</h2>
          <p>Your AI-powered companion for building innovative products. Integrating key concepts from BADM 350 to guide you through the complete product development journey.</p>
          <button>Start Your Journey</button>
        </section>
        <section className="features">
          <div className="feature-card">Idea Generation</div>
          <div className="feature-card">Validation & Analysis</div>
          <div className="feature-card">Product Development</div>
          <div className="feature-card">Prompt Engineering</div>
        </section>
        <section className="chat-interface">
          <h3>Active Agent: VentureBot</h3>
          <Chat />
        </section>
      </main>
    </div>
  );
}

function Chat() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const sendMessage = async () => {
    if (message.trim() === '') return;

    const newMessage = { role: 'user', text: message };
    setChatHistory([...chatHistory, newMessage]);

    try {
      const response = await axios.post('http://localhost:8000/run', {
        appName: 'my_sample_agent',
        userId: 'u_123',
        sessionId: 's_123',
        newMessage: { role: 'user', parts: [{ text: message }] },
      });

      const botResponse = response.data[0].content.parts[0].text;
      setChatHistory([...chatHistory, newMessage, { role: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setMessage('');
  };

  return (
    <div>
      <div className="chat-box">
        {chatHistory.map((msg, index) => (
          <p key={index} className={msg.role}>{msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message here..."
      />
    </div>
  );
}

export default App;
