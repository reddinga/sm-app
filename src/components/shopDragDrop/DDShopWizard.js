import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import StepGroup from '../common/StepGroup';
import DDChooseStyle from './DDChooseStyle';
import DDPreview from './DDPreview';
import DDCustomize from './DDCustomize';
import { connect } from 'react-redux';
import {
  addToCart,
  setStyle,
  setCustomizations,
  setDesignOptions,
} from '../../actions';
import scrollToComponent from 'react-scroll-to-component';

class DDShopWizard extends Component {
  constructor(props) {
    super(props);

    this.onStepChange = this.onStepChange.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.addDesignToCart = this.addDesignToCart.bind(this);
    this.goToCart = this.goToCart.bind(this);

    this.state = {
      redirect: false,
      activeKey: 0,
      style: this.props.style,
      steps: [
        {
          title: 'Select Style',
          active: true,
          completed: false,
          disabled: false,
          key: 0,
          description: '',
          content: (
            <DDChooseStyle
              nextStep={this.nextStep}
              setStyle={this.setStyle}
              getStyle={this.getStyle}
            />
          ),
        },
        {
          title: 'Customize',
          active: false,
          completed: false,
          disabled: true,
          key: 1,
          description: '',
          content: (
            <DDCustomize
              getStyle={this.getStyle}
              addDesignToCart={this.addDesignToCart}
            />
          ),
        },
      ],
    };
  }
  componentDidMount() {
    scrollToComponent(this.customizer);
  }
  componentWillUnmount() {
    console.log('unmount ddshopwizard');
    this.props.onStyleSelect(null);
    this.props.onSetDesignOptions(null);
    this.props.setCustomizations(null);
  }
  // called when active step changes
  // either from next button or selecting from step menu
  onStepChange(key) {
    // change active key
    this.setState({ activeKey: key });
    // set the active step
    this.setActiveStep(key);
  }
  // set the active step and --> will render this component
  setActiveStep(key) {
    let initialSteps = this.state.steps;
    let activeKey = key;
    let newSteps = _.map(initialSteps, (step, index) => {
      if (activeKey === step.key) {
        step.active = true;
      } else {
        step.active = false;
      }
      return step;
    });
    this.setState({ steps: newSteps });
  }
  // go to next step
  nextStep() {
    const newActive = this.state.activeKey + 1;
    this.onStepChange(newActive);
  }
  // get content for component of this step
  getStepContent() {
    return this.state.steps[this.state.activeKey].content;
  }
  // toggle completed
  toggleCompleted(id) {
    if (id !== null) {
      this.setCompleted();
    } else {
      this.setUnCompleted();
    }
  }
  // set this step as completed
  setCompleted() {
    let initialSteps = this.state.steps;
    let newSteps = _.map(initialSteps, (step, index) => {
      if (step.key === this.state.activeKey) {
        step.completed = true;
        // enable next step
      } else if (step.key === this.state.activeKey + 1) {
        step.disabled = false;
        step.completed = false;
      }
      return step;
    });
    this.setState({ steps: newSteps });
    this.nextStep();
  }
  // set this step as uncompleted
  setUnCompleted() {
    let initialSteps = this.state.steps;
    let newSteps = _.map(initialSteps, (step, index) => {
      if (step.key === this.state.activeKey) {
        step.completed = false;
        // disable next steps
      } else if (step.key > this.state.activeKey) {
        step.disabled = true;
        step.completed = false;
      }
      return step;
    });
    this.setState({ steps: newSteps });
  }
  // set style choice
  setStyle(style) {
    this.setState({ style: style.id });
    // add style to store
    this.props.onStyleSelect(style.id);
    this.toggleCompleted(style.id);
    // set available options
    this.props.onSetDesignOptions(style.options);
    // set base for customizations
    this.props.setCustomizations({
      id: style.id,
      name: '',
      price: null,
      base: style.base,
      imageUri: null,
      addedOptions: [],
    });
  }
  // get style choice
  getStyle() {
    return this.state.style;
  }
  addDesignToCart() {
    const cartItem = {
      customDesign: this.props.customDesign,
      title: this.props.customDesign.name,
      price: this.props.customDesign.price,
      imageUri: this.props.customDesign.imageUri,
    };
    console.log('addToCart', cartItem);
    // store image of design in store

    // adds item to cart store
    this.props.onAddToCart(cartItem);
    // go to cart page
    this.goToCart();
  }
  goToCart() {
    this.setState({ redirect: true });
  }
  render() {
    return (
      <div>
        {this.state.redirect ? (
          <Redirect push to="/cart" />
        ) : (
          <div>
            <Segment
              style={{ paddingBottom: '0px' }}
              className="no-borders"
              vertical
              attached="top"
            >
              <Grid
                centered
                columns={2}
                verticalAlign="top"
                style={{ padding: '1em 1em' }}
                attached="top"
              >
                <DDPreview />
              </Grid>
            </Segment>
            <Segment
              className="no-borders"
              size="mini"
              style={{ padding: '0em 0em' }}
              vertical
              attached
            >
              <div
                ref={div => {
                  this.customizer = div;
                }}
              />
              <StepGroup onClick={this.onStepChange} steps={this.state.steps} />
            </Segment>
            <Segment
              className="no-borders"
              style={{ paddingBottom: '6em', paddingTop: '0em' }}
              vertical
              attached="bottom"
            >
              {this.getStepContent()}
            </Segment>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    onStyleSelect: id => {
      dispatch(setStyle(id));
    },
    onSetDesignOptions: opts => {
      dispatch(setDesignOptions(opts));
    },
    onAddToCart: id => {
      dispatch(addToCart(id));
    },
    setCustomizations: base => {
      dispatch(setCustomizations(base));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DDShopWizard);
