import React from 'react';
import { Link, withRouter } from 'react-router-dom';
// import { isAuthenticated, deleteToken, decodeToken } from '../lib/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.handleLogout = this.handleLogout.bind(this);
  }

  // handleLogout() {
  //   deleteToken();
  //   this.props.history.push('/');
  // }


  // {isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item" to='/logout'>Log Out</a>}
  // {!isAuthenticated() && <Link className="navbar-item" to='/register'>Resgister</Link>}
  // {!isAuthenticated() && <Link className="navbar-item" to='/login'>Log In</Link>}


  render() {
    return (
      <nav className="navbar is-info">
        <div className="navbar-brand">
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to={'/'}>Home</Link>
          <Link className="navbar-item" to={'/pitches'}>Pitches</Link>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
