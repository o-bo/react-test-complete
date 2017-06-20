import React, { Component } from 'react';

import Account from './components/Account';

import './App.css';
import './icons.css';

class App extends Component {
  render() {
    return (
      <div className="App mt-10 mb-10 mr-10 ml-10">
        <div className="App-header">
          <h2>Welcome to Kasual</h2>
        </div>
        <p>
          Let's code a bank account management app.
        </p>
        <Account />
      </div>
    );
  }
}

export default App;
