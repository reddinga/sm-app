import React, { Component } from 'react';
import CartWizard from '../shoppingCart/CartWizard';

class CartLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <CartWizard />;
  }
}

export default CartLayout;
