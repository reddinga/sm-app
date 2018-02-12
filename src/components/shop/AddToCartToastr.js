import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { Icon } from 'semantic-ui-react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AddToCart from './AddToCart';
import { bindActionCreators } from 'redux';
import { actions as toastrActions } from 'react-redux-toastr';
class AddToCartToastr extends Component {
  constructor(props) {
    super(props);

    this.showToast = this.showToast.bind(this);
    // Bind the react-redux-toastr actions to the component
    this.toastr = bindActionCreators(toastrActions, this.props.dispatch);
  }
  toastrOptions = {
    removeOnHover: false,
    onHideComplete: () => console.log('HIDE: animation is done'),
    position: 'bottom-center',
    icon: <Icon name="shopping cart" size="big" />,
    timeOut: 0, // by setting to 0 it will prevent the auto close
    onCloseButtonClick: () => console.log('Close button was clicked'),
    showCloseButton: false, // true by default */
    //this option will give you a func 'remove' as props
    component: <AddToCart onClick={this.props.onClick} />,
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
        id: 'addToCartToastr', // If not provided we will add one.
        type: 'success',
        position: 'bottom-center',
        options: this.toastrOptions,
      });
    } else {
      console.log('false');
      toastr.remove('addToCartToastr');
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
export default compose(connect(null, mapDispatchToProps))(AddToCartToastr);
