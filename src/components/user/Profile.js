import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  getCountry(){
    if(this.state.profile.country === 'England'){
      this.setState({ countryImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1280px-Flag_of_England.svg.png'});
    }else{
      axios.get(`https://restcountries.eu/rest/v2/name/${this.state.profile.country}`)
        .then(result => {
          const countryImage = result.data[0].flag;
          this.setState({ countryImage: countryImage });
        });
    }
  }

  componentDidMount() {
    axios.get(`/api/profile/${this.props.match.params.id}`, authorizationHeader())
      .then(result => this.setState({ profile: result.data }, this.getCountry));
  }

  render(){
    const profile = this.state.profile;
    let allMatches;
    const history = [];
    const upcoming = [];
    if(profile){
      allMatches = profile.matches.concat(profile.hosting);
      allMatches.sort(function(a, b){
        return Date.parse(a.time) - Date.parse(b.time);
      });
      allMatches.forEach(function(match){
        if(Date.parse(match.endTime) < new Date()){
          history.push(match);
        } else{
          upcoming.push(match);
        }
      });
    }
    return (
      <div className="profilePage">
        {profile
          ?
          <div className="columns">
            <div className="column">
              <div className="fifaCard">
                <div className="cardHead">
                  <h1>{profile.username}</h1>
                </div>
                <div className="cardBody">
                  <div className="profileEmblems">
                    <img className="profileLogo" src={profile.clubLogo}/>
                    {this.state.countryImage && <img className="profileFlag" src={this.state.countryImage}/>}
                  </div>
                  <img className="profilePicture" src={profile.profilePicture}/>
                  <h2>Preferred Role: {profile.role1}</h2>
                  <h3>Secondary Role: {profile.role2}</h3>
                  <p><strong>Bio:</strong> {profile.bio}</p>
                </div>
              </div>
            </div>
            <div className="column profileFixtures">
              <h3 className="title is-4">Upcoming Matches</h3>
              {upcoming && upcoming.map(match =>
                <div key={match._id}>
                  <h4>{match.type.toUpperCase()}</h4>
                </div>
              )}
              <h3 className="title is-4">Match History</h3>
              {history && history.map(match =>
                <div key={match._id}>
                  <h4>{match.type.toUpperCase()}</h4>
                </div>
              )}
            </div>
          </div>
          :
          <p>Loading...</p>
        }
      </div>
    );
  }
}

export default Profile;
