import React, { Component } from 'react';

import ShopWizard from '../shop/ShopWizard';

class ShopLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <ShopWizard />
      </div>
    );
  }
}

export default ShopLayout;
