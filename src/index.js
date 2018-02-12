import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// fonts
import 'typeface-montserrat';
import 'typeface-abhaya-libre';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

import { StripeProvider } from 'react-stripe-elements';
import reduxThunk from 'redux-thunk';
// CSS
import './index.css';
// Semantic CSS
import './semantic/semantic.min.css';
// React redux toastr CSS
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './components/App';
import reducers from './reducers';

// ------------------ react-redux logger------------------
function logger({ getState }) {
  return next => action => {
    console.log('will dispatch', action);
    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action);
    console.log('state after dispatch', getState());
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}
// ------------------ react-redux-firestore ------------------
const devConfig = require('./firebaseConfig.json');
// TODO: add production app and configuration to separate the dbs
const prodConfig = ''; //require('./firebaseConfigProduction.json');
const firebaseConfig =
  process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  attachAuthIsReady: true, // attaches auth is ready promise to store
  firebaseStateName: 'firebase', // should match the reducer name ('firebase' is default)
  //useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Initialize Storage?
firebase.storage().ref();
// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
  applyMiddleware(
    // Pass getFirebase function as extra argument
    reduxThunk.withExtraArgument(getFirebase),
    logger,
  ), // firebase instance as first argument
)(createStore);

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(reducers, initialState);
// Listen for auth ready (promise available on store thanks to attachAuthIsReady: true config option)
store.firebaseAuthIsReady.then(() => {
  console.log('Auth has loaded'); // eslint-disable-line no-console
});
ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey={'pk_test_a3MHx3gWetXNtlpIAh1BABJm'}>
      <App />
    </StripeProvider>
  </Provider>,

  document.querySelector('#root'),
);
registerServiceWorker();
