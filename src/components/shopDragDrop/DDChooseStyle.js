import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CardGroupSelect from '../common/CardGroupSelect';
import { Container } from 'semantic-ui-react';
import SMImage from '../common/SMImage';

class DDChooseStyle extends Component {
  constructor(props) {
    super(props);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
  }
  handleChoiceChange(data) {
    let chosenStyle = this.props.styles.find(style => {
      if (style.id === data.id) {
        return true;
      } else {
        return false;
      }
    });
    if (chosenStyle && typeof chosenStyle !== 'undefined') {
      console.log('chosenStyle', chosenStyle);
      this.props.setStyle(chosenStyle);
    }
  }
  getStyleOptions() {
    if (this.props.styles) {
      const styles = this.props.styles;
      return styles.map((style, index) => {
        return {
          id: style.id,
          price: style.base.price,
          header: style.header,
          content: <SMImage src={style.src} />,
          bottomLabel:
            'Starting at ' +
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(style.base.price),
        };
      });
    } else {
      return {};
    }
  }
  render() {
    return (
      <Container>
        <CardGroupSelect
          itemsPerRow={3}
          cardOptions={this.getStyleOptions()}
          handleChoiceChange={this.handleChoiceChange}
          selected={this.props.getStyle()}
        />
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  return { styles: state.firestore.ordered.styles };
};

export default compose(
  firestoreConnect(['styles']),
  connect(mapStateToProps),
)(DDChooseStyle);
