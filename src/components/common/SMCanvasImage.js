import React, { Component } from 'react';
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
    this.handleClick = this.handleClick.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.rotateImage = this.rotateImage.bind(this);
  }
  async componentDidMount() {
    console.log('componentDidMount', this.props.src);

    await this.getImage();

    this.state.image.crossOrigin = 'anonymous';
    this.state.image.src = this.state.src;
    this.imageNode.visible(false);
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

    this.imageNode.visible(true);
  }
  getImage() {
    const imgUrl = require(`../../assets/${this.props.src}`);
    this.setState({ src: imgUrl });
    //console.log('getImage -- imageRetrieved');
    return;
  }
  handleDragStart(e) {
    if (!this.props.base && !this.props.trash) {
      this.props.displayTrash(true);
      this.imageNode.moveToTop();
      this.props.onDragStart(e, this.props.index);
    }
  }
  handleDragEnd(e) {
    console.log('handleDragEnd', this.props);
    if (!this.props.base && !this.props.trash) {
      // if image over trash
      console.log('x', this.imageNode.x());
      console.log('y', this.imageNode.y());
      if (this.imageNode.x() >= 310 && this.imageNode.y() >= 310) {
        this.removeImage(e);
      } else {
        this.props.onDragEnd(e);
      }
    }
    this.props.displayTrash(false);
  }
  handleDoubleClick(e) {
    if (!this.props.base && !this.props.trash) {
      this.rotateImage(e);
    }
  }
  handleClick(e) {
    if (!this.props.base && !this.props.trash) {
      this.flipImage(e);
    }
  }
  removeImage(e) {
    this.imageNode.destroy();
    this.props.onRemove(e, this.props.index);
  }
  rotateImage(e) {
    console.log(' rotation1', this.imageNode.rotation());
    this.imageNode.rotation(this.imageNode.rotation() + 25);
    console.log(' rotation2', this.imageNode.rotation());
    this.props.onRotate(e, this.props.index);
  }
  flipImage(e) {
    console.log(' flip1', this.imageNode);
    this.imageNode.scaleX(this.imageNode.scaleX() * -1);
    console.log(' flip2', this.imageNode);
    this.props.onFlip(e, this.props.index);
  }
  render() {
    console.log('SMCanvasImage props', this.props);
    console.log('SMCanvasImage state', this.state);
    console.log('imageNode', this.imageNode);
    let stageWidth = this.props.stageWidth;
    let stageHeight = this.props.stageHeight;

    return (
      <CanvasImage
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }}
        rotation={this.props.rotation}
        scaleX={this.props.scaleX}
        scaleY={this.props.scaleY}
        draggable={this.props.draggable}
        dragBoundFunc={function(pos) {
          let x = stageWidth;
          let y = stageHeight;
          let newY;
          if (pos.y < 0) {
            newY = 0;
          } else if (pos.y > y) {
            newY = y;
          } else {
            newY = pos.y;
          }
          let newX;
          if (pos.x < 0) {
            newX = 0;
          } else if (pos.x > x) {
            newX = x;
          } else {
            newX = pos.x;
          }
          return {
            y: newY,
            x: newX,
          };
        }}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onDblClick={this.handleDoubleClick}
        onDblTap={this.handleDoubleClick}
        onClick={this.handleClick}
        onTap={this.handleClick}
      />
    );
  }
}
SMCanvasImage.defaultProps = {
  x: 175,
  y: 170,
  stageWidth: 350,
  stageHeight: 350,
  size: 'small',
  draggable: false,
  onDragStart: () => {},
  onDragEnd: () => {},
  onRemove: () => {},
  onRotate: () => {},
  onFlip: () => {},
  displayTrash: () => {},
  scaleX: 1,
  scaleY: 1,
  rotation: 0,
  base: false,
  trash: false,
};
export default SMCanvasImage;
