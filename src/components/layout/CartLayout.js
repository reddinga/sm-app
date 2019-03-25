import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Cart from '../checkoutCart/Cart';

class CartLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Silver Maple Studio - Your Cart</title>
          <meta
            name="description"
            content="Purchase unique, everlasting silk flower arrangements and home decor"
          />
          <meta
            name="keywords"
            content="Silk flower arrangements, real touch flower arrangements, silk centerpieces, silk floral designs, silk flower bouquets, silk flower wreaths, silk accents, faux flower arrangements, artificial flower arrangements, silk flower accents, flowers for home decorating, gift flowers"
          />
        </Helmet>
        <Cart />
      </div>
    );
  }
}

export default CartLayout;
