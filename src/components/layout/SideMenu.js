import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
class SideMenu extends Component {
  handleItemClick = name => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state || {};

    return (
      <Menu secondary vertical style={{ width: '7rem' }}>
        <Menu.Item>
          <Menu.Header>Products</Menu.Header>
          <Menu.Menu>
            <Menu.Item
              name="arrangements"
              active={activeItem === 'arrangements'}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name="wreaths"
              active={activeItem === 'wreaths'}
              onClick={this.handleItemClick}
            />

            <Menu.Item
              name="bouquets"
              active={activeItem === 'bouquets'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

export default SideMenu;
