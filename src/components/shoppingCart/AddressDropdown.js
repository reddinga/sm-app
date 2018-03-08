import React, { Component } from 'react';
import { Segment, Select } from 'semantic-ui-react';

class AddressDropdown extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.state = {
      savedAddresses: this.getAddresses(this.props.addresses),
    };
  }
  getAddresses(addresses) {
    let savedAddresses = [];
    if (addresses) {
      console.log('getAddresses has address', addresses);
      console.log('getAddresses has address', addresses.length);
      Object.keys(addresses).forEach(addressIdx => {
        const addressVal = addresses[addressIdx];
        savedAddresses.push({
          key: addressIdx,
          value: addressIdx,
          text: addressVal.address,
        });
      });
    } else {
      console.log('getAddresses no address', addresses);
    }
    return savedAddresses;
  }
  handleChange = (e, { value }) => {
    this.setState({ selectedAddressValue: value });
    this.props.setSelectedAddressValue(value);
    if (this.props.addresses[value]) {
      this.props.onSelectAddress(this.props.addresses[value]);
    }
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.addresses !== nextProps.addresses) {
      console.log('SHIPPING componentWillReceiveProps update', nextProps);
      this.setState({ savedAddresses: this.getAddresses(nextProps.addresses) });
    }
    console.log('SHIPPING componentWillReceiveProps', nextProps);
  }
  render() {
    console.log(this.props);
    console.log('savedAddresses', this.state.savedAddresses);
    let propsSelectedAddressValue = this.props.getSelectedAddressValue();
    let value = null;
    if (propsSelectedAddressValue) {
      console.log('Selected address from props', propsSelectedAddressValue);
      value = propsSelectedAddressValue;
    } else if (this.state.selectedAddressValue) {
      console.log('Selected address from state');
      value = this.state.selectedAddressValue;
    }
    if (this.state.savedAddresses && this.state.savedAddresses.length > 0) {
      return (
        <div>
          <h4>Saved Addresses</h4>
          <Select
            onChange={this.handleChange}
            placeholder="Select address"
            options={this.state.savedAddresses}
            value={value}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h4>Saved Addresses</h4>
          <p>No saved addresses</p>
        </div>
      );
    }
  }
}

export default AddressDropdown;
