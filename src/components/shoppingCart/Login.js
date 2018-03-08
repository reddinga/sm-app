import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import GoogleButton from 'react-google-button'; // optional
import { Segment } from 'semantic-ui-react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    console.log('login componentWillReceiveProps', nextProps);

    this.updateProfile(nextProps);
  }
  componentDidMount() {
    console.log('login componentDidMount', this.props);
    this.updateProfile();
  }
  updateProfile(nextProps) {
    if (!nextProps) {
      nextProps = this.props;
    }
    console.log('updating profile nextProps', nextProps);
    if (isLoaded(nextProps.auth) && !isEmpty(nextProps.auth)) {
      console.log('setProfile');
      this.props.setProfile(nextProps.profile);
    } else {
      console.log('setProfile null');
      this.props.setProfile(null);
    }
  }
  signOut() {
    this.props.firebase.logout();
  }
  render() {
    console.log('render Login', this);
    const { firebase, auth, profile } = this.props;
    console.log('render auth', auth);
    console.log('render profile', profile);
    console.log(isLoaded(auth));
    console.log(isEmpty(auth));

    return (
      <div>
        <Segment basic>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <div style={{ margin: '1em' }}>
              <h4>Continue as </h4>
              <h4>{profile.displayName} </h4>
              <p>{profile.email}</p>
              <h4>or</h4>
            </div>
          ) : isEmpty(auth) ? (
            <h4>Login to Continue</h4>
          ) : (
            <div />
          )}
          <GoogleButton
            style={{ margin: 'auto' }}
            scope="profile email"
            width={240}
            height={50}
            theme="dark"
            onClick={() =>
              firebase.login({ provider: 'google', type: 'popup' })
            }
          />
        </Segment>

        {/*       <button onClick={this.signOut}>Logout</button> */}
      </div>
    );
  }
}
Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
  }),
  auth: PropTypes.object,
};

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth, profile } }) => ({ auth, profile })),
)(Login);
