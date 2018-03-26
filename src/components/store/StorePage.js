import React, { Component } from 'react';
import { Segment, Container, Grid, Header, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import StoreItem from './StoreItem';
import AutoResponsive from 'autoresponsive-react';

class StorePage extends Component {
  constructor(props) {
    super(props);
    this.state = { categoryId: props.match.params.categoryId };
    this.renderStoreItems = this.renderStoreItems.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.categoryId !== this.props.match.params.categoryId
    ) {
      this.setState({ categoryId: nextProps.match.params.categoryId });
    }
  }
  renderStoreItems() {
    let storeItems = [];
    if (this.props.products && Array.isArray(this.props.products)) {
      storeItems = this.props.products
        .filter(product => {
          if (
            product.categoryId &&
            product.categoryId === this.state.categoryId
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map(product => {
          return (
            <Grid.Column key={product.id} textAlign="center">
              <StoreItem
                style={{ width: 150 }}
                key={product.id}
                product={product}
                categoryId={this.state.categoryId}
              />
            </Grid.Column>
          );
        });
    }

    return storeItems;
  }
  render() {
    const { match } = this.props;
    console.log('StorePage props', this.props);
    let categoryId = this.state.categoryId;
    return (
      <Grid centered doubling textAlign="center" relaxed columns={4}>
        <Grid.Row centered>
          <Grid.Column textAlign="center">
            <Header as="h1">{categoryId}</Header>
            <Divider />
          </Grid.Column>
        </Grid.Row>

        {this.renderStoreItems()}
      </Grid>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { products: state.firestore.ordered.products };
};

export default compose(
  firestoreConnect(['products']),
  connect(mapStateToProps),
)(StorePage);
