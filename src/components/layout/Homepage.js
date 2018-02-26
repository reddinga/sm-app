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
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import FirestoreImage from '../common/FirestoreImage';
import background from '../../assets/images/background/bring_spring_inside.png';
import backgroundMobile from '../../assets/images/background/bring_spring_inside_mobile.png';

const dividerSrc = '../../assets/images/decorative/divider_simple.png';

const FixedMenu = () => (
  <Menu fixed="top" size="large">
    <Container>
      <Menu.Item as={Link} to="/" active>
        Home
      </Menu.Item>
      <Menu.Item as={Link} to="/shop">
        Shop
      </Menu.Item>
      <Menu.Item as="a">About us</Menu.Item>
      <Menu.Item position="right">
        <Button as="a">Log in</Button>
        <Button as="a" style={{ marginLeft: '0.5em' }}>
          Sign Up
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
);
var sectionStyle = {
  width: '90%',
  height: 'auto',
  minHeight: '400px',
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '1em',
  padding: '1em 0em',
  background: `url(${background}) no-repeat center center `,
  backgroundSize: 'cover',
};
var mobileSectionStyle = {
  width: '90%',
  height: 'auto',
  minHeight: '400px',
  position: 'relative',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '1em',
  padding: '1em 0em',
  background: `url(${backgroundMobile}) no-repeat center center `,
  backgroundSize: 'cover',
};

export default class Homepage extends Component {
  state = {};

  hideFixedMenu = () => this.setState({ visible: false });
  showFixedMenu = () => this.setState({ visible: true });
  renderCover(mobile) {
    return (
      <Container text>
        <Button
          primary
          size="large"
          as={Link}
          to="/shop"
          style={{
            fontSize: '1.5em',
            fontWeight: 'bold',
            fontFamily: 'Abhaya Libre',
            marginBottom: '0',
            marginTop: mobile ? '11em' : '11em',
          }}
        >
          Choose a Style
          <Icon name="right arrow" />
        </Button>
      </Container>
    );
  }
  render() {
    const { visible } = this.state;

    return (
      <div>
        {visible ? <FixedMenu /> : null}

        <Visibility
          onBottomPassed={this.showFixedMenu}
          onBottomVisible={this.hideFixedMenu}
          once={false}
        >
          <Responsive
            as={Segment}
            minWidth={1024}
            textAlign="center"
            vertical
            raised
            style={sectionStyle}
          >
            {this.renderCover(false)}
          </Responsive>
          <Responsive
            as={Segment}
            maxWidth={1024}
            textAlign="center"
            vertical
            style={mobileSectionStyle}
          >
            <div>{this.renderCover(true)}</div>
          </Responsive>
        </Visibility>

        <Segment>
          <Grid doubling container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h1">Handmade Custom Designs</Header>
                <FirestoreImage
                  src="/images/web-details/divider_simple.png"
                  size={null}
                />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns={3}>
              <Grid.Column textAlign="center">
                <FirestoreImage
                  src="/images/products/tulip-arrangement.png"
                  size="medium"
                />
                <p style={{ fontSize: '2em' }}>arrangements</p>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <FirestoreImage
                  src="/images/products/peony-flower-wreath_300.png"
                  size="medium"
                />
                <p style={{ fontSize: '2em' }}>wreaths</p>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <FirestoreImage
                  src="/images/products/white-peony-bouquet.png"
                  size="medium"
                />
                <p style={{ fontSize: '2em' }}>bouquets</p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment vertical>
          <Container text>
            <Grid relaxed="very">
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Header as="h3" style={{ fontSize: '2em' }}>
                    Florals for All Occasions
                  </Header>
                  <FirestoreImage
                    src="/images/web-details/divider_simple.png"
                    size={null}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row style={{ paddingBottom: '0em' }}>
                <Grid.Column textAlign="center">
                  <p style={{ fontSize: '1.33em' }}>
                    All designs are customized with the flowers and colors of
                    your choice. <br /> Our products are ideal for:
                  </p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                <Grid.Column textAlign="left">
                  <List>
                    <List.Item>
                      <List.Header>Home decor</List.Header>
                      Perfectly coordinated with your style
                    </List.Item>
                    <List.Item>
                      <List.Header>Custom gifts</List.Header>
                      With your recipient's favorite colors and flowers
                    </List.Item>
                    <List.Item>
                      <List.Header>Wedding florals</List.Header>
                      Arrangements and bouquets to match your color scheme
                    </List.Item>
                    <List.Item>
                      <List.Header>Holiday decorations</List.Header>
                      Designs that are elegant yet fun
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Button primary as={Link} to="/shop">
                    Start customizing
                    <Icon name="right arrow" />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        {/*  <Divider horizontal style={{ padding: '1em 0em' }}>
          <Icon disabled name="wizard" size="mini" />
        </Divider> */}
        <Segment attached="bottom" style={{ paddingTop: '1.8em' }}>
          <Grid relaxed="very">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Quality and Styles that Last
                </Header>
                <FirestoreImage
                  src="/images/web-details/divider_simple.png"
                  size={null}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <p style={{ fontSize: '1.33em' }}>
                  We use the highest quality faux florals in all of our
                  products. <br /> Our "real touch" flowers look and feel more
                  like real flowers than any silk flower.
                  <br /> <br />
                  Our designs are classic and timeless&mdash; <br />
                  <em>you</em> make them unique.
                </p>
                <Button primary as={Link} to="/shop">
                  Shop
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <List link inverted>
                    <List.Item as="a">Contact Us</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <small>&copy; Copyright 2018, Silver Maple Studio</small>
          </Container>
        </Segment>
      </div>
    );
  }
}
