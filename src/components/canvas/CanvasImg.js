import React, { Component } from 'react';
import { Image } from 'react-konva';

class CanvasImg extends Component {
  state = {
    image: new window.Image(),
  };
  componentDidMount() {
    this.state.image.src = this.props.src;
    this.state.image.onload = () => {
      this.imageNode.getLayer().batchDraw();
    };
  }

  render() {
    return (
      <Image
        image={this.state.image}
        {...this.props}
        ref={node => {
          this.imageNode = node;
        }}
      />
    );
  }
}
export default CanvasImg;
