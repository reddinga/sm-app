export default cartItems => {
  let total = 0;
  cartItems.forEach(product => {
    let productTotal = product.cartItem.price * product.quantity;
    total += productTotal;
  });
  return total;
};
