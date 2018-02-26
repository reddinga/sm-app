import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Segment, Form } from 'semantic-ui-react';
import AddressForm from './AddressForm';

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitAddress = this.handleSubmitAddress.bind(this);
    this.state = { country: 'United States', region: '' };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }
  componentWillReceiveProps(nextProps) {
    console.log('ComponentWillReceiveProps', nextProps);
  }
  handleSubmitAddress(address) {
    console.log('address', address);
    this.props.firebase.updateProfile(address);
    // trigger storing address in firebase
  }
  render() {
    console.log('render Shipping', this);
    const { firebase, auth, profile } = this.props;
    console.log(isLoaded(auth));
    const { country, region } = this.state;
    let initialValues = {};
    if (!isLoaded(profile)) {
      console.log('handle not loaded profile');
    } else {
      // check for saved address
      console.log(profile);
      if (profile.address) {
        initialValues = profile;
      }
    }

    return (
      <Segment textAlign="center" basic>
        <h2>Shipping</h2>

        <AddressForm
          initialValues={initialValues}
          onSubmit={this.handleSubmitAddress}
        />
      </Segment>
    );
  }
}
Shipping.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth, profile } }) => ({ auth, profile })),
)(Shipping);
