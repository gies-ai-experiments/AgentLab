// useAgentStatus.js
import { useState, useEffect } from 'react';
import { chatAPI } from '../services/api';
import websocketService from '../services/websocket';

export const useAgentStatus = (sessionId) => {
  const [agentStatus, setAgentStatus] = useState('idle');
  const [currentAgent, setCurrentAgent] = useState('VentureBot');

  useEffect(() => {
    if (sessionId) {
      // Get initial status
      chatAPI.getAgentStatus(sessionId)
        .then(response => {
          setAgentStatus(response.data.status);
          setCurrentAgent(response.data.agent);
        })
        .catch(console.error);

      // Listen for status updates
      websocketService.on('status', (statusData) => {
        setAgentStatus(statusData.status);
        setCurrentAgent(statusData.agent);
      });
    }
  }, [sessionId]);

  return { agentStatus, currentAgent };
};