import * as types from './types';

export function setStyle(id) {
  return { type: types.SET_STYLE, id };
}
export function setDesign(id) {
  return { type: types.SET_DESIGN, id };
}
export function setDesignOptions(opts) {
  return { type: types.SET_DESIGN_OPTIONS, opts };
}
export function setCustomizations(customizations) {
  return { type: types.SET_CUSTOMIZATIONS, customizations };
}
export function setDesignComplete(complete) {
  return { type: types.SET_DESIGN_COMPLETE, complete };
}
export function addToCart(item) {
  return { type: types.ADD_TO_CART, item };
}
export function updateQuantity({ index, quantity }) {
  return {
    type: types.UPDATE_CART_ITEM_QUANTITY,
    index: index,
    quantity: quantity,
  };
}
export function checkout(items) {
  return { type: types.CHECKOUT_REQUEST, items };
}
