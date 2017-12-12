import React, { Component } from 'react';
import { Input, Menu, Container, Button } from 'semantic-ui-react';

export default class HeaderMenu extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu pointing secondary size="large">
        <Menu.Item as="a" active>
          Home
        </Menu.Item>
        <Menu.Item as="a">Shop</Menu.Item>
        <Menu.Item as="a">About us</Menu.Item>
        <Menu.Item position="right">
          <Button as="a">Log in</Button>
          <Button as="a" style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu>
    );
  }
}
