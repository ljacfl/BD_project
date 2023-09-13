//App.js

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa el Router
import AppRoutes from './AppRoutes'; // Importa tus rutas

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <AppRoutes /> {/* Renderiza las rutas aquí */}
        </div>
      </Router>
    );
  }
}

export default App;

