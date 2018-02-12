import React, { Component } from 'react';

import ShopWizard from '../shop/ShopWizard';
import AddToCartToastr from '../shop/AddToCartToastr';

class ShopLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <AddToCartToastr />
        <ShopWizard />
      </div>
    );
  }
}

export default ShopLayout;
