import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Button, Card } from 'semantic-ui-react';
import { Stage, Layer } from 'react-konva';
import CanvasImg from '../canvas/CanvasImg';
import getImage from '../common/getImage';
import CardGroupSelect from '../common/CardGroupSelect';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setDesignOptions, setCustomizations } from '../../actions';
import FirestoreImage from '../common/FirestoreImage';

class ChooseDesign extends Component {
  constructor(props) {
    super(props);
    this.setDesignOptions = this.setDesignOptions.bind(this);
    this.getDesignOptions = this.getDesignOptions.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
  }
  handleChoiceChange(data) {
    if (data && data.id !== null) {
      const id = data.id;
      const choice = this.props.designs.find(baseProps => {
        if (baseProps.id === id) {
          return true;
        } else {
          return false;
        }
      });
      this.props.onSetDesignOptions(choice.opts);
      const choiceOpts = choice.opts.map(opts => {
        let ret = {
          optionId: opts.id,
          x: opts.x,
          y: opts.y,
          src: null,
          id: null,
          type: opts.type,
        };
        return ret;
      });
      this.props.setCustomizations({
        id: choice.id,
        src: choice.src,
        opts: choiceOpts,
      });

      this.props.setDesign(id);
    } else {
      this.props.onSetDesignOptions(null);
      this.props.setCustomizations(null);

      this.props.setDesign(null);
    }
  }

  getOptions() {
    if (this.props.designs) {
      const options = this.props.designs;
      return options
        .filter(baseProps => {
          console.log('baseProps:', baseProps.styleId);
          console.log('style', this.props.getStyle());
          if (baseProps.styleId === this.props.getStyle()) {
            console.log('add option');
            return true;
          } else {
            return false;
          }
        })
        .map(baseProps => {
          let ret = {
            id: baseProps.id,
            header: baseProps.name,
            content: (
              <Stage key={`stage-${baseProps.id}`} width={140} height={140}>
                <Layer key={`layer-${baseProps.id}`}>
                  <FirestoreImage
                    key={baseProps.id}
                    {...baseProps}
                    canvas={true}
                  />
                  {baseProps.opts.map(props => {
                    return (
                      <FirestoreImage key={props.id} {...props} canvas={true} />
                    );
                  })}
                </Layer>
              </Stage>
            ),
          };
          return ret;
        });
    } else {
      return {};
    }
  }
  // set design options
  setDesignOptions(opts) {
    this.props.onSetDesignOptions(opts);
  }
  // get design options
  getDesignOptions() {}
  render() {
    return (
      <Container>
        <h1>Select a Design</h1>
        <CardGroupSelect
          itemsPerRow={2}
          cardOptions={this.getOptions()}
          handleChoiceChange={this.handleChoiceChange}
          selected={this.props.getDesign()}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('chooseDesign state: ', state);
  return { designs: state.firestore.ordered.designs };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetDesignOptions: opts => {
      dispatch(setDesignOptions(opts));
    },
    setCustomizations: base => {
      dispatch(setCustomizations(base));
    },
  };
};
export default compose(
  firestoreConnect(['designs']),
  connect(mapStateToProps, mapDispatchToProps)
)(ChooseDesign);
