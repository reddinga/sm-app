import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import { Redirect, Route } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { Loader, Dimmer } from 'semantic-ui-react';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo/logo_leaf_only.png';
import { emptyCart } from '../../actions';

const STRIPE_PUBLISHABLE = 'pk_live_UBcfb7A102Ubq7iVNGUIqsOS';
const FIREBASE_FUNCTION =
  'https://us-central1-silver-maple-b0405.cloudfunctions.net/charge';
const CURRENCY = 'USD';

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = { dimmed: false };
  }
  async charge(token, amount, currency, order) {
    let res;
    let data = {};
    try {
      res = await fetch(FIREBASE_FUNCTION, {
        method: 'POST',
        mode: 'cors',

        body: JSON.stringify({
          token,
          charge: {
            amount,
            currency,
          },
          order,
        }),
      });
      data = await res.json();
      data.body = JSON.parse(data.body);
    } catch (err) {
      console.log('err', err);
      this.errorPayment(err);
    }
    return data;
  }
  fromUSDToCent(amount) {
    return amount * 100;
  }
  successPayment(orderId) {
    toastr.success('Payment Successful');
    // empty cart
    // testing
    this.props.onEmptyCart();
    // redirect to confirmation page
    this.goToConfirmation(orderId);
  }
  errorPayment(err) {
    toastr.error('Payment Error: ' + err);
  }
  goToConfirmation(orderId) {
    this.setState({ redirect: true, orderId });
  }
  setDimmer(dimmed) {
    console.log('SET DIMMER', dimmed);
    this.setState({ dimmed: dimmed });
  }
  render() {
    let { name, description, amount, order } = this.props;
    return (
      <div>
        {this.state.redirect ? (
          <Redirect push to={`/confirmation/${this.state.orderId}`} />
        ) : (
          <div>
            <Dimmer active={this.state.dimmed} inverted>
              <Loader>Loading</Loader>
            </Dimmer>
            <StripeCheckout
              image={logo}
              name={name}
              description={description}
              amount={this.fromUSDToCent(amount)}
              token={async (token, address) => {
                console.log('address', address);
                console.log('token', token);
                if (
                  !address.shipping_address_country_code ||
                  address.shipping_address_country_code !== 'US'
                ) {
                  // cannot ship outside US
                  toastr.error(
                    "We're sorry, but we currently do not ship outside the US.",
                  );
                } else {
                  this.setDimmer(true);
                  let shippingAddress = {};
                  let addressKeys = Object.keys(address);
                  addressKeys
                    .filter(addy => addy.startsWith('shipping'))
                    .forEach(addKey => {
                      shippingAddress[addKey] = address[addKey];
                    });
                  let billingAddress = {};
                  addressKeys
                    .filter(addy => addy.startsWith('billing'))
                    .forEach(addKey => {
                      billingAddress[addKey] = address[addKey];
                    });
                  order.shippingAddress = shippingAddress;
                  order.billingAddress = billingAddress;
                  order.card = {
                    brand: token.card.brand,
                    last4: token.card.last4,
                  };
                  order.totalPrice = amount;
                  // Pass the received token to our Firebase function
                  let res = await this.charge(
                    token,
                    this.fromUSDToCent(amount),
                    CURRENCY,
                    order,
                  );
                  if (res && res.body && res.body.error) {
                    console.log('ERROR', res.body.error);
                    this.errorPayment(res.body.error);
                  } else {
                    console.log('SUCCESS', res);
                    let orderId = res.body.charge.metadata.orderId;
                    this.successPayment(orderId);
                  }
                }
              }}
              currency={CURRENCY}
              stripeKey={STRIPE_PUBLISHABLE}
              shippingAddress
              billingAddress
            >
              {this.props.children}
            </StripeCheckout>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { ...state };
};
const mapDispatchToProps = dispatch => {
  return {
    onEmptyCart: () => {
      dispatch(emptyCart());
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pay);
