import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Segment } from 'semantic-ui-react';
import * as actions from '../../actions';
import CardDropdown from './CardDropdown';
import { toastr } from 'react-redux-toastr';
import getCardIcon from '../common/getCardIcon';
class Payments extends Component {
  constructor(props) {
    super(props);
    this.listen = this.listen.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      sources: {},
      stripeCustomerInitialized: false,
    };
  }
  componentWillMount() {
    this.listen();
  }
  handleSubmit = ev => {
    ev.preventDefault();
    this.props.setDimmer(true);
    this.props.stripe
      .createToken({ name: this.props.auth.displayName })
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        this.props.firebase
          .database()
          .ref(`/stripe_customers/${this.props.auth.uid}/sources`)
          .push({ token: token.id })
          .then(() => {
            console.log('card token saved');
          })
          .catch(err => {
            toastr.error(err);
          });
      })
      .catch(err => {
        toastr.error(err);
      });
  };
  componentWillUnmount() {
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/`)
      .off('value');
    this.props.firebase
      .database()
      .ref(`/stripe_customers/${this.props.auth.uid}/sources`)
      .off('child_changed');
  }
  listen = () => {
    console.log('listen payments.js ');
    if (this.props.firebase && this.props.auth) {
      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/`)
        .on(
          'value',
          snapshot => {
            console.log('listen payments.js value');
            this.setState({
              stripeCustomerInitialized: snapshot.val() !== null,
            });
          },
          () => {
            this.setState({ stripeCustomerInitialized: false });
          },
        );

      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/sources`)
        .on('child_changed', event => {
          const changedChild = event.val();
          console.log('child_changed', changedChild);

          this.props.setDimmer(false);
          if (changedChild.error) {
            console.log('charge error', changedChild.error);

            toastr.error(changedChild.error);
          } else {
            toastr.success('Card added!');
            const brand = getCardIcon(changedChild.brand);
            const card = { text: changedChild.last4, icon: brand };
            this.props.setSelectedCard(card);
            this.props.setSelectedSource(changedChild.id);
          }
        });
    }
  };

  render() {
    console.log('props', this.props);
    console.log('state', this.state);

    return (
      <Segment textAlign="center" basic>
        <h2>Billing</h2>

        <Segment textAlign="left">
          <CardDropdown
            sources={this.props.sources}
            onSelectCard={this.props.setSelectedSource}
            getSelectedSource={this.props.getSelectedSource}
            setSelectedCard={this.props.setSelectedCard}
          />
        </Segment>
        <Segment textAlign="left">
          <h4>New Card</h4>
          <form onSubmit={this.handleSubmit}>
            <CardElement />

            <Button primary style={{ marginTop: '1em' }} compact>
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
/* export default injectStripe(
  compose(
    firebaseConnect(['stripe_customers']), // withFirebase can also be used
    connect(mapStateToProps, actions),
  )(Payments),
);
 */
Payments = firebaseConnect(['stripe_customers'])(Payments);
export default injectStripe(connect(mapStateToProps, actions)(Payments));
