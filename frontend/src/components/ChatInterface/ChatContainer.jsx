// ChatContainer.jsx
import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../../hooks/useChat';
import { useAgentStatus } from '../../hooks/useAgentStatus';
import StatusDisplay from '../AgentStatus/StatusDisplay';

const ChatContainer = () => {
  const [sessionId, setSessionId] = useState(null);
  const { messages, sendMessage, isLoading } = useChat(sessionId);
  const { agentStatus, currentAgent } = useAgentStatus(sessionId);

  return (
    <div className="chat-container">
      <StatusDisplay status={agentStatus} agent={currentAgent} />
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatContainer;