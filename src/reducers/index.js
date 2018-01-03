import { combineReducers } from 'redux';
import { firebaseStateReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import {
  SET_STYLE,
  SET_DESIGN,
  SET_DESIGN_OPTIONS,
  SET_CUSTOMIZATIONS,
} from '../actions';

function style(state = null, action) {
  console.log('action: ', action);
  switch (action.type) {
    case SET_STYLE:
      return action.id;
    default:
      return state;
  }
}
function design(state = null, action) {
  switch (action.type) {
    case SET_DESIGN:
      return action.id;
    default:
      return state;
  }
}
function designOptions(state = null, action) {
  switch (action.type) {
    case SET_DESIGN_OPTIONS:
      return action.opts;
    default:
      return state;
  }
}
function customizations(state = null, action) {
  console.log(action);
  switch (action.type) {
    case SET_CUSTOMIZATIONS:
      return action.customizations;
    default:
      return state;
  }
}
// Add Firebase to reducers
const reducers = combineReducers({
  style,
  design,
  designOptions,
  customizations,
  firebase: firebaseStateReducer,
  firestore: firestoreReducer,
});

export default reducers;
