import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Dropdown } from 'semantic-ui-react';
import { Image } from 'semantic-ui-react';

const getQuantityOptions = () => {
  let range = _.range(0, 11);
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
    if (data && typeof data.value !== 'undefined') {
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
    let { price, quantity, title, imageUri, changeQty } = this.props;
    return (
      <Grid.Row style={{ marginRight: '2em' }}>
        {imageUri && (
          <Grid.Column
            textAlign="left"
            verticalAlign="bottom"
            mobile={6}
            computer={3}
            largeScreen={3}
            widescreen={3}
            tablet={3}
          >
            <img src={imageUri} width={100} height={100} />
          </Grid.Column>
        )}

        <Grid.Column
          textAlign="left"
          verticalAlign="middle"
          mobile={4}
          computer={7}
          largeScreen={7}
          widescreen={7}
          tablet={7}
        >
          {title}
        </Grid.Column>

        <Grid.Column
          textAlign="center"
          verticalAlign="middle"
          mobile={3}
          computer={3}
          largeScreen={3}
          widescreen={3}
          tablet={3}
        >
          {changeQty === false && quantity ? (
            <div>{quantity}</div>
          ) : quantity ? (
            <Dropdown
              onChange={this.updateQty}
              scrolling
              value={quantity}
              options={getQuantityOptions()}
            />
          ) : null}
        </Grid.Column>
        <Grid.Column
          textAlign="right"
          verticalAlign="middle"
          mobile={3}
          computer={3}
          largeScreen={3}
          widescreen={3}
          tablet={3}
        >
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
Product.defaultProps = {
  changeQty: true,
};
Product.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  title: PropTypes.string,
};

export default Product;
