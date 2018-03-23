import React, { Component } from 'react';
import { Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import StoreLabel from './StoreLabel';
import StoreImage from './StoreImage';

class StoreItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onClickItem(e, t) {
    console.log('clicked', e, t);
  }
  render() {
    const { product } = this.props;
    return (
      <div
        id={product.id}
        style={{
          width: 150,
          height: 150,
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

export default StoreItem;
