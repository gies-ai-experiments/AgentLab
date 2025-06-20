// AgentIndicator.jsx
import React from 'react';

const AgentIndicator = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return '#4CAF50';
      case 'thinking': return '#FF9800';
      case 'waiting': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  return (
    <div 
      className="status-indicator"
      style={{ backgroundColor: getStatusColor(status) }}
    />
  );
};

export default AgentIndicator;