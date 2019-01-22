import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <Icon name="spinner" size="big" />
      </div>
      <Link to="/" className="item">
        Stake Shift
      </Link>

      <div className="right menu">
        <Link to="/create" className="item">
          Create Agreement
        </Link>
        <Link to="/agreements" className="item">
          Agreements
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
