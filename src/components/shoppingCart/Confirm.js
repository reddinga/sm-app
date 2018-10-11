import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { updateQuantity } from '../../actions';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import {
  Button,
  Segment,
  Header,
  Accordion,
  Icon,
  List,
  Grid,
} from 'semantic-ui-react';
import * as actions from '../../actions';
import { toastr } from 'react-redux-toastr';
import Product from './Product';
import getTotalPrice from './getTotalPrice';
import Checkout from './Pay';
class Confirm extends Component {
  constructor(props) {
    super(props);
    this.submitNewCharge = this.submitNewCharge.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.listen = this.listen.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.getCartItemDiv = this.getCartItemDiv.bind(this);
    this.state = {
      activeIndex: -1,
    };
  }
  updateQuantity(idx, qty) {
    console.log('qty', qty);
    this.props.onChangeQuantity({ index: idx, quantity: qty });
  }
  submitNewCharge = ev => {
    ev.preventDefault();
    console.log('newcharge', this.props);
    let source = this.props.getSelectedSource();
    console.log('source', source);
    let totalPrice = this.getTotal();
    console.log('totalPrice', totalPrice);
    this.props.setDimmer(true);
    this.props.firebase
      .push(`/stripe_customers/${this.props.auth.uid}/charges`, {
        source: source, //this.newCharge.source,
        amount: totalPrice, //parseInt(this.newCharge.amount),
      })
      .then(res => {
        console.log('res', res);
        this.props.setDimmer(false);
        toastr.success('Success!', 'Successful purchase!');
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
  getCartItemDiv() {
    let cartItems = this.getCartItems();
    let total = 0.0;
    const productRows = cartItems.map((product, index) => {
      total = total + product.cartItem.price * product.quantity;
      return (
        <Product
          index={index}
          imageUri={product.cartItem.imageUri}
          onUpdateQty={this.updateQuantity}
          title={product.cartItem.title}
          price={product.cartItem.price}
          quantity={product.quantity}
          key={index}
        />
      );
    });
    return (
      <Grid>
        {productRows}
        <Grid.Row>
          <Grid.Column>
            {total > 0 && (
              <p style={{ fontSize: '1.5em' }}>
                Total: &#36;
                {total}
              </p>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  getTotal() {
    let total = getTotalPrice(this.getCartItems());
    return total;
  }
  getCartItems() {
    let cartItems = this.props.getCartItems();
    return cartItems;
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
    const card = this.props.getSelectedCard();
    const address = this.props.getSelectedAddress();
    return (
      <Segment textAlign="center" basic>
        <h2>Confirm Order</h2>

        <Segment textAlign="left" attached="top">
          <Header>
            Order Total: &#36;
            {this.getTotal()}
          </Header>
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
              <div>{this.getCartItemDiv()} </div>
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
        <Checkout
            name={'The Road to learn React'}
            description={'Only the Book'}
            amount={1}
          />
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
const mapDispatchToProps = dispatch => {
  return {
    onChangeQuantity: ({ index, quantity }) => {
      console.log('onChangeQuantity, confirm');
      dispatch(updateQuantity({ index, quantity }));
    },
  };
};
Confirm = firebaseConnect(['stripe_customers'])(Confirm);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Confirm);
