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
    this.toastr = bindActionCreators(toastrActions, this.props.dispatch);
  }
  toastrOptions = {
    removeOnHover: false,
    onHideComplete: () => console.log('HIDE: animation is done'),
    position: 'bottom-center',
    icon: <Icon name="shopping cart" size="big" />,
    timeOut: 0,
    onCloseButtonClick: () => console.log('Close button was clicked'),
    showCloseButton: false,
    component: <AddToCart onClick={this.props.onClick} />,
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      this.showToast(nextProps.show);
    }
  }
  showToast(show) {
    if (show) {
      this.toastr.add({
        id: 'addToCartToastr',
        type: 'success',
        position: 'bottom-center',
        options: this.toastrOptions,
      });
    } else {
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
