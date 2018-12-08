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
          <div>
            <div className="fifaCard">
              <div className="cardTopLeft"></div>
              <div className="cardHead">
                <h1>{profile.username}</h1>
              </div>
              <div className="cardTopRight"></div>
              <div className="cardBody">
                <img className="profileEmblem" src=""/>
                {this.state.countryImage && <img className="profileEmblem" src={this.state.countryImage}/>}
                <img className="profilePicture" src={profile.profilePicture}/>
                <h2>Preferred Role: {profile.role1}</h2>
                <h2>Secondary Role: {profile.role2}</h2>
                <p>Bio: {profile.bio}</p>
              </div>
              <div className="cardBase"></div>
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