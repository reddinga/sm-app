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

import SMImage from '../common/SMImage';
class AboutLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Segment className="no-borders">
        <Container text={true}>
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
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="justify">
                <p>
                  Flowers instanly make your space feel happier and more
                  inviting. Fresh flowers are lovely, but they require a lot of
                  upkeep and are expensive to keep replacing. Our high-quality
                  real touch flowers look better than fresh, without the work.
                  <br />
                  <br /> All Silver Maple products are custom designed by you.
                  We offer custom designs because they allow customers to
                  experience the joy of creating something unique for themselves
                  or their friends and family. We hope you enjoy this experience
                  as much as we do!
                </p>
              </Grid.Column>
            </Grid.Row>

            <Divider />
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1">about our name</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <p>
                  This is Maple the Goldendoodle. She is VP of Doodle Relations
                  and consistenly wins employee of the month.
                </p>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column textAlign="center">
                <SMImage src="images/maple.png" size="medium" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}

export default AboutLayout;
