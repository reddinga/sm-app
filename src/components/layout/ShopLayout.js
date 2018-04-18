import React, { Component } from 'react';

import DDShopWizard from '../shopDragDrop/DDShopWizard';
import AddToCartToastr from '../common/AddToCartToastr';

class ShopLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <AddToCartToastr />
        <DDShopWizard />
      </div>
    );
  }
}

export default ShopLayout;
