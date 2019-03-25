import React, { Component } from 'react';
import { Segment, Container, Grid, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import ProductImage from './ProductImage';
import SMImage from '../common/SMImage';
import AddToCart from '../common/AddToCart';

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = { productId: props.match.params.productId };
  }
  addToCart() {
    console.log('addToCart');
  }
  render() {
    const { match, myProduct } = this.props;
    let productId = this.state.productId;
    console.log(this.props);
    return (
      <div>
        {!isLoaded(myProduct) ? (
          'Loading'
        ) : isEmpty(myProduct) ? (
          'Product not found'
        ) : (
          <Grid centered doubling textAlign="center" relaxed columns={4}>
            <Grid.Row centered>
              <Grid.Column textAlign="center">
                <Header as="h1">{productId}</Header>
                <Divider />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column textAlign="center">
                <SMImage src={myProduct.src} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column textAlign="center">
                <AddToCart onClick={this.addToCart} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    products: state.firestore.ordered.products,
    myProduct: state.firestore.data.myProduct,
  };
};
export default compose(
  firestoreConnect(props => [
    'products',
    {
      collection: 'products',
      storeAs: 'myProduct',
      doc: props.match.params.productId,
    },
  ]),
  connect(mapStateToProps),
)(ProductPage);
