import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import { Image as CanvasImage } from 'react-konva';

class SMCanvasImage extends Component {
  constructor(props) {
    super(props);
    this.state = { src: null, image: new window.Image() };
    this.getImage = this.getImage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setImageOffset = this.setImageOffset.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleDoubleClick = this.handleDoubleClick.bind(this);
  }
  async componentDidMount() {
    console.log('componentDidMount', this.props.src);
    await this.getImage();

    this.state.image.crossOrigin = 'anonymous';
    this.state.image.src = this.state.src;
    this.state.image.onload = async () => {
      if (this.imageNode) {
        await this.setImageOffset();
        this.imageNode.getLayer().batchDraw();
      } else {
        console.log('ERROR image node not loaded??');
      }
    };
  }
  setImageOffset() {
    this.imageNode.offsetX(this.imageNode.width() / 2);
    this.imageNode.offsetY(this.imageNode.height() / 2);

    this.imageNode.x(this.imageNode.x() + this.props.x);
    this.imageNode.y(this.imageNode.y() + this.props.y);
  }
  getImage() {
    const imgUrl = require(`../../assets/${this.props.src}`);
    this.setState({ src: imgUrl });
    //console.log('getImage -- imageRetrieved');
    return;
  }
  handleDragStart(e) {
    this.imageNode.moveToTop();
    this.props.onDragStart(e, this.props.index);
  }
  handleDragEnd(e) {
    this.props.onDragEnd(e);
  }
  handleDoubleClick(e) {
    this.imageNode.destroy();
    this.props.onDblClick(e, this.props.index);
  }
  render() {
    //console.log('SMCanvasImage props', this.props);
    //console.log('SMCanvasImage state', this.state);
    //console.log('imageNode', this.imageNode);
    return (
      <CanvasImage
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        draggable={this.props.draggable}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDblClick={this.handleDoubleClick}
        onDblTap={this.handleDoubleClick}
      />
    );
  }
}
SMCanvasImage.defaultProps = {
  x: 175,
  y: 170,
  size: 'small',
  draggable: false,
  onDragStart: () => {},
  onDragEnd: () => {},
  onDblClick: () => {},
};
export default SMCanvasImage;
