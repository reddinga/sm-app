import React from 'react';
import PropTypes from 'prop-types';
import { Header, Button } from 'semantic-ui-react';
import Product from './Product';

const Cart = ({ cartItems, onCheckoutClicked }) => {
  let hasCartItems = false;
  if (cartItems && cartItems.length > 0) {
    hasCartItems = true;
  }
  let total = 0.0;
  const nodes = hasCartItems ? (
    cartItems.map((product, index) => {
      total = total + product.cartItem.price * product.quantity;
      return (
        //    <Item></Item>
        <Product
          title={product.cartItem.title}
          price={product.cartItem.price}
          quantity={product.quantity}
          key={index}
        />
      );
    })
  ) : (
    <em>Your bag is empty.</em>
  );
  console.log('cartItems cart', cartItems);
  return (
    <div style={{ marginTop: '1em' }}>
      <Header as="h1">Shopping Bag</Header>
      <div>{nodes}</div>
      {total > 0 && <p style={{ fontSize: '1.5em' }}>Total: &#36;{total}</p>}
      <Button
        style={{ marginTop: '1em' }}
        onClick={onCheckoutClicked}
        disabled={hasCartItems ? false : true}
      >
        Checkout
      </Button>
    </div>
  );
};

Cart.propTypes = {
  cartItems: PropTypes.array,
  onCheckoutClicked: PropTypes.func,
};

export default Cart;
