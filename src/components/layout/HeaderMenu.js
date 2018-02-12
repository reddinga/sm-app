import React, { Component } from 'react';
import {
  Icon,
  Menu,
  Grid,
  Image,
  Responsive,
  Segment,
  Message,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo/logo.png';
import header1 from '../../assets/images/logo/header1.png';
import header2 from '../../assets/images/logo/header2.png';

class HeaderMenu extends Component {
  state = { activeItem: this.props.location.pathname };

  handleItemClick = (e, { to }) => this.setState({ activeItem: to });

  render() {
    const { activeItem } = this.state;
    return (
      <Segment.Group style={{ margin: '0px' }}>
        <Message style={{ padding: '0.25em' }} attached="top">
          Free Shipping on Orders Over $100
          {/*<Image src={flower} size="mini" />*/}
        </Message>
        <Segment>
          <Responsive minWidth={768}>
            <Grid verticalAlign="middle" columns="equal" centered>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Image as={Link} to="/" src={header1} size="small" />
                </Grid.Column>
                <Grid.Column textAlign="center" width={6}>
                  <Image as={Link} to="/" src={logo} />
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Image as={Link} to="/" src={header2} size="small" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive minWidth={480} maxWidth={768}>
            <Grid verticalAlign="middle" columns="equal" centered>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Image as={Link} to="/" src={header1} size="tiny" />
                </Grid.Column>
                <Grid.Column textAlign="center" width={6}>
                  <Image as={Link} to="/" src={logo} />
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Image as={Link} to="/" src={header2} size="tiny" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive maxWidth={480}>
            <Grid verticalAlign="middle" columns="equal" centered>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Image as={Link} to="/" src={header1} />
                </Grid.Column>
                <Grid.Column textAlign="center" width={8}>
                  <Image as={Link} to="/" src={logo} />
                </Grid.Column>
                <Grid.Column textAlign="center">
                  <Image as={Link} to="/" src={header2} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
        </Segment>
        <Segment style={{ margin: '0px', padding: '0px' }}>
          <Menu
            style={{
              margin: '0em 0em',
              borderBottom: '2px solid rgb(179, 146, 157)',
            }}
            pointing
            secondary
            size="large"
            widths={4}
          >
            <Menu.Item
              as={Link}
              to="/"
              name="home"
              active={activeItem === '/'}
              onClick={this.handleItemClick}
            >
              home
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/shop"
              name="shop"
              active={activeItem === '/shop'}
              onClick={this.handleItemClick}
            >
              shop
            </Menu.Item>
            <Menu.Item
              as="a"
              name="about"
              active={activeItem === '/about'}
              onClick={this.handleItemClick}
            >
              about us
            </Menu.Item>

            <Menu.Item as={Link} to="/cart" name="cart">
              <Icon name="shopping bag" />
            </Menu.Item>
          </Menu>
        </Segment>
      </Segment.Group>
    );
  }
}

export default withRouter(props => <HeaderMenu {...props} />);
