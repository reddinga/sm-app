import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import HeaderMenu from './layout/HeaderMenu';
import Homepage from './layout/Homepage';
import ShopLayout from './layout/ShopLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <HeaderMenu />
            <Route exact path="/" component={Homepage} />

            <Route exact path="/shop" component={ShopLayout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
