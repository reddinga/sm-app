import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Dropdown, Segment, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Image } from 'semantic-ui-react';
import FirestoreImage from '../common/FirestoreImage';
import getImage from '../common/getImage';
import CardGroupSelect from '../common/CardGroupSelect';
import { setCustomizations } from '../../actions';
// options-- type-- load choices-- make selection-- update preview image & store in redux
// all choices--> add to cart

class Customize extends Component {
  constructor(props) {
    super(props);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.state = {
      options: { id: null, choice: null },
      option: null, //{ id: null, type: null, x: null, y: null },
    };
  }
  handleChoiceChange(data) {
    const id = data.id;
    this.setState({ options: { id: this.state.option.id, choice: id } });
    const customizations = this.props.customizations;
    const choiceSrc = '';
    const newOpts = customizations.opts.map(opt => {
      console.log(opt);
      console.log(this.state.option.id);
      if (opt.optionId === this.state.option.id) {
        opt.src = data.src;
        opt.id = id;
      }
      return opt;
    });
    console.log('newopts', newOpts);
    customizations.opts = newOpts;
    this.props.onChoiceSelect(customizations);
  }
  handleDropdownChange(event, data) {
    this.setState({
      option: this.props.designOptions[data.value],
    });
  }
  getDropdownOptions(opts) {
    return opts.map((opt, index) => {
      return { text: 'Option #' + (index + 1), value: index };
    });
  }
  getChoices(opt) {
    // based on selected option category, set choices (ie. flowers, greens)
    // changed to based on category, get data from certain collections
    // order by type
    // to provide component w/ data: compose(firestoreConnect(['designs']),connect(
    let choices = [];
    if (opt && opt.type && this.props.florals && this.props.greenery) {
      if (opt.type === 'florals') {
        choices = this.props.florals;
      } else if (opt.type === 'greenery') {
        choices = this.props.greenery;
      }
      return choices.map(choice => {
        if (typeof choice.src === 'object') {
          choice.src = choice.src[opt.view];
        }
        let ret = {
          id: choice.id,
          src: choice.src,
          content: (
            <FirestoreImage key={choice.id} {...choice} canvas={false} />
          ),
        };
        return ret;
      });
    } else {
      return {};
    }
  }
  render() {
    console.log('customize props: ', this.props);
    console.log('customize state:', this.state);
    return (
      <Container>
        <Segment
          style={{ padding: '4em 4em 10em 4em' }}
          textAlign="left"
          vertical
        >
          <h1>Customize</h1>
          <h3>Select option: </h3>

          <Dropdown
            placeholder="Option #1"
            selection
            onChange={this.handleDropdownChange}
            options={this.getDropdownOptions(this.props.designOptions)}
          />
          <Segment>
            <CardGroupSelect
              itemsPerRow={5}
              cardOptions={this.getChoices(this.state.option)}
              handleChoiceChange={this.handleChoiceChange}
              selected={null}
            />
          </Segment>
        </Segment>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  console.log('customize state', state);
  return {
    florals: state.firestore.ordered.florals,
    greenery: state.firestore.ordered.greenery,
    ...state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChoiceSelect: opts => {
      dispatch(setCustomizations(opts));
    },
  };
};
export default compose(
  firestoreConnect(['florals', 'greenery']),
  connect(mapStateToProps, mapDispatchToProps)
)(Customize);
