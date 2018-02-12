import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button } from 'semantic-ui-react';
import * as actions from '../../actions';
import CardList from './CardList';

class Payments extends Component {
  constructor(props) {
    super(props);
    this.listen = this.listen.bind(this);
    this.state = {
      sources: {},
      stripeCustomerInitialized: false,
    };

    this.listen();
  }

  handleSubmit = ev => {
    console.log('handleSubmit', ev);
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
    this.props.stripe
      .createToken({ name: this.props.auth.displayName })
      .then(({ status, token }) => {
        console.log('Received Stripe token:', token);
        if (status !== 'succeeded') {
          console.log(token.error);
        } else {
          this.props.firebase
            .database()
            .ref(`/stripe_customers/${this.props.auth.uid}/sources`)
            .push({ token: token.id })
            .then(() => {
              console.log(
                'card saved--> should clear form and add card to saved cards',
              );
            });
        }
      })
      .catch(err => {
        console.log('err saving card', err);
      });
  };
  listen = () => {
    console.log('listen', this);
    // used to check if we have this customer in DB, if so, show the forms
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/customer_id`)
      .on(
        'value',
        snapshot => {
          this.setState({ stripeCustomerInitialized: snapshot.val() !== null });
        },
        () => {
          this.setState({ stripeCustomerInitialized: false });
        },
      );
    // show saved 'sources'/cards
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/sources`)
      .on(
        'value',
        snapshot => {
          this.setState({ sources: snapshot.val() });
        },
        () => {
          this.setState({});
        },
      );
  };

  submitNewCharge = () => {
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
      .push({
        source: '', //this.newCharge.source,
        amount: 1, //parseInt(this.newCharge.amount),
      });
  };

  render() {
    console.log('props', this.props);

    console.log('state', this.state);
    /*
    // Create an instance of the card Element
    var card = elements.create('card', {style: style});

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element.
    card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    }); */
    return (
      <div>
        <h2>Payments</h2>
        <h2>Saved Cards</h2>
        <CardList sources={this.state.sources} />
        <h2>Add New Card</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Card details
            <CardElement style={{ base: { fontSize: '18px' } }} />
          </label>
          <Button>Add card</Button>
        </form>
      </div>
    );
  }
}
export default injectStripe(
  compose(
    firebaseConnect(), // withFirebase can also be used
    connect(({ firebase: { auth, profile } }) => ({ auth, profile }), actions),
  )(Payments),
);
