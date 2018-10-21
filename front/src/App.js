import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Rider from './Rider.js';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
          <h1>Loyalty program</h1>
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/rider/:id" component={Rider} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
