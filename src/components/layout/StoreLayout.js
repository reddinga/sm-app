import React, { Component } from 'react';
import SideMenu from './SideMenu';
import { Segment, Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import StorePage from '../store/StorePage';

class StoreLayout extends Component {
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
        <Route path={`/shop/:categoryId`} component={StorePage} />
      </Container>
    );
  }
}

export default StoreLayout;
