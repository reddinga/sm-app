import React, { Component } from 'react';
import {
  Icon,
  Menu,
  Grid,
  Image,
  Header,
  Responsive,
  Dropdown,
  Segment,
  Message,
} from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import logo from '../../assets/images/logo/logo_leaf.png';
import header1 from '../../assets/images/logo/header1.png';
import header2 from '../../assets/images/logo/header2.png';
import SideMenu from './SideMenu';

class HeaderMenu extends Component {
  state = { activeItem: this.props.location.pathname };
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.state.activeItem) {
      this.setState({ activeItem: nextProps.location.pathname });
    }
  }
  handleItemClick = (e, { to }) => this.setState({ activeItem: to });

  render() {
    const { activeItem } = this.state;
    return (
      <Segment.Group className="no-borders" style={{ margin: '0px' }}>
        <Message style={{ padding: '0.25em' }} attached="top">
          Free Shipping on All Orders
          {/*<Image src={flower} size="mini" />*/}
        </Message>
        <Segment className="no-borders" attached>
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
        <Segment
          className="no-borders"
          attached
          style={{ margin: '0px', padding: '0px' }}
        >
          <Menu
            style={{
              margin: '0em 0em',
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
              <Header as="h4">home</Header>
            </Menu.Item>
            {/*             <Dropdown item text="shop">
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/shop/arrangements"
                  text="arrangements"
                  active={activeItem === '/shop/arrangements'}
                  onClick={this.handleItemClick}
                />

                <Dropdown.Item
                  as={Link}
                  to="/shop/wreaths"
                  text="wreaths"
                  active={activeItem === '/shop/wreaths'}
                  onClick={this.handleItemClick}
                />

                <Dropdown.Item
                  as={Link}
                  to="/shop/bouquets"
                  text="bouquets"
                  active={activeItem === '/shop/bouquets'}
                  onClick={this.handleItemClick}
                />
              </Dropdown.Menu>
            </Dropdown> */}

            <Menu.Item
              as={Link}
              to="/custom"
              name="custom"
              active={activeItem === '/custom'}
              onClick={this.handleItemClick}
            >
              <Header as="h4">custom</Header>
            </Menu.Item>
            <Menu.Item
              as={Link}
              to="/about"
              name="about"
              active={activeItem === '/about'}
              onClick={this.handleItemClick}
            >
              <Header as="h4">about us</Header>
            </Menu.Item>

            <Menu.Item
              as={Link}
              to="/cart"
              name="cart"
              active={activeItem === '/cart'}
              onClick={this.handleItemClick}
            >
              <Header as="h6">
                <Icon name="shopping bag" />
              </Header>
            </Menu.Item>
          </Menu>
        </Segment>
      </Segment.Group>
    );
  }
}

export default withRouter(props => <HeaderMenu {...props} />);
