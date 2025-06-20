// App.jsx
import React from 'react';
import ChatContainer from './components/ChatInterface/ChatContainer';
import './styles/globals.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>VentureBot Chat</h1>
      </header>
      <main>
        <ChatContainer />
      </main>
    </div>
  );
}

export default App;