import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  Dropdown,
  Accordion,
  Container,
  Segment,
  Icon,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import SMImage from '../common/SMImage';
import CardGroupSelect from '../common/CardGroupSelect';
import { setCustomizations } from '../../actions';
import AddToCart from '../common/AddToCart';
// options-- type-- load choices-- make selection-- update preview image & store in redux
// all choices--> add to cart

class DDCustomize extends Component {
  constructor(props) {
    super(props);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleBaseSelect = this.handleBaseSelect.bind(this);
    this.handleChoiceSelect = this.handleChoiceSelect.bind(this);
    this.getChoices = this.getChoices.bind(this);
    this.state = {
      // current selected choice for the active dropdown option
      option: 0,
      baseId: this.props.customDesign.base.id,
      activeIndex: 0,
    };
  }
  componentWillUnmount() {
    console.log('customize unmount');
  }
  handleAccordionClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;
    this.setState({ activeIndex: newIndex });
  };
  handleBaseSelect(data) {
    // add this base to preview canvas
    let currentCustomizations = this.props.customDesign;
    console.log(
      'handleBaseSelect currentCustomizations',
      currentCustomizations,
    );
    console.log('handleBaseSelect data', data);
    currentCustomizations.base = data;
    this.props.onSetCustomDesign(currentCustomizations);
  }
  handleChoiceSelect(data) {
    // add this image to preview canvas
    let currentCustomizations = this.props.customDesign;
    console.log(
      'handleChoiceSelect currentCustomizations',
      currentCustomizations,
    );
    console.log('handleChoiceSelect data', data);
    if (currentCustomizations.addedOptions) {
      let customId = data.id + '_' + Math.floor(Math.random() * 1000 + 1);
      let newOption = {
        x: 175,
        y: 170,
        id: customId,
        src: data.src,
        key: customId + '_key',
        price: data.price,
      };
      currentCustomizations.addedOptions.push(newOption);
    }
    this.props.onSetCustomDesign(currentCustomizations);
  }
  handleDropdownChange(event, data) {
    this.setState({
      option: data.value,
    });
  }
  getDropdownOptions(options) {
    return options.map((option, index) => {
      return {
        text: option,
        value: index,
      };
    });
  }
  getBases() {
    // based on selected option category, set choices (ie. flowers, greens)
    // changed to based on category, get data from certain collections
    // order by type
    // to provide component w/ data: compose(firestoreConnect(['designs']),connect(
    let bases = [];
    if (this.props.bases) {
      bases = this.props.bases.filter(base => {
        if (base.baseId === this.state.baseId) {
          return true;
        }
      });

      return bases.map(choice => {
        if (typeof choice.src === 'object') {
          choice.src = choice['src'];
        }
        let ret = {
          price: choice.price,
          id: choice.id,
          src: choice.src,
          bottomLabel: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(choice.price),
          content: <SMImage key={choice.id} {...choice} />,
          footer: choice.size ? choice.size : null,
        };
        return ret;
      });
    } else {
      return {};
    }
  }
  getChoices(optionIndex) {
    // based on selected option category, set choices (ie. flowers, greens)
    // changed to based on category, get data from certain collections
    // order by type
    // to provide component w/ data: compose(firestoreConnect(['designs']),connect(
    let choices = [];
    let option = this.props.designOptions[optionIndex];
    if (option && this.props.florals && this.props.greenery) {
      if (option === 'florals') {
        choices = this.props.florals;
      } else if (option === 'greenery') {
        choices = this.props.greenery;
      }
      return choices.map(choice => {
        if (typeof choice.src === 'object') {
          if (option.view) {
            choice.src = choice[`src${option.view}`];
          } else {
            choice.src = choice['src'];
          }
        }
        let ret = {
          price: choice.price,
          id: choice.id,
          src: choice.src,
          bottomLabel: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
          }).format(choice.price),
          footer: choice.label ? choice.label : null,
          content: <SMImage key={choice.id} {...choice} />,
        };
        return ret;
      });
    } else {
      return {};
    }
  }
  render() {
    const { activeIndex } = this.state;
    return (
      <Segment className="no-borders" style={{ margin: '1em', marginTop: 0 }}>
        <Container>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={this.handleAccordionClick}
            >
              <Icon name="dropdown" />
              Select base:
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <CardGroupSelect
                itemsPerRow={5}
                doubling={false}
                stackable={false}
                cardOptions={this.getBases()}
                handleChoiceChange={this.handleBaseSelect}
              />
            </Accordion.Content>
          </Accordion>

          <Accordion>
            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={this.handleAccordionClick}
            >
              <Icon name="dropdown" />
              Select options:
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <Dropdown
                placeholder="Option #1"
                selection
                fluid
                className="custom-options-dropdown"
                onChange={this.handleDropdownChange}
                defaultValue={0}
                options={this.getDropdownOptions(this.props.designOptions)} // From store
              />
              <CardGroupSelect
                itemsPerRow={5}
                doubling={false}
                stackable={false}
                cardOptions={this.getChoices(this.state.option)}
                handleChoiceChange={this.handleChoiceSelect}
              />
            </Accordion.Content>
          </Accordion>
          <h3>
            Total:
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(this.props.customDesign.price)}
          </h3>
          <AddToCart onClick={this.props.addDesignToCart} />
        </Container>
      </Segment>
    );
  }
}
const mapStateToProps = state => {
  return {
    florals: state.firestore.ordered.florals,
    greenery: state.firestore.ordered.greenery,
    bases: state.firestore.ordered.bases,
    ...state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCustomDesign: opts => {
      dispatch(setCustomizations(opts));
    },
  };
};
export default compose(
  firestoreConnect(['bases', 'florals', 'greenery']),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(DDCustomize);
