// MessageList.jsx
import React from 'react';
import Message from './Message';

export default function MessageList({ messages }) {
  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i} className={`message ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
    </div>
  );
}