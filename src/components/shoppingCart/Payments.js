import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Segment } from 'semantic-ui-react';
import * as actions from '../../actions';
import CardList from './CardList';
class Payments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sources: {},
      stripeCustomerInitialized: false,
    };
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
  /*   listen = () => {
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
  }; */

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
      <Segment textAlign="center" basic>
        <h2>Billing</h2>

        <Segment textAlign="left">
          <CardList
            sources={this.props.sources}
            onSelectCard={this.props.setSelectedSource}
          />
        </Segment>
        <Segment textAlign="left">
          <h2>New Card</h2>
          <form onSubmit={this.handleSubmit}>
            <CardElement style={{ base: { fontSize: '18px' } }} />

            <Button style={{ marginTop: '1em' }} compact>
              Add card
            </Button>
          </form>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('ms state', state);
  let data = state.firebase.data.stripe_customers
    ? state.firebase.data.stripe_customers[state.firebase.auth.uid].sources
    : {};
  console.log('data', data);
  return {
    ...state,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    sources: data,
  };
};
export default injectStripe(
  compose(
    firebaseConnect(['stripe_customers']), // withFirebase can also be used
    connect(mapStateToProps, actions),
  )(Payments),
);
