import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Segment } from 'semantic-ui-react';
import './App.css';
import HeaderMenu from './layout/HeaderMenu';
import Homepage from './layout/Homepage';
import ShopLayout from './layout/ShopLayout';
import CartLayout from './layout/CartLayout';
import StoreLayout from './layout/StoreLayout';
import Footer from './layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReduxToastr preventDuplicates style={{ backgroundColor: 'white' }} />
        <BrowserRouter>
          <div className="main-container container">
            <HeaderMenu />

            <Route exact path="/" component={Homepage} />

            <Route path="/shop" component={StoreLayout} />

            <Route exact path="/custom" component={ShopLayout} />

            <Route exact path="/cart" component={CartLayout} />

            <div className="app-footer">
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
