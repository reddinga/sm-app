import React, { Component } from 'react';
import Cart from '../checkoutCart/Cart';

class CartLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <Cart />;
  }
}

export default CartLayout;
