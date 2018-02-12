import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import CardGroupSelect from '../common/CardGroupSelect';
import { Container } from 'semantic-ui-react';
import FirestoreImage from '../common/FirestoreImage';

class ChooseStyle extends Component {
  constructor(props) {
    super(props);
    this.handleChoiceChange = this.handleChoiceChange.bind(this);
  }
  handleChoiceChange(data) {
    this.props.setStyle(data.id);
  }
  getStyleOptions() {
    if (this.props.styles) {
      const styles = this.props.styles;
      return styles.map((style, index) => {
        return {
          id: style.id,
          header: style.header,
          content: <FirestoreImage src={style.src} />,
        };
      });
    } else {
      return {};
    }
  }
  render() {
    return (
      <Container>
        <h1>Select a Style</h1>
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

export default compose(firestoreConnect(['styles']), connect(mapStateToProps))(
  ChooseStyle,
);