import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import logo from './logo.png';
import './App.css';
import Login from './components/Login/login';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
