import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
class AddToCart extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.onClick} basic inverted size="huge" fluid>
          Add to cart
        </Button>
      </div>
    );
  }
}

export default AddToCart;
