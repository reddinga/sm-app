import React, { Component } from 'react';
class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getCards = () => {
    console.log(this.props.sources);
    let sourceList = [];
    if (this.props.sources) {
      Object.keys(this.props.sources).forEach(sourceId => {
        const sourceVal = this.props.sources[sourceId];
        if (
          sourceVal &&
          sourceVal !== 'undefined' &&
          typeof sourceVal === 'object'
        ) {
          sourceList.push(
            <div key={sourceVal.last4}>
              <h3>{sourceVal.brand}</h3>
              <span>{sourceVal.last4}</span>
            </div>,
          );
        }
      });
    } else {
      return <div>No saved cards</div>;
    }

    if (sourceList.length > 0) {
      return sourceList;
    } else {
      return <div>No saved cards</div>;
    }
  };

  render() {
    console.log(this.props);
    return <div>{this.getCards()}</div>;
  }
}

export default CardList;
