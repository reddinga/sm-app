import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import './App.css';
import HeaderMenu from './layout/HeaderMenu';
import Homepage from './layout/Homepage';
import ShopLayout from './layout/ShopLayout';
import CartLayout from './layout/CartLayout';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReduxToastr preventDuplicates style={{ backgroundColor: 'white' }} />
        <BrowserRouter>
          <div className="container">
            <HeaderMenu />
            <Route exact path="/" component={Homepage} />

            <Route exact path="/shop" component={ShopLayout} />

            <Route exact path="/cart" component={CartLayout} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
