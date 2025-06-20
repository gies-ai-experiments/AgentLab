// api.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
// expecting this. might be wrong. 
// have to prompt using the specific end points. 
// slash run endpoint gives the response from the agent.
// 8000 is the default port for the backend server.
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  createSession: () => api.post('/api/sessions'),
  sendMessage: (sessionId, message) => 
    api.post(`/api/chat/${sessionId}`, { message }), 
  getChatHistory: (sessionId) => api.get(`/api/chat/${sessionId}`),
  getAgentStatus: (sessionId) => api.get(`/api/status/${sessionId}`),
};