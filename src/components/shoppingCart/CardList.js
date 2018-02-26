import React, { Component } from 'react';
import { Segment, Select } from 'semantic-ui-react';

// [{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' }, ...{}]

class CardList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.state = { cards: this.getCards(this.props.sources) };
  }
  getCards = sources => {
    console.log(sources);
    let sourceList = [];
    if (sources) {
      Object.keys(sources).forEach(sourceId => {
        const sourceVal = sources[sourceId];
        if (
          sourceVal &&
          sourceVal !== 'undefined' &&
          typeof sourceVal === 'object'
        ) {
          let iconName;
          switch (sourceVal.brand) {
            case 'Visa':
              iconName = 'visa';
              break;
            case 'American Express':
              iconName = 'american express';
              break;
            case 'Mastercard':
              iconName = 'mastercard';
              break;
            case 'Discover':
              iconName = 'discover';
              break;
            default:
              iconName = 'credit card alternative';
              break;
          }
          sourceList.push({
            key: sourceVal.last4,
            value: sourceVal.id,
            text: '...' + sourceVal.last4,
            icon: iconName,
          });
        }
      });
    }

    return sourceList;
  };
  handleChange = (e, { value }) => {
    console.log('handleChange', value);
    this.props.onSelectCard(value);
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.sources !== nextProps.sources) {
      this.setState({ cards: this.getCards(nextProps.sources) });
    }
    console.log('componentWillReceiveProps', nextProps);
  }
  render() {
    console.log(this.props);
    console.log('cards', this.state.cards);
    if (this.state.cards && this.state.cards.length > 0) {
      return (
        <div>
          <h2>Saved Cards</h2>
          <Select
            placeholder="Select card"
            options={this.state.cards}
            onChange={this.handleChange}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h2>Saved Cards</h2>
          <p>No saved cards</p>
        </div>
      );
    }
  }
}

export default CardList;
