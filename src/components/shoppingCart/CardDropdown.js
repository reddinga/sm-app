import React, { Component } from 'react';
import { Segment, Select } from 'semantic-ui-react';

class CardDropdown extends Component {
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
          typeof sourceVal === 'object' &&
          sourceVal.last4
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
    this.setState({ selectedSource: value });
    let cardText = '';
    let cardIcon = '';
    let card = null;
    let selectedCard = this.state.cards.find(card => {
      if (card.value === value) {
        return true;
      }
    });
    if (selectedCard) {
      card = {
        text: selectedCard.text,
        icon: selectedCard.icon,
      };
    }
    this.props.setSelectedCard(card);
    this.props.onSelectCard(value);
  };
  componentWillReceiveProps(nextProps) {
    if (this.props.sources !== nextProps.sources) {
      this.setState({ cards: this.getCards(nextProps.sources) });
    }
  }
  render() {
    let selectedSource = this.props.getSelectedSource();
    let value = null;
    if (selectedSource) {
      console.log('selectedSource from props', selectedSource);
      value = selectedSource;
    } else if (this.state.selectedSource) {
      console.log('selectedSource from state');
      value = this.state.selectedSource;
    }
    if (this.state.cards && this.state.cards.length > 0) {
      return (
        <div>
          <h4>Saved Cards</h4>
          <Select
            placeholder="Select card"
            options={this.state.cards}
            onChange={this.handleChange}
            value={value}
          />
        </div>
      );
    } else {
      return (
        <div>
          <h4>Saved Cards</h4>
          <p>No saved cards</p>
        </div>
      );
    }
  }
}

export default CardDropdown;
