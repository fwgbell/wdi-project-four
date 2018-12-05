import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('/api/register', this.state)
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
        <label>First Name</label>
        <input name="firstName" onChange={this.handleChange} value={this.state.firstName || ''}/>
        <label>Last Name</label>
        <input name="lastName" onChange={this.handleChange} value={this.state.lastName || ''}/>
        <label>Profile Picture</label>
        <input name="profilePicture" onChange={this.handleChange} value={this.state.profilePicture || ''}/>
        <label>Bio</label>
        <input name="bio" onChange={this.handleChange} value={this.state.bio || ''}/>
        <label>Role 1</label>
        <input name="role1" onChange={this.handleChange} value={this.state.role1 || ''}/>
        <label>Email</label>
        <input name="email" onChange={this.handleChange} value={this.state.email || ''}/>
        <label>Password</label>
        <input name="password" onChange={this.handleChange} value={this.state.password || ''}/>
        <button>Register</button>
      </form>
    );
  }
}

export default Register;
