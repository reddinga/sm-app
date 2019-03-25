import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import { Segment } from 'semantic-ui-react';
import './App.css';
import HeaderMenu from './layout/HeaderMenu';
import Homepage from './layout/Homepage';
import ShopLayout from './layout/ShopLayout';
import CartLayout from './layout/CartLayout';
import StoreLayout from './layout/StoreLayout';
import AboutLayout from './layout/AboutLayout';
import ProductLayout from './layout/ProductLayout';
import ConfirmationLayout from './layout/ConfirmationLayout';
import Footer from './layout/Footer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReduxToastr preventDuplicates style={{ backgroundColor: 'white' }} />
        <BrowserRouter>
          <div className="main-container container">
            <HeaderMenu />
            <Switch>
              <Route exact path="/" component={Homepage} />

              <Route path="/shop" component={StoreLayout} />

              <Route path="/product" component={ProductLayout} />

              <Route path="/confirmation" component={ConfirmationLayout} />

              <Route exact path="/custom" component={ShopLayout} />

              <Route exact path="/cart" component={CartLayout} />

              <Route exact path="/about" component={AboutLayout} />
            </Switch>
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
