import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Elements } from 'react-stripe-elements';
import { Dimmer, Loader, Segment, Container } from 'semantic-ui-react';
import _ from 'lodash';

import StepGroup from '../common/StepGroup';
import StepWrapper from '../common/StepWrapper';
import { checkout, updateQuantity, emptyCart } from '../../actions';
import Cart from './Cart';
import Login from './Login';
import Shipping from './Shipping';
import Payments from './Payments';
import Confirm from './Confirm';
import BackButton from '../common/BackButton';
import NextButton from '../common/NextButton';
import StepControlButtons from '../common/StepControlButtons';

class CartWizard extends Component {
  constructor(props) {
    super(props);
    this.onStepChange = this.onStepChange.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.backStep = this.backStep.bind(this);
    this.getCartItems = this.getCartItems.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.setDimmer = this.setDimmer.bind(this);
    this.setProfile = this.setProfile.bind(this);
    this.getSelectedAddressValue = this.getSelectedAddressValue.bind(this);
    this.setSelectedAddressValue = this.setSelectedAddressValue.bind(this);
    this.setSelectedAddress = this.setSelectedAddress.bind(this);
    this.getSelectedAddress = this.getSelectedAddress.bind(this);
    this.setSelectedCard = this.setSelectedCard.bind(this);
    this.getSelectedCard = this.getSelectedCard.bind(this);
    this.setSelectedSource = this.setSelectedSource.bind(this);
    this.getSelectedSource = this.getSelectedSource.bind(this);
    this.getStepControlButtons = this.getStepControlButtons.bind(this);
    this.state = {
      dimmed: false,
      activeKey: 0,
      selectedSource: null,
      selectedAddress: null,
      selectedAddressValue: null,
      cartItems: this.props.cartItems ? this.props.cartItems : null,
    };
    this.state.steps = [
      {
        title: 'Shopping Bag',
        icon: 'shopping bag',
        active: true,
        completed: false,
        disabled: false,
        key: 0,
        description: '',
        content: (
          <Cart
            getCartItems={this.getCartItems}
            total={this.props.total}
            onChangeQuantity={this.props.onChangeQuantity}
            onCheckoutClicked={() => {}}
            onEmptyCart={this.props.onEmptyCart}
          />
        ),
      },
      {
        title: 'Login',
        icon: 'user circle outline',
        active: false,
        completed: false,
        disabled: false, // for now with testing with empty cart
        key: 1,
        description: 'Login to your account',
        content: (
          <div>
            <Login setProfile={this.setProfile} />
          </div>
        ),
      },
      {
        title: 'Shipping',
        icon: 'truck',
        active: false,
        completed: false,
        disabled: true,
        key: 2,
        description: 'Enter your shipping address',
        content: (
          <div>
            <Shipping
              setSelectedAddress={this.setSelectedAddress}
              getSelectedAddress={this.getSelectedAddress}
              getSelectedAddressValue={this.getSelectedAddressValue}
              setSelectedAddressValue={this.setSelectedAddressValue}
              setDimmer={this.setDimmer}
            />
          </div>
        ),
      },
      {
        title: 'Payment',
        icon: 'payment',
        active: false,
        completed: false,
        disabled: true,
        key: 3,
        description: 'Enter your billing information',
        content: (
          <div>
            <Elements>
              <Payments
                getSelectedSource={this.getSelectedSource}
                setSelectedSource={this.setSelectedSource}
                setSelectedCard={this.setSelectedCard}
                setDimmer={this.setDimmer}
              />
            </Elements>
          </div>
        ),
      },
      {
        title: 'Confirm',
        icon: 'info',
        active: false,
        completed: false,
        disabled: false, // Testing
        key: 4,
        description: 'Review and place your order',
        content: (
          <div>
            <Confirm
              getSelectedSource={this.getSelectedSource}
              getSelectedCard={this.getSelectedCard}
              getSelectedAddress={this.getSelectedAddress}
              getCartItems={this.getCartItems}
              total={this.props.total}
              setDimmer={this.setDimmer}
            />
          </div>
        ),
      },
    ];
  }
  componentWillReceiveProps(nextProps) {
    console.log('nextProps cart wizard', nextProps);
    if (nextProps !== this.props) {
      console.log('nextProps SET STATE');
      this.setState({ cartItems: nextProps.cartItems }, () => {
        console.log('state', this.state.cartItems);
      });
    }
  }
  getCartItems() {
    console.log('getCartItems', this.state.cartItems);
    return this.state.cartItems;
  }
  getStepControlButtons() {
    if (
      this.state.activeKey > 0 &&
      this.state.activeKey < this.state.steps.length - 1
    ) {
      let nextStepEnabled = false;
      if (this.state.steps[this.state.activeKey].completed === true) {
        nextStepEnabled = true;
      }
      return (
        <StepControlButtons
          onClickBack={this.backStep}
          onClickNext={this.nextStep}
          nextStepEnabled={nextStepEnabled}
        />
      );
    } else {
      return <div />;
    }
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
  // go back a step
  backStep() {
    const newActive = this.state.activeKey - 1;
    this.onStepChange(newActive);
  }
  // go to next step
  nextStep() {
    const newActive = this.state.activeKey + 1;
    this.onStepChange(newActive);
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
    console.log('setCompleted');
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
    console.log('setUnCompleted');
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
  setProfile(profile) {
    console.log('setProfile', profile);
    this.setState({ profile: profile });
    this.toggleCompleted(profile);
  }
  getSelectedAddressValue() {
    return this.state.selectedAddressValue;
  }
  setSelectedAddressValue(value) {
    this.setState({ selectedAddressValue: value });
  }
  setSelectedAddress(address) {
    console.log('setSelectedAddress', address);
    this.setState({ selectedAddress: address });
    this.toggleCompleted(address);
  }
  getSelectedAddress() {
    console.log('getSelectedAddress', this.state.selectedAddress);
    return this.state.selectedAddress;
  }
  setSelectedCard(card) {
    this.setState({ selectedCard: card });
  }
  getSelectedCard() {
    return this.state.selectedCard;
  }
  setSelectedSource(source) {
    console.log('setSelectedSource', source);
    this.toggleCompleted(source);
    this.setState({ selectedSource: source });
  }
  getSelectedSource() {
    return this.state.selectedSource;
  }
  setDimmer(dimmed) {
    console.log('SET DIMMER', dimmed);
    this.setState({ dimmed: dimmed });
  }
  // get content for component of this step
  getStepContent() {
    return this.state.steps[this.state.activeKey].content;
  }
  render() {
    console.log('cartwizardstate', this.state);
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
          <Dimmer.Dimmable
            as={Segment}
            style={{ paddingBottom: '3em' }}
            dimmed={this.state.dimmed}
            attached
          >
            <Dimmer active={this.state.dimmed} inverted>
              <Loader>Loading</Loader>
            </Dimmer>
            <StepWrapper>
              {this.getStepContent()}
              {this.getStepControlButtons()}
            </StepWrapper>
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
    onEmptyCart: cartItems => {
      dispatch(emptyCart());
    },
    onChangeQuantity: ({ index, quantity }) => {
      dispatch(updateQuantity({ index, quantity }));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartWizard);
