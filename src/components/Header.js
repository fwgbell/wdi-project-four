import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, deleteToken, decodeToken } from '../lib/auth';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.state = decodeToken();
  }

  handleLogout() {
    deleteToken();
    this.props.history.push('/');
  }




  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <img src="https://savethepitch.files.wordpress.com/2017/02/cropped-white-save-logo-copy.jpg"/>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <div className="navbar-link is-arrowless">
              <i className="fas fa-angle-up"></i>
              <div className="navbar-dropdown is-boxed">
                <Link className="navbar-item" to={'/'}>Home</Link>
                <Link className="navbar-item" to={'/pitches'}>Pitches</Link>
                {isAuthenticated() && <Link className="navbar-item" to={'/pitches/new'}>Add a pitch</Link>}
                {isAuthenticated() && <a onClick={this.handleLogout} className="navbar-item" to='/logout'>Log Out {this.state.username} </a>}
                {!isAuthenticated() && <Link className="navbar-item" to='/login'>Log In</Link>}
                {!isAuthenticated() && <Link className="navbar-item" to='/register'>Register</Link>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Header);
