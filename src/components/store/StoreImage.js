import React from 'react';
import { Segment, Container, Grid, List } from 'semantic-ui-react';
import FirestoreImage from '../common/FirestoreImage';

export default props => {
  return <FirestoreImage src={props.product.src} />;
};
