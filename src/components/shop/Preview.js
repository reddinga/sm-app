import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import FirestoreImage from '../common/FirestoreImage';
import PreviewCanvas from './PreviewCanvas';

class Preview extends Component {
  getPreview() {
    const preview = this.props.customDesign;
    console.log(preview);
    if (preview) {
      return <PreviewCanvas preview={preview} />;
    } else {
      return (
        <div>
          <Stage width={350} height={295}>
            <Layer />
          </Stage>

          <h2>Preview Your Design Here</h2>
        </div>
      );
    }
  }
  render() {
    return (
      <Segment raised compact>
        {this.getPreview()}
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
