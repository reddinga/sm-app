import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  List,
  Menu,
  Segment,
  Visibility,
  Responsive,
  Card,
  Dropdown,
} from 'semantic-ui-react';

class AboutLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Segment className="no-borders">
        <Container>
          <Grid
            doubling
            container
            stackable
            verticalAlign="middle"
            relaxed="very"
          >
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1">we love beautiful flowers</Header>
                <Header as="h1">we hate throwing them out</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="justify">
                <p>
                  When we discovered real touch flowers we fell in LOVE! We had
                  never seen faux florals that looked so natural before. We
                  began making our own faux flower arrangements and wanted to
                  share them with the world. All of our florals are
                  custom-designed and handmade. We love offering custom designs.
                  This allows our customers to personalize their items for their
                  homes or the homes of their gift-recipients
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default AboutLayout;
