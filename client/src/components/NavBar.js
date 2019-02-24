import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { navBarStyle, titleStyle } = styles;
  return (
    <div className="ui secondary pointing menu" style={navBarStyle}>
      <div className="item">
        <i className="link yellow large spinner icon" />
      </div>
      <Link to="/" className="link item" style={titleStyle}>
        <b>Stake Shift</b>
      </Link>

      <div className="right menu">
        <Link to="/create" className="item">
          <i className="link yellow large plus icon" />
        </Link>

        <Link to="/agreements" className="item">
          <i className=" link yellow large list icon" />
        </Link>
        <div className="item">
          <i className=" link yellow large cog icon" />
        </div>
      </div>
    </div>
  );
};

const styles = {
  navBarStyle: {
    backgroundColor: '#677a7f',
    padding: '10px'
  },
  titleStyle: { color: '#fff', fontSize: '1.3em' }
};
export default NavBar;
