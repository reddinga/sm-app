import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Confirmation from '../checkoutCart/Confirmation';

class ConfirmationLayout extends Component {
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
        <Route path={`/confirmation/:orderId`} component={Confirmation} />
      </Container>
    );
  }
}

export default ConfirmationLayout;
