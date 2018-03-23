import React from 'react';
import { Segment, Container, Grid, List } from 'semantic-ui-react';

export default props => {
  return (
    <div>
      {props.product.name} -
      {new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(props.product.price)}
    </div>
  );
};
