// api.js
import axios from 'axios';

const BASE_URL = "http://localhost:8000";

export async function createSession() {
  const res = await axios.post(`${BASE_URL}/api/sessions`);
  return res.data.sessionId;
}

export async function sendMessage(sessionId, text) {
  const res = await axios.post(`${BASE_URL}/api/chat/${sessionId}`, { text });
  return res.data.response;
}

export async function getChatHistory(sessionId) {
  const res = await axios.get(`${BASE_URL}/api/chat/${sessionId}`);
  return res.data;
}

export const chatAPI = {
  getAgentStatus: (sessionId) => axios.get(`${BASE_URL}/api/status/${sessionId}`),
};