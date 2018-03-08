import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
class NextButton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        size="medium"
        floated="right"
        disabled={!this.props.enabled}
      >
        Next
      </Button>
    );
  }
}

export default NextButton;
