import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emptyCart } from '../../actions';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import {
  Segment,
  Header,
  Accordion,
  Icon,
  List,
  Grid,
} from 'semantic-ui-react';
import Product from './Product';
import { compose } from 'redux';
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.getCartItemDiv = this.getCartItemDiv.bind(this);
    this.state = {
      activeIndex: 0,
      orderId: props.match.params.orderId,
    };
  }
  getCartItemDiv() {
    let order = this.getOrder();
    let cartItems = order && order.items ? order.items : [];
    console.log('cartitems', order);
    let total = 0.0;
    const productRows = cartItems.map((product, index) => {
      total = total + product.cartItem.price * product.quantity;
      return (
        <Product
          index={index}
          imageUri={product.cartItem.imageUri}
          onUpdateQty={this.updateQuantity}
          title={product.cartItem.title}
          price={product.cartItem.price}
          quantity={product.quantity}
          key={index}
          changeQty={false}
        />
      );
    });
    return <Grid>{productRows}</Grid>;
  }
  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };
  getOrder() {
    let order = null;
    if (this.props.orders) {
      let orderKeys = Object.keys(this.props.orders);
      console.log('orderKeys', orderKeys);
      if (orderKeys.length > 0) {
        order = this.props.orders[orderKeys[0]];
        console.log('order', order);
      }
    }
    return order;
  }
  getCardDiv(order) {
    console.log('getCardDiv', order);
    if (order && order.card && order.card.brand && order.card.last4) {
      let iconVal = <div />;
      let brand = order.card.brand.toLowerCase();
      switch (brand) {
        case 'amex':
        case 'mastercard':
        case 'discover':
        case 'apple pay':
        case 'jcb':
        case 'paypal':
        case 'amazon pay':
        case 'stripe':
        case 'visa':
          iconVal = <Icon name="cc mastercard" />;
          break;
        default:
          break;
      }

      return (
        <Segment textAlign="left" attached="bottom">
          <Header>Payment</Header>
          <p>
            {iconVal} {' ...'}
            {order.card.last4}
          </p>
        </Segment>
      );
    }
  }
  getShippingAddress(order) {
    const address = order && order.shippingAddress ? order.shippingAddress : {};
    return address;
  }
  getBillingAddress(order) {
    const address = order && order.billingAddress ? order.billingAddress : {};
    return address;
  }
  render() {
    console.log('confirmation props', this.props);
    console.log('confirmation state', this.state);
    const { activeIndex, orderId } = this.state;
    const { orders } = this.props;
    let order = this.getOrder();
    console.log('ORDERS', orders);
    let shippingAddress = this.getShippingAddress(order);
    let billingAddress = this.getBillingAddress(order);
    return (
      <div>
        {!isLoaded(orders) ? (
          <div>
            {'Loading order... '} <Icon loading name="leaf" />
          </div>
        ) : isEmpty(orders) ? (
          // for some reason order will be empty for like 5 seconds before it is loaded
          <div>
            {'Loading order... '} <Icon loading name="pagelines" />
          </div>
        ) : (
          <Segment textAlign="center" basic>
            <h2>Order Confirmation</h2>

            <h3>Order ID: {orderId}</h3>
            <Segment textAlign="left" attached="top">
              <Header>
                Order Total: &#36;
                {order && order.totalPrice ? order.totalPrice : ''}
              </Header>
              <Accordion>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={this.handleAccordionClick}
                >
                  <Icon name="dropdown" />
                  Your Items
                </Accordion.Title>
                <Accordion.Content active={activeIndex === 0}>
                  <div>{this.getCartItemDiv()} </div>
                </Accordion.Content>
              </Accordion>
            </Segment>
            <Segment textAlign="left" attached>
              <Header>Shipping Address</Header>
              <List>
                <List.Item>{shippingAddress.shipping_address_name}</List.Item>
                <List.Item> {shippingAddress.shipping_address_line1}</List.Item>
                {shippingAddress.shipping_address_line2 && (
                  <List.Item>
                    {shippingAddress.shipping_address_line2}
                  </List.Item>
                )}
                <List.Item>
                  {shippingAddress.shipping_address_city},{' '}
                  {shippingAddress.shipping_address_state}{' '}
                  {shippingAddress.shipping_address_zip}
                </List.Item>
              </List>
            </Segment>
            <Segment textAlign="left" attached>
              <Header>Billing Address</Header>
              <List>
                <List.Item>{billingAddress.billing_address_name}</List.Item>
                <List.Item> {billingAddress.billing_address_line1}</List.Item>
                {billingAddress.billing_address_line2 && (
                  <List.Item>{billingAddress.billing_address_line2}</List.Item>
                )}
                <List.Item>
                  {billingAddress.billing_address_city},{' '}
                  {billingAddress.billing_address_state}{' '}
                  {billingAddress.billing_address_zip}
                </List.Item>
              </List>
            </Segment>
            {this.getCardDiv(order)}
          </Segment>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state, props) => {
  return {
    orders: state.firebase.data.orders,
    ...state,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEmptyCart: () => {
      dispatch(emptyCart());
    },
  };
};
export default compose(
  firebaseConnect(props => [
    {
      path: 'orders',
      queryParams: [
        'orderByChild=orderId',
        `equalTo=${props.match.params.orderId}`,
      ],
    },
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Confirmation);
