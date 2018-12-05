import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, deleteToken } from '../lib/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    deleteToken();
    this.props.history.push('/');
  }




  render() {
    return (
      <nav className="navbar is-info">
        <div className="navbar-brand">
          Save The Pitch
        </div>
        <div className="navbar-end">
          <Link className="navbar-item" to={'/'}>Home</Link>
          <Link className="navbar-item" to={'/pitches'}>Pitches</Link>
          <Link className="navbar-item" to={'/pitches/new'}>Add a pitch</Link>
          {isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item" to='/logout'>Log Out</a>}
          {!isAuthenticated() && <Link className="navbar-item" to='/login'>Log In</Link>}
          {!isAuthenticated() && <Link className="navbar-item" to='/register'>Register</Link>}
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
