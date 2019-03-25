import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import SideMenu from './SideMenu';
import { Segment, Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import StorePage from '../store/StorePage';
import ProductPage from '../product/ProductPage';

class StoreLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Silver Maple Studio - Handmade Custom Floral Decor</title>
          <meta
            name="description"
            content="Handmade unique, everlasting silk flower arrangements and home decor"
          />
          <meta
            name="keywords"
            content="Silk flower arrangements, real touch flower arrangements, silk centerpieces, silk floral designs, silk flower bouquets, silk flower wreaths, silk accents, faux flower arrangements, artificial flower arrangements, silk flower accents, flowers for home decorating, gift flowers"
          />
        </Helmet>
        <Container
          style={{
            paddingTop: '2em',
            marginTop: '1em',
            marginBottom: '2em',
          }}
        >
          <Route path={`/shop/:categoryId`} component={StorePage} />
        </Container>
      </div>
    );
  }
}

export default StoreLayout;
