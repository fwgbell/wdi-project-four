import React from 'react';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';

class Profile extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  componentDidMount() {
    axios.get(`/api/profile/${this.props.match.params.id}`, authorizationHeader())
      .then(result => this.setState({ profile: result.data }));
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
              <div className="cardHead"></div>
              <div className="cardTopRight"></div>
              <div className="cardBody">
                <img src={profile.profilePicture}/>
                <h1>{profile.username}</h1>
                <h2>Preferred Role: {profile.role1}</h2>
                <h2>Secondary Role: {profile.role2}</h2>
                <h2>Club: {profile.club}</h2>
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
