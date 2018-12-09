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
            <div className="column history">
              Match history here
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
