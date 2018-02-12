import React, { Component } from 'react';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Dropdown, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import FirestoreImage from '../common/FirestoreImage';
import CardGroupSelect from '../common/CardGroupSelect';
import { setCustomizations } from '../../actions';
// options-- type-- load choices-- make selection-- update preview image & store in redux
// all choices--> add to cart

class Customize extends Component {
  constructor(props) {
    super(props);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
    this.getChoices = this.getChoices.bind(this);
    this.state = {
      // current selected choice for the active dropdown option
      selectedChoice: null,
      option: null, //{ id: null, type: null, x: null, y: null },
    };
  }
  componentWillUnmount() {
    console.log('customize unmount');
    this.props.setDesignComplete(false);
  }
  handleChoiceChange(data) {
    console.log('handleChoiceChange data id', data.id);
    const id = data.id;
    this.setState({
      resetState: false,
      selectedChoice: id,
    });
    const customizations = this.props.customizations;

    let complete = true;
    const newOpts = customizations.opts.map(opt => {
      if (opt.optionId === this.state.option.id) {
        opt.src = data.src;
        opt.id = id + '-' + opt.optionId;
      }
      if (typeof opt.src === 'undefined' || opt.src === null) {
        complete = false;
      }
      return opt;
    });
    customizations.opts = newOpts;
    this.props.onChoiceSelect(customizations);
    this.props.setDesignComplete(complete);
  }
  handleDropdownChange(event, data) {
    let sel = null;
    if (this.props.customizations.opts[data.value]) {
      sel = this.props.customizations.opts[data.value].id;
    }

    let re = /(\w*)-/;
    let found = re.exec(sel);
    if (found) {
      sel = found[1];
    }

    this.setState({
      option: this.props.designOptions[data.value],
      selectedChoice: sel,
      resetState: true,
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
    // un-select choice option

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
    console.log(this.props);
    return (
      <Container>
        <h1>Customize</h1>
        <h3 style={{ marginTop: 0 }}>Select option: </h3>
        <Dropdown
          placeholder="Option #1"
          selection
          onChange={this.handleDropdownChange}
          options={this.getDropdownOptions(this.props.designOptions)}
        />
        <CardGroupSelect
          itemsPerRow={5}
          cardOptions={this.getChoices(this.state.option)}
          handleChoiceChange={this.handleChoiceChange}
          selected={this.state.selectedChoice}
          resetState={this.state.resetState}
        />
      </Container>
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
    onChoiceSelect: opts => {
      dispatch(setCustomizations(opts));
    },
  };
};
export default compose(
  firestoreConnect(['florals', 'greenery']),
  connect(mapStateToProps, mapDispatchToProps),
)(Customize);