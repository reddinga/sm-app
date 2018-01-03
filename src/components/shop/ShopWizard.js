import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import StepGroup from './StepGroup';
import ChooseStyle from './ChooseStyle';
import ChooseDesign from './ChooseDesign';
import Preview from './Preview';
import Customize from './Customize';
import { connect } from 'react-redux';
import { setStyle, setDesign, setDesignOptions } from '../../actions';

class ShopWizard extends Component {
  constructor(props) {
    super(props);

    this.onStepChange = this.onStepChange.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.setDesign = this.setDesign.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.nextStep = this.nextStep.bind(this);

    this.state = {
      activeKey: 0,
      style: this.props.style,
      style: this.props.design,
      steps: [
        {
          title: 'Select Style',
          active: true,
          completed: false,
          disabled: false,
          key: 0,
          description: '',
          content: (
            <ChooseStyle
              nextStep={this.nextStep}
              setStyle={this.setStyle}
              getStyle={this.getStyle}
            />
          ),
        },
        {
          title: 'Select Design',
          active: false,
          completed: false,
          disabled: true,
          key: 1,
          description: '',
          content: (
            <ChooseDesign
              nextStep={this.nextStep}
              setDesign={this.setDesign}
              getDesign={this.getDesign}
              getStyle={this.getStyle}
            />
          ),
        },
        {
          title: 'Customize',
          active: false,
          completed: false,
          disabled: true,
          key: 2,
          description: '',
          content: <Customize />,
        },
      ],
    };
  }
  // called when active step changes
  // either from next button or selecting from step menu
  onStepChange(key) {
    // change active key
    this.setState({ activeKey: key });
    // set the active step
    this.setActiveStep(key);
  }
  // set the active step and --> will render this component
  setActiveStep(key) {
    let initialSteps = this.state.steps;
    let activeKey = key;
    let newSteps = _.map(initialSteps, (step, index) => {
      if (activeKey === step.key) {
        step.active = true;
      } else {
        step.active = false;
      }
      return step;
    });
    this.setState({ steps: newSteps });
  }
  // go to next step
  nextStep() {
    const newActive = this.state.activeKey + 1;
    this.onStepChange(newActive);
  }
  // get content for component of this step
  getStepContent() {
    return this.state.steps[this.state.activeKey].content;
  }
  // toggle completed
  toggleCompleted(id) {
    if (id !== null) {
      this.setCompleted();
    } else {
      this.setUnCompleted();
    }
  }
  // set this step as completed
  setCompleted() {
    let initialSteps = this.state.steps;
    let newSteps = _.map(initialSteps, (step, index) => {
      if (step.key === this.state.activeKey) {
        step.completed = true;
        // enable next step
      } else if (step.key === this.state.activeKey + 1) {
        step.disabled = false;
        step.completed = false;
      }
      return step;
    });
    this.setState({ steps: newSteps });
  }
  // set this step as uncompleted
  setUnCompleted() {
    let initialSteps = this.state.steps;
    let newSteps = _.map(initialSteps, (step, index) => {
      if (step.key === this.state.activeKey) {
        step.completed = false;
        // disable next steps
      } else if (step.key > this.state.activeKey) {
        step.disabled = true;
        step.completed = false;
      }
      return step;
    });
    this.setState({ steps: newSteps });
  }
  // set style choice
  setStyle(id) {
    this.setState({ style: id });
    this.props.onStyleSelect(id);
    this.toggleCompleted(id);
  }
  // get style choide
  getStyle() {
    return this.state.style;
  }
  // set design choice
  setDesign(id) {
    this.setState({ design: id });
    this.props.onDesignSelect(id);
    this.toggleCompleted(id);
  }
  // get design choice
  getDesign() {
    return this.state.design;
  }

  render() {
    console.log('wizardState', this.state);
    return (
      <div>
        <Segment attached="top">
          <Grid
            verticalAlign="top"
            style={{ padding: '0em 0em' }}
            attached="top"
          >
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Preview />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment size="mini" style={{ padding: '0em 0em' }} vertical attached>
          <StepGroup onClick={this.onStepChange} steps={this.state.steps} />
        </Segment>
        <Segment style={{ padding: '0em 0em' }} vertical attached="bottom">
          {this.getStepContent()}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('wizard state', state);
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    onStyleSelect: id => {
      dispatch(setStyle(id));
    },
    onDesignSelect: id => {
      dispatch(setDesign(id));
    },
    onSetDesignOptions: opts => {
      dispatch(setDesignOptions(opts));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShopWizard);
