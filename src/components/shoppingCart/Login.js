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
  }
  componentWillReceiveProps(nextProps) {
    console.log('ComponentWillReceiveProps', nextProps);
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
    return (
      <div>
        {/*       <button // <GoogleButton/> button can be used instead
          onClick={() => firebase.login({ provider: 'google', type: 'popup' })}
        >
          Login With Google
        </button> */}
        <Segment>
          {isLoaded(auth) && !isEmpty(auth) ? (
            <div style={{ margin: '1em' }}>
              <h3>Continue as </h3>
              <h3>
                {profile.displayName} <br />
                {profile.email}
                <br /> <br />
                or
                <br />
              </h3>
            </div>
          ) : isEmpty(auth) ? (
            <h3>Login to Continue</h3>
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
