import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import DDPreviewCanvas from './DDPreviewCanvas';

class DDPreview extends Component {
  getPreview() {
    const customDesign = this.props.customDesign;
    if (customDesign) {
      return <DDPreviewCanvas customDesign={customDesign} />;
    } else {
      return (
        <Segment raised compact>
          <Stage width={350} height={295}>
            <Layer />
          </Stage>

          <h2>Preview Your Design Here</h2>
        </Segment>
      );
    }
  }
  render() {
    return (
      <Segment className="no-borders" compact>
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

export default connect(mapStateToProps, mapDispatchToProps)(DDPreview);
