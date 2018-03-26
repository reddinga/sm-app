import React, { Component } from 'react';
import SideMenu from './SideMenu';
import { Segment, Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import ProductPage from '../product/ProductPage';

class ProductLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container
        style={{
          paddingTop: '2em',
          marginTop: '1em',
          marginBottom: '2em',
        }}
      >
        <Route path={`/product/:productId`} component={ProductPage} />
      </Container>
    );
  }
}

export default ProductLayout;
