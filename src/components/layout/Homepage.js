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
import { Link } from 'react-router-dom';
import SMImage from '../common/SMImage';
import background from '../../assets/images/background/florist_large.png';
import backgroundMobile from '../../assets/images/background/florist_large_cropped_mobile.png';

const dividerSrc = '../../assets/images/decorative/divider_simple.png';

const FixedMenu = () => (
  <Menu fixed="top" size="large" widths={4}>
    <Container>
      <Menu.Item as={Link} to="/" active>
        <Header as="h4">home</Header>
      </Menu.Item>
      <Dropdown item text="shop">
        <Dropdown.Menu>
          <Dropdown.Item
            as={Link}
            to="/shop/arrangements"
            text="arrangements"
          />

          <Dropdown.Item as={Link} to="/shop/wreaths" text="wreaths" />

          <Dropdown.Item as={Link} to="/shop/bouquets" text="bouquets" />
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item as={Link} to="/custom">
        <Header as="h4">create</Header>
      </Menu.Item>
      <Menu.Item as={Link} to="/about">
        <Header as="h4">about us</Header>
      </Menu.Item>
      <Menu.Item positiona="right" as={Link} to="/cart" name="cart">
        <Header as="h6">
          <Icon name="shopping bag" />
        </Header>
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
          size="medium"
          as={Link}
          to="/custom"
          style={{
            fontSize: '1.5em',
            marginBottom: '0',
            marginTop: mobile ? '8em' : '8em',
          }}
        >
          start customizing
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
                  <Header as="h1" />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column textAlign="center">
                  <SMImage
                    src="images/products/rose-arrangement.png"
                    size="medium"
                  />
                  <Header as="h4">arrangements</Header>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <SMImage
                    src="images/products/peony-flower-wreath_300.png"
                    size="medium"
                  />
                  <Header as="h4">wreaths</Header>
                </Grid.Column>
                <Grid.Column textAlign="center" as={Link} to="/shop/bouquets">
                  <SMImage
                    src="images/products/white-peony-bouquet.png"
                    size="medium"
                  />
                  <Header as="h4">bouquets</Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Divider />
        <Segment className="no-borders" style={{ paddingTop: '1.8em' }}>
          <Container text>
            <Grid relaxed="very">
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Header as="h1">Custom Florals for All Occasions</Header>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row style={{ paddingBottom: '0em' }}>
                <Grid.Column textAlign="center">
                  <p>Online customization is quick, fun, and easy!</p>
                  <p>Perfect for:</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row style={{ paddingTop: '1em', paddingBottom: '1em' }}>
                <Grid.Column textAlign="left">
                  <List>
                    <List.Item>
                      <List.Content>
                        <List.Header>Personalized Gifts</List.Header>
                        <List.Description>
                          With your recipient's favorite colors and flowers
                        </List.Description>
                      </List.Content>
                    </List.Item>{' '}
                    <List.Item>
                      <List.Content>
                        <List.Header>Home Decor</List.Header>
                        <List.Description>
                          Perfectly coordinated with your style
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Header>Wedding Florals</List.Header>
                        <List.Description>
                          Everlasting arrangements and bouquets to match your
                          color scheme
                        </List.Description>
                      </List.Content>
                    </List.Item>
                    <List.Item>
                      <List.Content>
                        <List.Header>Holiday Decor</List.Header>
                        <List.Description>
                          Festive decorations that are elegant yet fun
                        </List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Button
                    secondary
                    size="small"
                    as={Link}
                    to="/custom"
                    style={{
                      fontSize: '1em',
                    }}
                  >
                    customize
                  </Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
        <Divider />
        <Segment className="no-borders">
          <Container text>
            <Grid relaxed="very">
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Header as="h1">Quality and Styles that Last</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <p>
                    We always use the highest quality faux florals in our
                    products <br /> Most are "Real Touch" flowers that look and
                    feel just like natural flowers
                    <br />
                    <br />
                    Our timeless products will brighten your home for years to
                    come!
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
