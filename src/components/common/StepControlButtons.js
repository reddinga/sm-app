import React, { Component } from 'react';
import BackButton from './BackButton';
import NextButton from './NextButton';

class StepControlButtons extends Component {
  render() {
    console.log('render step buttons', this.props);
    let nextStepEnabled = this.props.nextStepEnabled;
    return (
      <div>
        <BackButton onClick={this.props.onClickBack} />
        <NextButton
          onClick={this.props.onClickNext}
          enabled={nextStepEnabled}
        />
      </div>
    );
  }
}
export default StepControlButtons;
