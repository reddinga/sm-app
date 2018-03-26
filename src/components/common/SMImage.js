import React from 'react';
import { Image } from 'semantic-ui-react';

export default props => {
  const imgUrl = require(`../../assets/${props.src}`);
  return <Image src={imgUrl} />;
};
