import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
class BackButton extends Component {
  render() {
    return (
      <Button onClick={this.props.onClick} size="medium" floated="left">
        Back
      </Button>
    );
  }
}

export default BackButton;
