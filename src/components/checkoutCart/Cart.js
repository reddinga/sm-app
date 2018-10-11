import React, { Component } from 'react';
import {
  Header,
  Button,
  Grid,
  Image,
  Segment,
  Container,
} from 'semantic-ui-react';
import Product from './Product';
import Pay from './Pay';
import { connect } from 'react-redux';
import _ from 'lodash';
import { updateQuantity, emptyCart } from '../../actions';
import getTotalPrice from '../common/getTotalPrice';
import poweredByStripe from '../../assets/images/Stripe Badges/Outline Dark/powered_by_stripe.png';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.getCartSection = this.getCartSection.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
  }
  updateQuantity(idx, qty) {
    console.log('qty', qty);
    this.props.onChangeQuantity({ index: idx, quantity: qty });
  }
  getTotal() {
    let total = getTotalPrice(this.props.cartItems);
    return total;
  }
  getOrder() {
    let order = { items: this.props.cartItems };
    console.log('order', order);
    return order;
  }
  getCartSection() {
    let total = 0.0;
    const productRows = this.props.cartItems.map((product, index) => {
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
          changeQty={true}
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
  render() {
    console.log('cart props', this.props);
    console.log('cart state', this.state);
    let hasCartItems = false;
    if (this.props.cartItems && this.props.cartItems.length > 0) {
      hasCartItems = true;
    }
    console.log('this.props.cartItems', this.props.cartItems);
    return (
      <Container style={{ marginTop: '1em', marginBottom: '6em' }}>
        <Segment raised>
          <div style={{ marginTop: '1em' }}>
            <Header as="h2">Shopping Bag</Header>
            <div style={{ marginTop: '2em' }}>
              {hasCartItems ? (
                <div>{this.getCartSection()}</div>
              ) : (
                <em>Your bag is empty.</em>
              )}
            </div>
            <Pay
              name={'Silver Maple Studio'}
              description={'Custom Handmade Florals'}
              amount={this.getTotal()}
              order={this.getOrder()}
            >
              <Button
                primary
                style={{ marginTop: '1em' }}
                disabled={hasCartItems ? false : true}
              >
                Checkout
              </Button>
            </Pay>
            <Button
              secondary
              style={{ marginTop: '1em' }}
              onClick={this.props.onEmptyCart}
              disabled={hasCartItems ? false : true}
            >
              Empty Cart
            </Button>
          </div>
          <Image
            style={{ marginTop: '2em', marginBottom: 0 }}
            href="https://stripe.com"
            as="a"
            target="_blank"
            src={poweredByStripe}
          />
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
    onEmptyCart: cartItems => {
      dispatch(emptyCart());
    },
    onChangeQuantity: ({ index, quantity }) => {
      console.log('onChangeQuantity, cart wizard');
      dispatch(updateQuantity({ index, quantity }));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cart);
