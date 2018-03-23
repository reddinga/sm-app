import React from 'react';
import { Segment, Container, Grid, List } from 'semantic-ui-react';

export default props => {
  return (
    <Segment
      className="darkWhiteBackground"
      attached="bottom"
      vertical
      style={{ padding: '0.25em 0em' }}
    >
      <Container>
        {/*<Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <List link inverted>
                <List.Item as="a">Contact Us</List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>*/}
        <small>&copy; Copyright 2018, Silver Maple Studio</small>
      </Container>
    </Segment>
  );
};
