import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Icon } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AddToCart from '../common/AddToCart';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';
class ShoppingCartToastr extends Component {
  constructor(props) {
    super(props);

    this.showToast = this.showToast.bind(this);
    // Bind the react-redux-toastr actions to the component
    this.toastr = bindActionCreators(toastrActions, this.props.dispatch);
  }
  toastrOptions = {
    timeOut: 5000,
    newestOnTop: true,
    transitionIn: 'bounceIn',
    transitionOut: 'bounceOut',
    progressBar: false,
    position: 'bottom-center',
  };
  componentWillReceiveProps(nextProps) {
    console.log('toastr props', nextProps);
    if (nextProps.show !== this.props.show) {
      this.showToast(nextProps.show);
    }
  }
  showToast(show) {
    console.log('showToast', show);
    if (show) {
      console.log('true');
      this.toastr.add({
        id: 'shoppingCartToastr', // If not provided we will add one.
        type: 'success',
        position: 'bottom-center',
        options: this.toastrOptions,
      });
    } else {
      console.log('false');
      toastr.remove('shoppingCartToastr');
    }
  }
  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};
export default compose(connect(null, mapDispatchToProps))(ShoppingCartToastr);
