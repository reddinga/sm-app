import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { Dimmer, Loader, Segment, Container } from 'semantic-ui-react';
import _ from 'lodash';

import StepGroup from '../common/StepGroup';
import StepWrapper from '../common/StepWrapper';
import { checkout } from '../../actions';
import Cart from './Cart';
import Login from './Login';
import Shipping from './Shipping';
import Payments from './Payments';
import Confirm from './Confirm';

class CartWizard extends Component {
  constructor(props) {
    super(props);
    this.onStepChange = this.onStepChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.setDimmer = this.setDimmer.bind(this);
    this.setSelectedSource = this.setSelectedSource.bind(this);
    this.getSelectedSource = this.getSelectedSource.bind(this);
    this.state = {
      dimmed: false,
      activeKey: 0,
      selectedSource: null,
    };
    this.state.steps = [
      {
        title: 'Shopping Bag',
        icon: 'shopping bag',
        active: true,
        completed: false,
        disabled: false,
        key: 0,
        description: 'Review your items',
        content: (
          <Cart
            cartItems={this.props.cartItems}
            total={this.props.total}
            onCheckoutClicked={() => {}}
          />
        ),
      },
      {
        title: 'Login',
        icon: 'user circle outline',
        active: false,
        completed: false,
        disabled: false,
        key: 1,
        description: 'Login to your account',
        content: <Login />,
      },
      {
        title: 'Shipping',
        icon: 'truck',
        active: false,
        completed: false,
        disabled: false,
        key: 2,
        description: '',
        content: <Shipping />,
      },
      {
        title: 'Billing',
        icon: 'payment',
        active: false,
        completed: false,
        disabled: false,
        key: 3,
        description: 'Enter billing information',
        content: (
          <Elements>
            <Payments setSelectedSource={this.setSelectedSource} />
          </Elements>
        ),
      },
      {
        title: 'Confirm',
        icon: 'info',
        active: false,
        completed: false,
        disabled: false,
        key: 4,
        description: 'Review and place your order',
        content: (
          <Confirm
            getSelectedSource={this.getSelectedSource}
            setDimmer={this.setDimmer}
          />
        ),
      },
    ];
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
  setSelectedSource(source) {
    console.log('setSelectedSource', source);
    this.setState({ selectedSource: source });
  }
  getSelectedSource() {
    return this.state.selectedSource;
  }
  setDimmer(dimmed) {
    this.setState({ dimmed: dimmed });
  }
  render() {
    return (
      <Container style={{ marginTop: '1em', marginBottom: '6em' }}>
        <Segment raised>
          <StepGroup
            size="tiny"
            attached="top"
            ordered={false}
            unstackable={false}
            onClick={this.onStepChange}
            steps={this.state.steps}
          />
          <Dimmer.Dimmable as={Segment} dimmed={this.state.dimmed} attached>
            <Dimmer active={this.state.dimmed} inverted>
              <Loader>Loading</Loader>
            </Dimmer>
            <StepWrapper>{this.getStepContent()} </StepWrapper>
          </Dimmer.Dimmable>
        </Segment>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};
const mapDispatchToProps = dispatch => {
  return {
    onCheckout: cartItems => {
      dispatch(checkout(cartItems));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartWizard);
