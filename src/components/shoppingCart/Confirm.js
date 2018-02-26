import React, { Component } from 'react';
import { injectStripe, CardElement } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Button, Segment } from 'semantic-ui-react';
import * as actions from '../../actions';
import { toastr } from 'react-redux-toastr';
class Payments extends Component {
  constructor(props) {
    super(props);
    this.submitNewCharge = this.submitNewCharge.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.listen = this.listen.bind(this);
    this.state = {};
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
  listen = () => {
    console.log('listen', this);
    // used to check if we have this customer in DB, if so, show the forms
    if (this.props.firebase && this.props.auth) {
      /*     this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
        .on(
          'value',
          snapshot => {
            this.charges = snapshot.val();
            console.log('snapshot', snapshot.val());
          },
          () => {
            this.charges = {};
            console.log('empty');
          },
        ); */

      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
        .on('child_removed', event => {
          console.log('child_removed', event.val());
        });
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
      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
        .on('child_moved', event => {
          console.log('child_moved', event.val());
        });

      this.props.firebase
        .database()
        .ref(`/stripe_customers/${this.props.auth.uid}/charges`)
        .on('child_added', event => {
          console.log('child_added', event.val());
          /*
          var eventSnapshot = event.data;
          var profilePictureSnapshot = eventSnapshot.child('profilePicture');
          if (profilePictureSnapshot.changed()) {
            return createThumbnail(profilePictureSnapshot.val()).then(url => {
              return eventSnapshot.ref.update({ profileThumbnail: url });
            });
          } */
        });
    }
  };
  componentWillMount() {
    this.listen();
  }
  render() {
    console.log('confirm props', this.props);
    console.log('confirm state', this.state);
    return (
      <Segment textAlign="center" basic>
        <h2>Confirm Order</h2>

        <Segment textAlign="left">
          <p>cart items & total</p>
        </Segment>
        <Segment textAlign="left">
          <p>shipping</p>
        </Segment>
        <Segment textAlign="left">
          <p>payment</p>
        </Segment>
        <Segment textAlign="left">
          <Button
            style={{ marginTop: '1em' }}
            compact
            onClick={this.submitNewCharge}
          >
            Pay
          </Button>
        </Segment>
      </Segment>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('ms state', state);
  return {
    ...state,
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    push: state.firebase.push,
  };
};

Payments = firebaseConnect(['/stripe_customers'])(Payments);
export default connect(({ firebase }) => ({
  profile: firebase.profile,
  auth: firebase.auth,
}))(Payments);
