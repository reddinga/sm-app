import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import StoreLabel from './StoreLabel';
import StoreImage from './StoreImage';
import ProductPage from '../product/ProductPage';

class StoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickItem(e, t) {
    console.log('clicked', e, t);

    this.setState({ redirect: true, productId: t });
  }
  render() {
    if (this.state.redirect) {
      /*    return (
        <Route
          path={`${this.props.match.path}:productId`}
          render={({ match }) => (
            <ProductPage productId={match.params.productId} />
          )}
        />
      ); */
      return <Redirect push to={`/product/${this.state.productId}`} />;
    } else {
      const { product } = this.props;
      return (
        <div
          id={product.id}
          style={{
            width: 150,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
          }}
          onClick={e => this.onClickItem(e, product.id)}
        >
          <StoreImage product={product} />
          <StoreLabel product={product} />
        </div>
      );
    }
  }
}

export default StoreItem;
