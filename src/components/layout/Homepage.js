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
  renderCover() {
    return (
      <Container text>
        <Header
          as="h1"
          content=""
          style={{
            fontSize: '4em',
            fontWeight: 'bold',
            fontFamily: 'Abhaya Libre',
            marginBottom: '0',
            marginTop: '3em',
          }}
        />
        {/*   <Header
          as="h2"
          content="Create your own everlasting florals & botanicals"
          style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        /> */}
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
            marginTop: '1.5em',
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
            {this.renderCover()}
          </Responsive>
          <Responsive
            as={Segment}
            maxWidth={1024}
            textAlign="center"
            vertical
            style={mobileSectionStyle}
          >
            <div>{this.renderCover()}</div>
          </Responsive>
        </Visibility>

        {/*<Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h2">
                  We Make Beautiful Designs to Brighten Your Home Year-Round
                </Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Button size="huge">Check Them Out</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>*/}
        <Segment>
          <Card.Group itemsPerRow={2} stackable>
            {/*             <Card>
              <Card.Content>
                <Card.Header>Bouquets</Card.Header>
              </Card.Content>
              <Card.Content>
                <FirestoreImage
                  src="/images/products/peony-vase.png"
                  size="large"
                />
              </Card.Content>
   
            </Card> */}

            <Card>
              {/*             <Card.Content>
                <Card.Header>Wreaths</Card.Header>
              </Card.Content> */}
              <Card.Content>
                <FirestoreImage
                  src="/images/products/peony-flower-wreath-background.png"
                  size="large"
                />
              </Card.Content>
              {/*      <Card.Content extra>
                <div>
                  <Button basic color="green">
                    Customize
                  </Button>
                </div>
              </Card.Content> */}
            </Card>

            <Card>
              <Card.Content>
                <FirestoreImage
                  src="/images/products/peony-vase-background.png"
                  size="large"
                />
              </Card.Content>
            </Card>
          </Card.Group>
        </Segment>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Container text>
            <Header as="h3" style={{ fontSize: '2em' }}>
              Breaking The Grid, Grabs Your Attention
            </Header>
            <p style={{ fontSize: '1.33em' }}>...</p>
            <Button as="a" size="large">
              Read More
            </Button>

            <Divider
              as="h4"
              className="header"
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}
            >
              <a href="#1">Case Studies</a>
            </Divider>

            <Header as="h3" style={{ fontSize: '2em' }}>
              Did We Tell You About ...?
            </Header>
            <p style={{ fontSize: '1.33em' }}>...</p>
            <Button as="a" size="large">
              I'm Still Quite Interested
            </Button>
          </Container>
        </Segment>

        <Segment inverted vertical style={{ padding: '5em 0em' }}>
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="About" />
                  <List link inverted>
                    <List.Item as="a">Sitemap</List.Item>
                    <List.Item as="a">Contact Us</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as="h4" content="Services" />
                  <List link inverted>
                    <List.Item as="a">FAQ</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as="h4" inverted>
                    Footer Header
                  </Header>
                  <p>
                    Extra space for a call to action inside the footer that
                    could help re-engage users.
                    <a href="https://www.freepik.com/free-vector/hand-drawn-flowers-and-leaves_1141262.htm">
                      Flower Designs
                    </a>
                    <a href="https://www.freepik.com/free-vector/floral-decoration-and-ornaments_772982.htm">
                      Floral Designs
                    </a>
                    <a href="https://www.freepik.com/free-vector/nature-ornaments-design_902717.htm">
                      Nature Designs
                    </a>
                    <a href="https://www.freepik.com/free-vector/outlined-hand-drawn-wreath_894844.htm">
                      Wreath Design
                    </a>
                  </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}
