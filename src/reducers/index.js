import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import * as types from '../actions/types';

function style(state = null, action) {
  console.log('style action: ', action);
  switch (action.type) {
    case types.SET_STYLE:
      return action.id;
    default:
      return state;
  }
}
function design(state = null, action) {
  console.log('design action: ', action);
  switch (action.type) {
    case types.SET_DESIGN:
      return action.id;
    default:
      return state;
  }
}
function designOptions(state = null, action) {
  console.log('designOptions action: ', action);
  switch (action.type) {
    case types.SET_DESIGN_OPTIONS:
      return action.opts;
    default:
      return state;
  }
}
function customDesign(state = null, action) {
  console.log('customDesign action: ', action);
  switch (action.type) {
    case types.SET_CUSTOMIZATIONS:
      return action.customizations;
    default:
      return state;
  }
}
function designComplete(state = false, action) {
  console.log('designComplete action: ', action);
  switch (action.type) {
    case types.SET_DESIGN_COMPLETE:
      return action.complete;
    default:
      return state;
  }
}

function cartItems(state = [], action) {
  console.log('cartItems action: ', action);
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        {
          cartItem: action.item,
          quantity: 1,
        },
      ];
    case 'EMPTY_CART':
      return [];
    case 'UPDATE_CART_ITEM_QUANTITY':
      console.log('update qty reducer', action);
      console.log('state', state);
      let test = state.map((cartItem, index) => {
        if (index === action.index) {
          return Object.assign({}, cartItem, {
            quantity: action.quantity,
          });
        }
        return cartItem;
      });
      console.log('test', test);
      return test;
    default:
      return state;
  }
}

// Add Firebase to reducers
const reducers = combineReducers({
  style,
  designComplete,
  design,
  designOptions,
  customDesign, // `googleUser` from the onsuccess Google Sign In callback
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  cartItems,
  toastr: toastrReducer,
  form: formReducer,
});

export default reducers;
