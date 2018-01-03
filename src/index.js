import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/storage';

import reduxThunk from 'redux-thunk';
// CSS
import './index.css';
// Semantic CSS
import './semantic/semantic.min.css';

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
const firebaseConfig = require('./firebaseConfig.json');
// react-redux-firebase config
const rrfConfig = {
  // userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase
firebase.firestore();

// Initialize Storage?
const storage = firebase.storage().ref();
// Add reduxFirestore store enhancer to store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
  applyMiddleware(reduxThunk, logger) // firebase instance as first argument
)(createStore);

// Create store with reducers and initial state
const initialState = {};
const store = createStoreWithFirebase(reducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
registerServiceWorker();
