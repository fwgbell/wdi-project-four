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
        <div className="field">
          <label className="label">Username</label>
          <div className="contol">
            <input className="input" name="username" onChange={this.handleChange} value={this.state.username || ''} required/>
          </div>
        </div>
        <div className="field">
          <label className="label">Bio</label>
          <div className="contol">
            <input className="input" name="bio" onChange={this.handleChange} value={this.state.bio || ''} />
          </div>
        </div>
        <div className="field">
          <label className="label">Profile Picture URL</label>
          <div className="contol">
            <input className="input" name="profilePicture" onChange={this.handleChange} value={this.state.profilePicture || ''} required/>
          </div>
        </div>
        <div className="field">
          <label className="label">Preferred Role</label>
          <div className="control">
            <div className="select">
              <select name="role1" onChange={this.handleChange} value={this.state.role1 || ''} required>
                <option>Please select</option>
                <option value="Striker">Striker</option>
                <option value="Top Man">Top Man</option>
                <option value="Winger">Winger</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Utility Player">Utility Player</option>
                <option value="Last Man">Last Man</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="💦Water Boy💦">💦Water Boy💦</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label"> Second Preferred Role</label>
          <div className="control">
            <div className="select">
              <select name="role2" onChange={this.handleChange} value={this.state.role2 || ''} required>
                <option>None</option>
                <option value="Striker">Striker</option>
                <option value="Top Man">Top Man</option>
                <option value="Winger">Winger</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Utility Player">Utility Player</option>
                <option value="Last Man">Last Man</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="💦Water Boy💦">💦Water Boy💦</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Third Preferred Role</label>
          <div className="control">
            <div className="select">
              <select name="role3" onChange={this.handleChange} value={this.state.role3 || ''} required>
                <option>None</option>
                <option value="Striker">Striker</option>
                <option value="Top Man">Top Man</option>
                <option value="Winger">Winger</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Utility Player">Utility Player</option>
                <option value="Last Man">Last Man</option>
                <option value="Defender">Defender</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="💦Water Boy💦">💦Water Boy💦</option>
              </select>
            </div>
          </div>
        </div>
        <button className="button is-rounded">Register</button>
      </form>
    );
  }
}

export default Register;
