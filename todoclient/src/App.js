import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignUp from "./containers/SignUp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignUp></SignUp>
      </div>
    );
  }
}

export default App;
