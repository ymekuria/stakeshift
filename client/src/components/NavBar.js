import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">
        <i className=" large spinner icon" />
      </div>
      <Link to="/" className="item">
        <b>Stake Shift</b>
      </Link>

      <div className="right menu">
        <Link to="/create" className="item">
          <button className="ui blue button">Creat Agreement</button>
        </Link>
        <Link to="/agreements" className="item">
          <button className="ui blue button">Creat Agreement</button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
