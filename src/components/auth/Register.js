import React from 'react';
import axios from 'axios';
import { saveToken } from '../../lib/auth';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clubs: ['AFC Bournemouth', 'Arsenal', 'Brighton & Hove Albion',
        'Burnley', 'Cardiff City', 'Chelsea',
        'Crystal Palace', 'Everton', 'Fulham',
        'Huddersfield Town', 'Leicester City', 'Liverpool',
        'Manchester City', 'Manchester United', 'Newcastle United',
        'Southampton', 'Tottenham Hotspur', 'Watford',
        'West Ham United', 'Wolverhampton', 'NONE OF THE ABOVE']
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const sendObject = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
      bio: this.state.bio,
      profilePicture: this.state.profilePicture,
      role1: this.state.role1,
      role2: this.state.role2,
      club: this.state.club,
      country: this.state.country
    };
    axios.post('/api/register', sendObject)
      .then(result => {
        saveToken(result.data.token);
        this.props.history.push('/pitches');
      });
  }

  handleChange({ target: { name, value }}) {
    this.setState({ [name]: value });
  }

  componentDidMount(){
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(result => {
        const countries = result.data;
        const england = { name: 'England'};
        countries.unshift(england);
        this.setState({ countries: countries });
      });
  }

  render() {
    const roles1 = ['Striker', 'Top Man', 'Winger', 'Midfielder', 'Utility Player', 'Last Man', 'Defender', 'Goalkeeper', '💦Water Boy💦'];
    const roles2 = ['Striker', 'Top Man', 'Winger', 'Midfielder', 'Utility Player', 'Last Man', 'Defender', 'Goalkeeper', '💦Water Boy💦'];

    const index1 = roles1.indexOf(this.state.role1);

    if(index1 !== -1){
      roles2.splice(index1, 1);
    }

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
                {
                  roles1.map(role => <option key={role} value={role}>{role}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Secondary Role</label>
          <div className="control">
            <div className="select">
              <select name="role2" onChange={this.handleChange} value={this.state.role2 || ''} required>
                <option>None</option>
                {
                  roles2.map(role => <option key={role} value={role}>{role}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Premier League Club</label>
          <div className="control">
            <div className="select">
              <select name="club" onChange={this.handleChange} value={this.state.club || ''} required>
                <option>Please Select</option>
                {
                  this.state.clubs.map(club => <option key={club} value={club}>{club}</option>)
                }
              </select>
            </div>
          </div>
        </div>
        {this.state.countries && <div className="field">
          <label className="label">National Team</label>
          <div className="control">
            <div className="select">
              <select name="country" onChange={this.handleChange} value={this.state.country || ''} required>
                <option>Please Select</option>
                {
                  this.state.countries.map(country => <option key={country.name} value={country.name}>{country.name}</option>)
                }
              </select>
            </div>
          </div>
        </div> }
        <button className="button is-rounded">Register</button>
      </form>
    );
  }
}

export default Register;
