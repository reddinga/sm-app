import React, { Component } from 'react';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Responsive,
  Card,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import bouquet_sketch from '../../assets/images/bouquet_sketch.jpg';
import wreath_sketch from '../../assets/images/wreath_sketch.jpg';
import arrangement_sketch from '../../assets/images/arrangement_sketch.jpg';
import background from '../../assets/images/florist_large.jpeg';

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
  width: '100%',
  height: 'auto',
  minHeight: '700px',
  padding: '1em 0em',
  background: `url(${background}) no-repeat center center fixed`,
  backgroundSize: 'cover',
};
var mobileSectionStyle = {
  width: '100%',
  padding: '1em 0em',
  minHeight: '700px',
  background: `url(${background})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
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
          content="Refined. Modern. Handmade."
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        <Header
          as="h2"
          content="Create your own everlasting florals & botanicals"
          style={{ fontSize: '1.7em', fontWeight: 'normal' }}
        />
        <Button primary size="huge" as={Link} to="/shop">
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

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column textAlign="center">
                <Header as="h3" style={{ fontSize: '2em' }}>
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
        </Segment>
        <Card.Group itemsPerRow={3} stackable>
          <Card>
            <Card.Content>
              <Card.Header>Bouquet</Card.Header>
            </Card.Content>
            <Card.Content>
              <Image
                centered
                verticalAlign="middle"
                src={bouquet_sketch}
                size="medium"
              />
            </Card.Content>
            <Card.Content extra>
              <div>
                <Button basic color="green">
                  Customize
                </Button>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Wreath</Card.Header>
            </Card.Content>
            <Card.Content>
              <Image
                centered
                verticalAlign="middle"
                src={wreath_sketch}
                size="large"
              />
            </Card.Content>
            <Card.Content extra>
              <div>
                <Button basic color="green">
                  Customize
                </Button>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Content>
              <Card.Header>Arrangement</Card.Header>
            </Card.Content>
            <Card.Content>
              <Image
                centered
                verticalAlign="middle"
                src={arrangement_sketch}
                size="medium"
              />
            </Card.Content>
            <Card.Content extra>
              <div>
                <Button basic color="green">
                  Customize
                </Button>
              </div>
            </Card.Content>
          </Card>
        </Card.Group>

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
