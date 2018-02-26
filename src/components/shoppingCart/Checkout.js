import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class TakeMoney extends React.Component {
  onToken = token => {
    console.log('token: ', token);
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/sources`)
      .push({ token: token.id })
      .then(() => {
        console.log(
          'card saved--> should clear form and add card to saved cards',
        );
        this.props.firebase
          .database()
          .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
          .push({
            source: token.card.id, //this.newCharge.source,
            amount: this.props.totalPayment,
          });
      });
  };

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_a3MHx3gWetXNtlpIAh1BABJm"
        amount={this.props.totalPayment}
      />
    );
  }
}

TakeMoney.defaultProps = {
  totalPayment: 1000,
};
export default injectStripe(
  compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth, profile } }) => ({ auth, profile })),
  )(TakeMoney),
);
