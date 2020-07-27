import React from 'react';
import logo from './logo.png';
import './App.css';
import LoginForm from './components/Login/login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <LoginForm />
    </div>
  );
}

export default App;
