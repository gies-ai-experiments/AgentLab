// useChat.js
import { useState, useEffect } from 'react';
import { createSession, sendMessage as apiSendMessage, getChatHistory } from '../services/api';
import websocketService from '../services/websocket';

export default function useChat() {
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function init() {
      const id = await createSession();
      setSessionId(id);
      const history = await getChatHistory(id);
      setMessages(history);

      // Listen for new messages
      websocketService.on('message', (message) => {
        setMessages(prev => [...prev, message]);
        setIsLoading(false);
      });
    }
    init();
  }, []);

  const sendMessage = async (text) => {
    const agentResponse = await apiSendMessage(sessionId, text);
    setMessages((prev) => [
      ...prev,
      { sender: "user", text },
      { sender: "agent", text: agentResponse }
    ]);
    setIsLoading(true);
  };

  return { messages, sendMessage, isLoading };
}