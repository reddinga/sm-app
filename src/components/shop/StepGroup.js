import React, { Component } from 'react';
import _ from 'lodash';
import { Step } from 'semantic-ui-react';

class StepGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }
  getSteps(options) {
    return _.map(
      options,
      ({ title, active, completed, disabled, key, description }) => {
        let boundItemClick = this.onClick.bind(this, key);
        return (
          <Step
            key={key}
            active={active}
            completed={completed}
            disabled={disabled}
            onClick={boundItemClick}
          >
            <Step.Content>
              <Step.Title>{title}</Step.Title>
              <Step.Description>{description}</Step.Description>
            </Step.Content>
          </Step>
        );
      }
    );
  }
  onClick(key, event) {
    this.props.onClick(key);
  }
  render() {
    return (
      <Step.Group attached widths={3} unstackable size="mini" ordered>
        {this.getSteps(this.props.steps)}
      </Step.Group>
    );
  }
}

export default StepGroup;
