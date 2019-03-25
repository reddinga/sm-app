import React, { Component } from 'react';

import { Helmet } from 'react-helmet';
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
        <Helmet>
          <title>
            Silver Maple Studio - Design your own custom floral decor
          </title>
          <meta
            name="description"
            content="Design your own unique, everlasting silk flower arrangements and home decor online"
          />
          <meta
            name="keywords"
            content="Silk flower arrangements, real touch flower arrangements, silk centerpieces, silk floral designs, silk flower bouquets, silk flower wreaths, silk accents, faux flower arrangements, artificial flower arrangements, silk flower accents, flowers for home decorating, gift flowers"
          />
        </Helmet>
        <AddToCartToastr />
        <DDShopWizard />
      </div>
    );
  }
}

export default ShopLayout;
