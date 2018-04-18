import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
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
    this.onDblClick = this.onDblClick.bind(this);
    this.updateState = this.updateState.bind(this);
    this.getImageUri = this.getImageUri.bind(this);
    this.getImageDataURL = this.getImageDataURL.bind(this);
    this.state = { customDesign: this.props.customDesign };
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
  updateState(images) {
    let newDesign = this.state.customDesign;
    newDesign.addedOptions = images;
    let imageUri = this.getImageDataURL();
    newDesign.imageUri = imageUri;
    this.setState({ customDesign: newDesign });
  }
  onDragStart(event, index) {
    console.log('drag start event', event, index);
    // move image to top
    let images = this.state.customDesign.addedOptions;
    console.log('index', index);
    console.log('images', images);
    images.push(images.splice(index, 1)[0]);
    console.log('images 0', images[0]);
    this.updateState(images);
  }
  onDragEnd(event) {
    console.log('drag end event', event);
    console.log('x', event.target.x());
    console.log('y', event.target.y());
    let images = this.state.customDesign.addedOptions;

    console.log('drag end images', images);
    images[images.length - 1].x = event.target.x();
    images[images.length - 1].y = event.target.y();
    this.updateState(images);
  }
  onDblClick(event, index) {
    console.log('on double click event', event, index);
    let images = this.state.customDesign.addedOptions;
    images.splice(index, 1); // remove image
    this.updateState(images);
  }
  getImages() {
    if (this.state.customDesign) {
      console.log('getImages', this.state.customDesign.addedOptions);
      return this.state.customDesign.addedOptions.map((option, index) => {
        return (
          <SMCanvasImage
            {...option}
            index={index}
            draggable={true}
            onDragStart={this.onDragStart}
            onDragEnd={this.onDragEnd}
            onDblClick={this.onDblClick}
            x={option.x}
            y={option.y}
          />
        );
      });
    }
  }
  componentWillReceiveProps(newProps) {
    this.setState({ customDesign: newProps.customDesign });
  }
  componentWillUnmount() {
    //this._stage.destroy() -- for memory?
    console.log('preview canvas unmount');
  }
  render() {
    // customDesign = customDesign from store
    const customDesign = this.state.customDesign;
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
              <SMCanvasImage
                key={`preview-base-key-${customDesign.base.id}`}
                src={customDesign.base.src}
              />
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
