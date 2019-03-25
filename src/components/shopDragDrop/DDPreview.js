import React, { Component } from 'react';
import { Segment, List, Button, Popup, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Stage, Layer } from 'react-konva';
import { setCustomizations, setLastUri } from '../../actions';
import DDPreviewCanvas from './DDPreviewCanvas';

class DDPreview extends Component {
  getPreview() {
    const customDesign = this.props.customDesign;
    if (customDesign && customDesign.base && customDesign.base.src) {
      return (
        <DDPreviewCanvas
          customDesign={customDesign}
          handleUpdateCustomDesign={this.props.onSetCustomDesign}
          handleSetLast={this.props.onSetLast}
        />
      );
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
  getTips() {
    return (
      <List>
        <List.Item>click + drag to move</List.Item>
        <List.Item>click once to flip</List.Item>
        <List.Item>double-click to rotate</List.Item>
        <List.Item>drag to trash to delete</List.Item>
      </List>
    );
  }
  render() {
    return (
      <Segment className="no-borders" compact>
        {this.getPreview()}
        <Popup
          header="Tips"
          trigger={<Icon style={{ color: '#8090a0' }} name="help circle" />}
          content={this.getTips()}
          on={['hover', 'click']}
        />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCustomDesign: opts => {
      dispatch(setCustomizations(opts));
    },
    onSetLast: opts => {
      dispatch(setLastUri(opts));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DDPreview);
