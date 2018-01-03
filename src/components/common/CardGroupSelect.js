import React, { Component } from 'react';
import { Image, Header, Card, Segment, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import SegmentGroup from 'semantic-ui-react/dist/commonjs/elements/Segment/SegmentGroup';

class CardGroupSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
    };
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }
  offColor = 'grey';
  onColor = 'pink';
  handleOptionClick(event, data) {
    if (this.state.selected === null || this.state.selected !== data.id) {
      this.setState({ selected: data.id });
      console.log('DATA', data);
      this.props.handleChoiceChange({ id: data.id, src: data.src });
    } else if (this.state.selected === data.id) {
      // we are unselecting current option
      this.setState({ selected: null });
      this.props.handleChoiceChange({ id: null, src: null });
    }
  }
  getCards(cardOptions) {
    console.log('card options', cardOptions);
    return _.map(cardOptions, opts => {
      return (
        <Grid.Column
          key={`column-${opts.id}`}
          mobile={Math.round(16 / this.props.itemsPerRow)}
        >
          <Card
            centered
            key={opts.id}
            id={opts.id}
            src={opts.src}
            color={
              this.state.selected === opts.id ? this.onColor : this.offColor
            }
            onClick={this.handleOptionClick}
          >
            {opts.header && <Header>{opts.header}</Header>}

            {opts.content}
          </Card>
        </Grid.Column>
      );
    });
  }
  render() {
    return (
      <Grid centered columns={this.props.itemsPerRow}>
        <Grid.Row centered>{this.getCards(this.props.cardOptions)}</Grid.Row>
      </Grid>
    );
  }
}

export default CardGroupSelect;
