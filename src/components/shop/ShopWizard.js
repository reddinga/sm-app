import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';
import StepGroup from '../common/StepGroup';
import ChooseStyle from './ChooseStyle';
import ChooseDesign from './ChooseDesign';
import Preview from './Preview';
import Customize from './Customize';
import { connect } from 'react-redux';
import {
  addToCart,
  setStyle,
  setDesign,
  setDesignOptions,
  setCustomizations,
  setDesignComplete,
} from '../../actions';
import AddToCartToastr from '../common/AddToCartToastr';
import scrollToComponent from 'react-scroll-to-component';

class ShopWizard extends Component {
  constructor(props) {
    super(props);

    this.onStepChange = this.onStepChange.bind(this);
    this.setStyle = this.setStyle.bind(this);
    this.getStyle = this.getStyle.bind(this);
    this.setDesign = this.setDesign.bind(this);
    this.getDesign = this.getDesign.bind(this);
    this.nextStep = this.nextStep.bind(this);
    this.setDesignComplete = this.setDesignComplete.bind(this);
    this.addDesignToCart = this.addDesignToCart.bind(this);
    this.goToCart = this.goToCart.bind(this);

    this.state = {
      redirect: false,
      activeKey: 0,
      style: this.props.style,
      design: this.props.design,
      steps: [
        {
          title: 'Select Style',
          active: true,
          completed: false,
          disabled: false,
          key: 0,
          description: '',
          content: (
            <ChooseStyle
              nextStep={this.nextStep}
              setStyle={this.setStyle}
              getStyle={this.getStyle}
            />
          ),
        },
        {
          title: 'Select Design',
          active: false,
          completed: false,
          disabled: true,
          key: 1,
          description: '',
          content: (
            <ChooseDesign
              nextStep={this.nextStep}
              setDesign={this.setDesign}
              getDesign={this.getDesign}
              getStyle={this.getStyle}
            />
          ),
        },
        {
          title: 'Customize',
          active: false,
          completed: false,
          disabled: true,
          key: 2,
          description: '',
          content: <Customize setDesignComplete={this.setDesignComplete} />,
        },
      ],
    };
  }
  componentDidMount() {
    scrollToComponent(this.customizer);
  }
  componentWillUnmount() {
    toastr.remove('addToCartToastr');
    this.props.onStyleSelect(null);
    this.props.onDesignSelect(null);
    this.props.setCustomizations(null);
    this.props.onSetDesignOptions(null);
    this.props.onSetDesignComplete(false);
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
  setStyle(id) {
    this.setState({ style: id });
    this.props.onStyleSelect(id);
    this.toggleCompleted(id);
    // when setting style to new options or null,
    // set any previous design choices to null
    this.props.setCustomizations(null);
    this.props.onSetDesignOptions(null);
    this.setState({ design: null });
    this.props.onDesignSelect(null);
  }
  // get style choide
  getStyle() {
    return this.state.style;
  }
  // set design choice
  setDesign(id) {
    this.setState({ design: id });
    this.props.onDesignSelect(id);
    this.toggleCompleted(id);
  }
  // get design choice
  getDesign() {
    return this.state.design;
  }
  setDesignComplete(complete) {
    this.props.onSetDesignComplete(complete);
  }
  addDesignToCart() {
    const cartItem = {
      design: this.state.design,
      customDesign: this.props.customDesign,
      title: this.props.customDesign.name,
      price: this.props.customDesign.price,
    };
    console.log('addToCart', cartItem);
    this.props.onAddToCart(cartItem);
    this.props.onSetDesignComplete(false);
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
            <Segment className="no-borders" vertical attached="top">
              <Grid
                centered
                columns={2}
                verticalAlign="top"
                style={{ padding: '1em 1em' }}
                attached="top"
              >
                <Preview />
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
              style={{ paddingBottom: '6em' }}
              vertical
              attached="bottom"
            >
              {this.getStepContent()}
            </Segment>
          </div>
        )}

        <AddToCartToastr
          show={this.props.designComplete}
          onClick={this.addDesignToCart}
        />
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
    onDesignSelect: id => {
      dispatch(setDesign(id));
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
    onSetDesignComplete: complete => {
      dispatch(setDesignComplete(complete));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopWizard);
