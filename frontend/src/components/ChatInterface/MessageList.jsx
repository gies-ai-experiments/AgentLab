// MessageList.jsx
import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <Message 
          key={index}
          content={message.content}
          sender={message.sender}
          timestamp={message.timestamp}
        />
      ))}
    </div>
  );
};

export default MessageList;