// StatusDisplay.jsx
import React from 'react';
import AgentIndicator from './AgentIndicator';

const StatusDisplay = ({ status, agent }) => {
  return (
    <div className="agent-status">
      <AgentIndicator status={status} />
      <div className="agent-info">
        <span className="agent-name">{agent || 'VentureBot'}</span>
        <span className="agent-status-text">{status}</span>
      </div>
    </div>
  );
};

export default StatusDisplay;