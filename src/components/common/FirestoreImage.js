import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { Image } from 'semantic-ui-react';
import { Image as CanvasImage } from 'react-konva';

class FirestoreImage extends Component {
  constructor(props) {
    super(props);
    this.state = { src: null, image: new window.Image() };
    this.getImage = this.getImage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.setImageOffset = this.setImageOffset.bind(this);
  }
  componentWillMount() {
    if (!this.props.canvas) {
      this.getImage();
    }
  }
  async componentDidMount() {
    if (this.props.canvas) {
      await this.getImage();

      this.state.image.crossOrigin = 'anonymous';
      this.state.image.src = this.state.src;
      this.state.image.onload = async () => {
        // calling set state here will do nothing
        // because properties of Konva.Image are not changed
        // so we need to update layer manually

        if (this.imageNode) {
          await this.setImageOffset();
          this.imageNode.getLayer().batchDraw();
        } else {
          console.log('ERROR image node not loaded??');
        }
      };
    }
  }
  setImageOffset() {
    //baseWidth, baseHeight) {
    this.imageNode.offsetX(this.imageNode.width() / 2);
    this.imageNode.offsetY(this.imageNode.height() / 2);
    // when we are setting {x,y} properties we are setting position of top left corner of image.
    // but after applying offset when we are setting {x,y}
    // properties we are setting position of central point of image.
    // so we also need to move the image to see previous result
    this.imageNode.x(this.imageNode.x() + this.props.x);
    this.imageNode.y(this.imageNode.y() + this.props.y);
  }
  getImage() {
    const _this = this;
    return new Promise(function(resolve, reject) {
      if (
        _this.props.firebase &&
        typeof _this.props.firebase.storage === 'function'
      ) {
        // Create a reference to the file we want to download
        const storageRef = _this.props.firebase.storage().ref();
        const imgRef = storageRef.child(_this.props.src);
        // Get the download URL
        imgRef
          .getDownloadURL()
          .then(function(url) {
            _this.setState({ src: url });
            return resolve(true);
          })
          .catch(function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            console.log(error);
            return reject(error);
          });
      }
    });
  }
  render() {
    if (this.props.canvas) {
      return (
        <CanvasImage
          image={this.state.image}
          ref={node => {
            this.imageNode = node;
          }}
        />
      );
    } else {
      return (
        <Image
          style={{ background: 'transparent' }}
          centered
          verticalAlign={this.props.verticalAlign}
          size={this.props.size}
          src={this.state.src}
        />
      );
    }
  }
}
FirestoreImage.defaultProps = { size: 'small', verticalAlign: 'middle' };
export default firebaseConnect()(FirestoreImage);
