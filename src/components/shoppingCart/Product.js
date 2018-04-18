import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Dropdown } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';

const getQuantityOptions = () => {
  let range = _.range(1, 11);
  return _.map(range, num => {
    return { text: num, value: num };
  });
};

class Product extends Component {
  constructor(props) {
    super(props);
    this.updateQty = this.updateQty.bind(this);
  }
  updateQty = (event, data) => {
    console.log('val', event, data);
    if (data && data.value) {
      this.props.onUpdateQty(this.props.index, data.value);
    }
  };
  getImage(imageUri) {
    console.log('imageUri');
    var img = document.createElement('img');
    img.src = imageUri;
    // document.body.appendChild(img);
    return <div>{img}</div>;
    // <Image src={imageUri} />;
  }
  render() {
    let { price, quantity, title, imageUri } = this.props;
    return (
      <Grid.Row>
        {imageUri && (
          <Grid.Column width={3}>
            <img src={imageUri} width={30} height={30} />
          </Grid.Column>
        )}
        <Grid.Column textAlign="left" width={8}>
          {title} -
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(price)}
        </Grid.Column>

        <Grid.Column textAlign="center" width={3}>
          {quantity ? (
            <Dropdown
              onChange={this.updateQty}
              scrolling
              value={quantity}
              options={getQuantityOptions()}
            />
          ) : null}
        </Grid.Column>
        <Grid.Column textAlign="right" width={2}>
          {quantity
            ? ` ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(quantity * price)}`
            : null}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
};

export default Product;
