import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import {
  Button,
  Segment,
  Header,
  Accordion,
  Icon,
  List,
} from 'semantic-ui-react';
import * as actions from '../../actions';
import { toastr } from 'react-redux-toastr';
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.submitNewCharge = this.submitNewCharge.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.listen = this.listen.bind(this);
    this.state = {
      activeIndex: -1,
    };
  }
  submitNewCharge = ev => {
    ev.preventDefault();
    console.log('newcharge', this.props);
    let source = this.props.getSelectedSource();
    console.log('source', source);
    this.props.setDimmer(true);
    this.props.firebase
      .push(`/stripe_customers/${this.props.auth.uid}/charges`, {
        source: source, //this.newCharge.source,
        amount: 1000, //parseInt(this.newCharge.amount),
      })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
        this.props.setDimmer(false);
        toastr.error(err);
      });
  };
  componentWillUnmount() {
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
      .off('child_changed');
  }
  listen = () => {
    if (this.props.firebase && this.props.auth) {
      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
        .on('child_changed', event => {
          const changedChild = event.val();
          console.log('child_changed', changedChild);

          this.props.setDimmer(false);
          if (changedChild.error) {
            console.log('charge error', changedChild.error);

            toastr.error(changedChild.error);
          } else if (changedChild.status === 'succeeded') {
            toastr.success('Payment processed!');
          }
        });
    }
  };
  componentWillMount() {
    this.listen();
  }
  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };
  render() {
    console.log('confirm props', this.props);
    console.log('confirm state', this.state);
    const { activeIndex } = this.state;
    const source = this.props.getSelectedSource();
    const card = this.props.getSelectedCard();
    const address = this.props.getSelectedAddress();
    const cartItems = this.props.getCartItems();
    const total = this.props.total;
    return (
      <Segment textAlign="center" basic>
        <h2>Confirm Order</h2>

        <Segment textAlign="left" attached="top">
          <Header>Order Total: &#36;{total}</Header>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleAccordionClick}
            >
              <Icon name="dropdown" />
              Your Items
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              List Items Here
              <p>{cartItems}</p>
            </Accordion.Content>
          </Accordion>
        </Segment>
        <Segment textAlign="left" attached>
          <Header>Shipping Address</Header>
          <List>
            <List.Item>
              {address.firstname} {address.lastname}
            </List.Item>
            <List.Item> {address.address}</List.Item>
            {address.address2 && <List.Item>{address.address2}</List.Item>}
            <List.Item> {address.city}</List.Item>
            <List.Item> {address.state}</List.Item>
            <List.Item> {address.zip}</List.Item>
          </List>
        </Segment>
        <Segment textAlign="left" attached="bottom">
          <Header>Payment</Header>
          <p>
            <Icon name={card.icon} />

            {card.text}
          </p>
        </Segment>
        <Button
          primary
          style={{ marginTop: '1em' }}
          compact
          onClick={this.submitNewCharge}
        >
          Pay
        </Button>
      </Segment>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    ...state,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    push: state.firebase.push,
  };
};

Confirm = firebaseConnect(['stripe_customers'])(Confirm);
export default connect(({ firebase }) => ({
  profile: firebase.profile,
  auth: firebase.auth,
}))(Confirm);
