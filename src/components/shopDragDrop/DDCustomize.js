import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Dropdown, Container, Segment } from 'semantic-ui-react';
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
    this.handleChoiceSelect = this.handleChoiceSelect.bind(this);
    this.getChoices = this.getChoices.bind(this);
    this.state = {
      // current selected choice for the active dropdown option
      option: 0,
    };
  }
  componentWillUnmount() {
    console.log('customize unmount');
  }
  handleChoiceSelect(data) {
    // add this image to preview canvas
    let currentCustomizations = this.props.customDesign;
    console.log(
      'handleChoiceSelect currentCustomizations',
      currentCustomizations,
    );
    if (currentCustomizations.addedOptions) {
      let customId = data.id + '_' + Math.floor(Math.random() * 1000 + 1);
      let newOption = {
        x: 175,
        y: 170,
        id: customId,
        src: data.src,
        key: customId + '_key',
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
      return { text: option, value: index };
    });
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
            choice.src = choice.src[option.view];
          } else {
            choice.src = choice.src['top'];
          }
        }
        let ret = {
          id: choice.id,
          src: choice.src,
          content: <SMImage key={choice.id} {...choice} />,
        };
        return ret;
      });
    } else {
      return {};
    }
  }
  render() {
    console.log('customize props', this.props);
    return (
      <Segment className="no-borders" style={{ margin: '1em', marginTop: 0 }}>
        <Container>
          <h4 style={{ marginTop: 0, marginBottom: '0.5em' }}>
            Select option:
          </h4>
          <Dropdown
            placeholder="Option #1"
            selection
            fluid
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
  firestoreConnect(['florals', 'greenery']),
  connect(mapStateToProps, mapDispatchToProps),
)(DDCustomize);
