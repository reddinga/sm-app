import React, { Component } from 'react';
import { Menu, Button } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class HeaderMenu extends Component {
  state = { activeItem: this.props.location.pathname };

  handleItemClick = (e, { to }) => this.setState({ activeItem: to });

  render() {
    const { activeItem } = this.state;
    console.log('header state', this.state);
    return (
      <Menu style={{ margin: '0em 0em' }} pointing secondary size="large">
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === '/'}
          onClick={this.handleItemClick}
        >
          Home
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/shop"
          name="shop"
          active={activeItem === '/shop'}
          onClick={this.handleItemClick}
        >
          Shop
        </Menu.Item>
        <Menu.Item
          as="a"
          name="about"
          active={activeItem === '/about'}
          onClick={this.handleItemClick}
        >
          About us
        </Menu.Item>
        <Menu.Item position="right">
          <Button as="a">Log in</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(props => <HeaderMenu {...props} />);
