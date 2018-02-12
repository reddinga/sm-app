import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import FirestoreImage from '../common/FirestoreImage';

class Preview extends Component {
  getPreview() {
    const preview = this.props.customizations;
    console.log(preview);
    if (preview) {
      return (
        <Stage key={`preview-stage-${preview.id}`} width={350} height={350}>
          <Layer key={`preview-layer-${preview.id}`}>
            <FirestoreImage
              key={`preview-base-key-${preview.id}`}
              {...preview}
              canvas={true}
            />
            {preview.opts.map(choices => {
              if (choices.id && choices.src) {
                return (
                  <FirestoreImage key={choices.id} {...choices} canvas={true} />
                );
              } else {
                return null;
              }
            })}
          </Layer>
        </Stage>
      );
    } else {
      return (
        <Stage width={350} height={350}>
          <Layer />
        </Stage>
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
