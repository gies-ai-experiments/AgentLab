// websocket.js
import io from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
  }

  connect(sessionId) {
    const wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8080';
    this.socket = io(`${wsUrl}/ws/${sessionId}`);
    
    this.socket.on('agent_response', (data) => {
      this.emit('message', data);
    });
    
    this.socket.on('agent_status', (data) => {
      this.emit('status', data);
    });
  }

  emit(event, data) {
    const listeners = this.listeners.get(event) || [];
    listeners.forEach(callback => callback(data));
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(callback);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new WebSocketService();