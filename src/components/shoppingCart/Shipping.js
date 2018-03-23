import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Segment, Form, Select, Accordion, Icon } from 'semantic-ui-react';
import AddressForm from './AddressForm';
import AddressDropdown from './AddressDropdown';
import { toastr } from 'react-redux-toastr';

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.listen = this.listen.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.handleSelectAddress = this.handleSelectAddress.bind(this);
    this.handleSubmitAddress = this.handleSubmitAddress.bind(this);
    this.state = {
      country: 'United States',
      region: '',
      activeIndex: -1,
    };
  }
  componentWillMount() {
    this.listen();
  }
  selectCountry(val) {
    this.setState({ country: val });
  }
  selectRegion(val) {
    this.setState({ region: val });
  }
  handleSelectAddress(address) {
    // use this address for payment
    this.props.setSelectedAddress(address);
    // allow clicking next
  }
  handleSubmitAddress(address) {
    this.props.setDimmer(true);
    console.log('address', address);
    let addresses = [];
    if (
      this.props.profile &&
      this.props.profile.addresses &&
      Array.isArray(this.props.profile.addresses) &&
      this.props.profile.addresses.length > 0
    ) {
      addresses = this.props.profile.addresses;
    }
    addresses.push(address);
    // trigger storing address in firebase

    this.props.firebase
      .updateProfile({ addresses: addresses })
      .then(res => {
        console.log('res', res);
      })
      .catch(err => {
        console.log('err', err);
        this.props.setDimmer(false);
        toastr.error(err);
      });
  }
  componentWillUnmount() {
    this.props.firebase
      .database()
      .ref(`/users/${this.props.auth.uid}/addresses`)
      .off('child_added');
  }
  listen = () => {
    if (this.props.firebase && this.props.auth) {
      let addressLength = 0;
      if (this.props.profile.addresses) {
        addressLength = this.props.profile.addresses.length;
      }
      this.props.firebase
        .database()
        .ref(`/users/${this.props.auth.uid}/addresses`)
        .on('child_added', (event, prevChildKey) => {
          console.log('child_added event', event);
          console.log('child_added prevChildKey', prevChildKey);
          console.log('child_added addressLength', addressLength);
          if (
            (prevChildKey !== null && prevChildKey >= addressLength - 1) ||
            (prevChildKey === null && addressLength === 0)
          ) {
            const newAddress = event.val();
            console.log('address add succeeded!', newAddress);

            this.handleSelectAddress(newAddress);
            this.props.setDimmer(false);
            toastr.success('Address added!');
          }
        });
    }
  };

  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    console.log('render Shipping', this);
    const { country, region, activeIndex } = this.state;
    const { firebase, auth, profile } = this.props;

    return (
      <Segment textAlign="center" basic>
        <h2>Shipping</h2>
        <Segment textAlign="left">
          <AddressDropdown
            addresses={
              this.props.profile && this.props.profile.addresses
                ? this.props.profile.addresses
                : []
            }
            getSelectedAddressValue={this.props.getSelectedAddressValue}
            setSelectedAddressValue={this.props.setSelectedAddressValue}
            onSelectAddress={this.handleSelectAddress}
          />
        </Segment>
        <Segment textAlign="left">
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleAccordionClick}
            >
              <Icon name="dropdown" />
              Add new Address
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <AddressForm onSubmit={this.handleSubmitAddress} />
            </Accordion.Content>
          </Accordion>
        </Segment>
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
