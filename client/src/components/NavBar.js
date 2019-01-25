import React from 'react';
import { Link } from 'react-router-dom';
import { SSL_OP_TLS_ROLLBACK_BUG } from 'constants';

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
        <Link to="/create" className="link item">
          <i className="link yellow large plus icon" />
        </Link>

        <Link to="/agreements" className="link item">
          <i className=" link yellow large list icon" />
        </Link>
      </div>
    </div>
  );
};

const styles = {
  navBarStyle: {
    backgroundColor: '#677a7f'
  },
  titleStyle: { color: '#fff' }
};
export default NavBar;
