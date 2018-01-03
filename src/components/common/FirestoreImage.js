import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Image } from 'semantic-ui-react';
import { Image as CanvasImage } from 'react-konva';

class FirestoreImage extends Component {
  constructor(props) {
    super(props);
    this.state = { src: null, image: new window.Image() };
    this.getImage = this.getImage.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentWillMount() {
    if (!this.props.canvas) {
      this.getImage();
    }
  }
  async componentDidMount() {
    if (this.props.canvas) {
      const retVal = await this.getImage();
      this.state.image.src = this.state.src;
      this.state.image.onload = () => {
        // calling set state here will do nothing
        // because properties of Konva.Image are not changed
        // so we need to update layer manually
        this.imageNode.getLayer().batchDraw();
      };
    }
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
    console.log(this.props);
    if (this.props.canvas) {
      return (
        <CanvasImage
          image={this.state.image}
          {...this.props}
          ref={node => {
            this.imageNode = node;
          }}
        />
      );
    } else {
      return (
        <Image
          centered
          verticalAlign="middle"
          size="small"
          src={this.state.src}
        />
      );
    }
  }
}

export default firebaseConnect()(FirestoreImage);
