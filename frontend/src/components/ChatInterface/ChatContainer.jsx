// ChatContainer.jsx
import React from "react";
import useChat from "../../hooks/useChat";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useAgentStatus } from '../../hooks/useAgentStatus';
import StatusDisplay from '../AgentStatus/StatusDisplay';

export default function ChatContainer() {
  const { messages, sendMessage } = useChat();
  const { agentStatus, currentAgent } = useAgentStatus();

  return (
    <div className="chat-container">
      <StatusDisplay status={agentStatus} agent={currentAgent} />
      <MessageList messages={messages} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}