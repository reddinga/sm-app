import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Segment, Form, Button } from 'semantic-ui-react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const required = value => (value ? undefined : 'Required');
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;
const minValue = min => value =>
  value && value < min ? `Must be at least ${min}` : undefined;
const minValue18 = minValue(18);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined;

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.stateSelect = this.stateSelect.bind(this);
    this.state = { country: 'United States', region: '' };
  }

  selectCountry(val) {
    this.setState({ country: val });
  }
  selectRegion(val) {
    this.setState({ region: val });
  }
  stateSelect({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <div>
        <label>{label}</label>
        <RegionDropdown
          {...input}
          country={this.state.country}
          // onChange={val => this.selectRegion(val)}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    );
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const { country, region } = this.state;
    console.log('address props', this.props);
    console.log('address state', this.state);
    return (
      <Segment textAlign="left" basic>
        <Form onSubmit={handleSubmit}>
          <div className="bottomMargin">
            <Field
              name="firstname"
              type="text"
              component={renderField}
              label="First Name"
              validate={[required]}
            />
          </div>
          <div className="bottomMargin">
            <Field
              name="lastname"
              type="text"
              component={renderField}
              label="Last Name"
              validate={[required]}
            />
          </div>

          <div className="bottomMargin">
            <Field
              name="address"
              type="text"
              component={renderField}
              label="Address"
              validate={[required]}
            />
          </div>
          <div className="bottomMargin">
            <Field
              name="address2"
              type="text"
              component={renderField}
              label="Address (cont.)"
            />
          </div>
          <div className="bottomMargin">
            <Field
              name="city"
              type="text"
              component={renderField}
              label="City"
              validate={[required]}
            />
          </div>

          <div className="bottomMargin" hidden={true}>
            <label>Country</label>
            <CountryDropdown
              value={country}
              onChange={val => this.selectCountry(val)}
              disabled={true}
            />
          </div>
          <div className="bottomMargin">
            <Field
              name="state"
              type="text"
              component={this.stateSelect}
              label="State"
              validate={[required]}
            />
          </div>
          <div className="bottomMargin">
            <Field
              name="zip"
              type="text"
              component={renderField}
              label="Zip"
              validate={[required]}
            />
          </div>

          <Button disabled={pristine || submitting} type="submit">
            Add address
          </Button>
        </Form>
      </Segment>
    );
  }
}

AddressForm = reduxForm({
  // a unique name for the form
  form: 'address',
})(AddressForm);

export default AddressForm;
