import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Button, Grid } from 'semantic-ui-react';
import Product from './Product';

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
  getCartSection(cartItems) {
    let total = 0.0;
    const productRows = cartItems.map((product, index) => {
      total = total + product.cartItem.price * product.quantity;
      return (
        <Product
          index={index}
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
              <p style={{ fontSize: '1.5em' }}>Total: &#36;{total}</p>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  render() {
    let { onCheckoutClicked } = this.props;
    let cartItems = this.props.getCartItems();
    let hasCartItems = false;
    if (cartItems && cartItems.length > 0) {
      hasCartItems = true;
    }
    console.log('cartItems', cartItems);
    return (
      <div style={{ marginTop: '1em' }}>
        <Header as="h2">Shopping Bag</Header>
        <div>
          {hasCartItems ? (
            <div>
              {this.getCartSection(cartItems)}
              <Button
                primary
                style={{ marginTop: '1em' }}
                onClick={onCheckoutClicked}
                disabled={hasCartItems ? false : true}
              >
                Checkout
              </Button>{' '}
            </div>
          ) : (
            <em>Your bag is empty.</em>
          )}
        </div>
      </div>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.array,
  onCheckoutClicked: PropTypes.func,
};

export default Cart;
