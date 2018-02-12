import React, { Component } from 'react';
import _ from 'lodash';
import { Step, Icon } from 'semantic-ui-react';

class StepGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClick = this.onClick.bind(this);
  }
  getSteps(options) {
    return _.map(
      options,
      ({ title, active, completed, disabled, key, description, icon }) => {
        let boundItemClick = this.onClick.bind(this, key);
        return (
          <Step
            key={key}
            active={active}
            completed={completed}
            disabled={disabled}
            onClick={boundItemClick}
          >
            {icon && <Icon name={icon} />}
            <Step.Content>
              <Step.Title>{title}</Step.Title>
              <Step.Description>{description}</Step.Description>
            </Step.Content>
          </Step>
        );
      },
    );
  }
  onClick(key, event) {
    this.props.onClick(key);
  }
  render() {
    return (
      <Step.Group
        attached
        widths={this.props.steps.length}
        unstackable={this.props.unstackable}
        size={this.props.size}
        ordered={this.props.ordered}
      >
        {this.getSteps(this.props.steps)}
      </Step.Group>
    );
  }
}
StepGroup.defaultProps = {
  steps: [],
  ordered: true,
  size: 'mini',
  unstackable: true,
};
export default StepGroup;
