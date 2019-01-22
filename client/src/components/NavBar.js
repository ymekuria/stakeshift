import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

class NavBar extends Component {
  state = { activeItem: 'New Agreement' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item
          name="New Agreement"
          active={activeItem === 'New Agreement'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="Agreements"
          active={activeItem === 'Agreements'}
          onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}

export default NavBar;
