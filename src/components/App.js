import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import logo from '../logo.svg';
import './App.css';
import { Button } from 'semantic-ui-react';
import HeaderMenu from './layout/HeaderMenu';
import Homepage from './layout/Homepage';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <HeaderMenu />
            <Route exact path="/" component={Homepage} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
