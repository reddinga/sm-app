export default brand => {
  let iconName;
  switch (brand) {
    case 'Visa':
      iconName = 'visa';
      break;
    case 'American Express':
      iconName = 'american express';
      break;
    case 'Mastercard':
      iconName = 'mastercard';
      break;
    case 'Discover':
      iconName = 'discover';
      break;
    default:
      iconName = 'credit card alternative';
      break;
  }
  return iconName;
};
