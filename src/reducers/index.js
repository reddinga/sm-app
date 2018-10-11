import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { reducer as formReducer } from 'redux-form';
import * as types from '../actions/types';

function style(state = null, action) {
  //  console.log('style action: ', action);
  switch (action.type) {
    case types.SET_STYLE:
      return action.id;
    default:
      return state;
  }
}
function design(state = null, action) {
  // console.log('design action: ', action);
  switch (action.type) {
    case types.SET_DESIGN:
      return action.id;
    default:
      return state;
  }
}
function designOptions(state = null, action) {
  // console.log('designOptions action: ', action);
  switch (action.type) {
    case types.SET_DESIGN_OPTIONS:
      return action.opts;
    default:
      return state;
  }
}
function customDesign(state = null, action) {
  // console.log('customDesign action: ', action);
  switch (action.type) {
    case types.SET_CUSTOMIZATIONS:
      // get product total price
      if (
        action.customizations &&
        action.customizations.base &&
        action.customizations.base.price
      ) {
        let total = action.customizations.base.price;
        if (
          action.customizations.addedOptions &&
          action.customizations.addedOptions.length > 0
        )
          action.customizations.addedOptions.forEach(opt => {
            total += opt.price;
          });
        action.customizations.price = total;
      }
      return action.customizations;
    default:
      return state;
  }
}
function designComplete(state = false, action) {
  // console.log('designComplete action: ', action);
  switch (action.type) {
    case types.SET_DESIGN_COMPLETE:
      return action.complete;
    default:
      return state;
  }
}

function cartItems(state = [], action) {
  //  console.log('cartItems action: ', action);
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
      let updatedItems;
      if (action.quantity === 0) {
        // remove from cart
        updatedItems = state;
        updatedItems.splice(action.index, 1);
      } else {
        updatedItems = state.map((cartItem, index) => {
          if (index === action.index) {
            return Object.assign({}, cartItem, {
              quantity: action.quantity,
            });
          }
          return cartItem;
        });
      }

      console.log('updatedItems', updatedItems);
      return updatedItems;

    case types.SET_LAST_URI:
      // if last item added has no URI, it must have just been added to store
      // update uri
      if (state.length > 0) {
        let lastItem = state[state.length - 1];
        if (
          lastItem &&
          lastItem.cartItem &&
          lastItem.cartItem.imageUri === null &&
          action.customizations &&
          action.customizations.imageUri
        ) {
          lastItem.cartItem.imageUri = action.customizations.imageUri;
          state[state.length - 1] = lastItem;
        }
      }
      return state;
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
