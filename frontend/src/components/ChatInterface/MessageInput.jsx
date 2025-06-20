// MessageInput.jsx
import React, { useState } from 'react';

const MessageInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="message-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        Send
      </button>
    </form>
  );
};

export default MessageInput;