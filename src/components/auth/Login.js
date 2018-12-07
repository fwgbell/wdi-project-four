import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/login', this.state)
      .then(result => {
        saveToken(result.data.token);
        this.props.history.push('/pitches');
      });
  }

  handleChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Email</label>
          <div className="contol">
            <input className="input" type="email" name="email" onChange={this.handleChange} value={this.state.email || ''} required/>
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="contol">
            <input className="input" type="password" name="password" onChange={this.handleChange} value={this.state.password || ''} required/>
          </div>
        </div>
        <button className="button is-rounded">Log in</button>
      </form>
    );
  }
}

export default Login;
