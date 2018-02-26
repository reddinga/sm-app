import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Stage, Layer } from 'react-konva';
import CardGroupSelect from '../common/CardGroupSelect';
import { connect } from 'react-redux';
import { setDesignOptions, setCustomizations } from '../../actions';
import FirestoreImage from '../common/FirestoreImage';

class ChooseDesign extends Component {
  constructor(props) {
    super(props);
    this.setDesignOptions = this.setDesignOptions.bind(this);
    this.getDesignOptions = this.getDesignOptions.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.resetDesignOpts = this.resetDesignOpts.bind(this);
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
        name: choice.name,
        price: choice.price,
        src: choice.src,
        x: choice.x,
        y: choice.y,
        opts: choiceOpts,
      });

      this.props.setDesign(id);
    } else {
      this.props.onSetDesignOptions(null);
      this.props.setCustomizations(null);

      this.props.setDesign(null);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('choose design props');
  }
  componentWillMount(nextProps) {
    console.log('choose design mount');
    console.log(this.props);
    if (this.props.design) {
      this.resetDesignOpts();
    }
  }
  componentWillUpdate(nextProps) {
    console.log('choose design update');
  }
  resetDesignOpts() {
    console.log('resetDesignOpts');
    const choice = this.props.designs.find(baseProps => {
      if (baseProps.id === this.props.design) {
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
      name: choice.name,
      price: choice.price,
      src: choice.src,
      x: choice.x,
      y: choice.y,
      opts: choiceOpts,
    });
  }
  getOptions() {
    if (this.props.designs) {
      const options = this.props.designs;
      return options
        .filter(baseProps => {
          if (baseProps.styleId === this.props.getStyle()) {
            return true;
          } else {
            return false;
          }
        })
        .map(baseProps => {
          let ret = {
            id: baseProps.id,
            header: baseProps.name,
            footer: '$' + baseProps.price,
            content: (
              <Stage
                scale={{ x: 0.75, y: 0.75 }}
                key={`stage-${baseProps.id}`}
                width={240}
                height={225}
              >
                <Layer key={`layer-${baseProps.id}`}>
                  <FirestoreImage
                    key={baseProps.id}
                    {...baseProps}
                    canvas={true}
                  />
                  {baseProps.opts.map(props => {
                    return (
                      <FirestoreImage
                        key={props.id + '-' + props.name}
                        {...props}
                        canvas={true}
                      />
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
      <div>
        <h1>Select a Design</h1>
        <CardGroupSelect
          itemsPerRow={2}
          cardOptions={this.getOptions()}
          handleChoiceChange={this.handleChoiceChange}
          selected={this.props.getDesign()}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { ...state, designs: state.firestore.ordered.designs };
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
  connect(mapStateToProps, mapDispatchToProps),
)(ChooseDesign);
