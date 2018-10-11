import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Stage, Layer, Icon } from 'react-konva';
import SMCanvasImage from '../common/SMCanvasImage';
import base64 from 'base-64';
import convertDataURIToBinary from '../common/convertDataURIToBinary';
//import { FacebookShareButton, FacebookIcon } from 'react-share';

class DDPreviewStage extends Component {
  constructor(props) {
    super(props);
    this.getImages = this.getImages.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onRotate = this.onRotate.bind(this);
    this.onFlip = this.onFlip.bind(this);
    this.getTrashImage = this.getTrashImage.bind(this);
    this.displayTrash = this.displayTrash.bind(this);
    this.updateDesign = this.updateDesign.bind(this);
    this.getImageUri = this.getImageUri.bind(this);
    this.getImageDataURL = this.getImageDataURL.bind(this);
    this.updateImageUri = this.updateImageUri.bind(this);
    this.state = { showTrash: false };
  }
  getImageDataURL() {
    const stage = this.refs.stage.getStage();
    const dataURL = stage.toDataURL();
    return dataURL;
  }
  getImageUri() {
    const dataURL = this.getImageDataURL();
    // convert to typed array
    var arr = convertDataURIToBinary(dataURL);
    // convert to blob and show as image
    var blob = new Blob([arr], { type: 'image/png' });
    let localImageUri = window.URL.createObjectURL(blob);
    // for testing
    var img = document.createElement('img');
    img.src = localImageUri;
    document.body.appendChild(img);
    return localImageUri;
  }
  updateDesign(images) {
    console.log('updateDesign images: ', images);
    let newDesign = this.props.customDesign;
    newDesign.addedOptions = images;
    this.props.handleUpdateCustomDesign(newDesign);
  }
  updateImageUri() {
    let imageUri = this.getImageDataURL();
    this.props.customDesign.imageUri = imageUri;
    this.props.handleUpdateCustomDesign(this.props.customDesign);
  }
  onDragStart(event, index) {
    console.log('drag start event', event, index);
    this.displayTrash(true);
    // move image to top
    let images = this.props.customDesign.addedOptions;
    console.log('index', index);
    console.log('images', images);
    images.push(images.splice(index, 1)[0]);
    console.log('images 0', images[0]);
    this.updateDesign(images);
  }
  onDragEnd(event) {
    console.log('drag end event', event);
    console.log('x', event.target.x());
    console.log('y', event.target.y());
    let images = this.props.customDesign.addedOptions;

    console.log('drag end images', images);
    images[images.length - 1].x = event.target.x();
    images[images.length - 1].y = event.target.y();
    this.updateDesign(images);
  }
  displayTrash(display) {
    console.log('displayTrash', display);
    this.setState({ showTrash: display });
  }
  onRemove(event, index) {
    console.log('on remove event', event, index);
    let images = this.props.customDesign.addedOptions;
    images.splice(index, 1); // remove image
    this.updateDesign(images);
  }
  onRotate(event, index) {
    console.log('on rotate event', event, index);
    let images = this.props.customDesign.addedOptions;
    images[index].rotation = event.target.rotation();
    this.updateDesign(images);
  }
  onFlip(event, index) {
    console.log('on flip event', event, index);
    let images = this.props.customDesign.addedOptions;
    images[index].scaleX = event.target.scaleX();
    this.updateDesign(images);
  }
  getBaseImage() {
    const customDesign = this.props.customDesign;
    if (customDesign && customDesign.base && customDesign.base.src) {
      return (
        <SMCanvasImage
          key={`preview-base-key-${customDesign.base.id}`}
          src={customDesign.base.src}
          base={true}
        />
      );
    }
  }
  getTrashImage() {
    if (this.props.customDesign && this.state.showTrash) {
      return (
        <SMCanvasImage
          key={`preview-trash`}
          src={'images/icons/trash-icon.png'}
          trash={true}
          x={325}
          y={325}
          scaleX={0.15}
          scaleY={0.15}
        />
      );
    }
  }
  getImages() {
    if (this.props.customDesign) {
      console.log('getImages', this.props.customDesign.addedOptions);
      return this.props.customDesign.addedOptions.map((option, index) => {
        return (
          <SMCanvasImage
            {...option}
            index={index}
            draggable={true}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            onRemove={this.onRemove}
            onRotate={this.onRotate}
            onFlip={this.onFlip}
            displayTrash={this.displayTrash}
            x={option.x}
            y={option.y}
            rotation={option.rotation}
            scaleX={option.scaleX ? option.scaleX : 0.5}
            scaleY={0.5}
          />
        );
      });
    }
  }
  componentWillReceiveProps(newProps) {
    console.log('DDPreviewCanvas will receive props');
  }
  componentDidUpdate(prevProps) {
    console.log('DDPreviewCanvas didUpdate');
  }
  componentWillUnmount() {
    //this._stage.destroy() -- for memory?
    let currentUri = this.getImageDataURL();
    this.props.customDesign.imageUri = currentUri;
    console.log('componentWillUnmount : ', this.props.customDesign);
    this.props.handleSetLast(this.props.customDesign);
    console.log('preview canvas unmount');
  }
  render() {
    // customDesign = customDesign from store
    const customDesign = this.props.customDesign;
    console.log('customDesign', customDesign);
    if (customDesign) {
      return (
        <div>
          <Stage
            ref="stage"
            key={`preview-stage-${customDesign.id}`}
            width={350}
            height={350}
          >
            <Layer ref="layer" key={`preview-layer-${customDesign.id}`}>
              {this.getTrashImage()}
              {this.getBaseImage()}
              {this.getImages()}
            </Layer>
          </Stage>
        </div>
      );
    }
  }
}
DDPreviewStage.defaultProps = { addedOptions: [] };
export default DDPreviewStage;
