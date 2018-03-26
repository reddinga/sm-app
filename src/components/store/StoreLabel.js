import React from 'react';
import { Segment, Container, Grid, List } from 'semantic-ui-react';

export default props => {
  return (
    <div>
      <p>
        {props.product.name}
        <br />
        <strong>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(props.product.price)}
        </strong>
      </p>
    </div>
  );
};
