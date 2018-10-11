import React from 'react';
import { Image } from 'semantic-ui-react';

export default props => {
  const imgUrl = require(`../../assets/${props.src}`);
  if (props.size) {
    return (
      <Image src={imgUrl} size={props.size} centered className="transparent" />
    );
  } else {
    return <Image src={imgUrl} centered className="transparent" />;
  }
};
