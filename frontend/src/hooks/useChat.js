// useChat.js
import { useState, useEffect } from 'react';
import { chatAPI } from '../services/api';
import websocketService from '../services/websocket';

export const useChat = (sessionId) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionId) {
      // Load chat history
      chatAPI.getChatHistory(sessionId)
        .then(response => setMessages(response.data.messages))
        .catch(console.error);

      // Listen for new messages
      websocketService.on('message', (message) => {
        setMessages(prev => [...prev, message]);
        setIsLoading(false);
      });
    }
  }, [sessionId]);

  const sendMessage = async (content) => {
    if (!sessionId) return;

    const userMessage = {
      content,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      await chatAPI.sendMessage(sessionId, content);
    } catch (error) {
      console.error('Failed to send message:', error);
      setIsLoading(false);
    }
  };

  return { messages, sendMessage, isLoading };
};