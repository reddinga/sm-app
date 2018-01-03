import React, { Component } from 'react';
import { Segment, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { setStyle, setDesign } from '../../actions';
import FirestoreImage from '../common/FirestoreImage';

class Preview extends Component {
  getPreview() {
    const preview = this.props.customizations;
    if (preview) {
      return (
        <div>
          <Stage key={`preview-stage-${preview.id}`} width={220} height={220}>
            <Layer key={`preview-layer-${preview.id}`}>
              <FirestoreImage
                key={`preview-base-key-${preview.id}`}
                {...preview}
                canvas={true}
              />
              {preview.opts.map(choices => {
                if (choices.id && choices.src) {
                  return (
                    <FirestoreImage
                      key={choices.id}
                      {...choices}
                      canvas={true}
                    />
                  );
                }
              })}
            </Layer>
          </Stage>
        </div>
      );
    } else {
      return (
        <Stage width={220} height={220}>
          <Layer />
        </Stage>
      );
    }
  }
  render() {
    return (
      <div style={{ height: 250 }}>
        <Card centered>{this.getPreview()}</Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('preview state', state);
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
