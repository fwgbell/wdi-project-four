import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';

class FindPlayers extends React.Component {
  constructor(props){
    super(props);
    this.state={};
  }

  componentDidMount(){
    axios.get('/api/users', authorizationHeader())
      .then(result => this.setState({ users: result.data}));
  }

  render(){
    let profile;
    if(this.state.users){
      profile = this.state.users[0];
    }
    return (
      this.state.users?
        <div className="findPage">
          <div className="fifaCard">
            <div className="cardHead">
              <h1>{profile.username}</h1>
            </div>
            <div className="cardBody">
              <div className="profileEmblems">
                <img className="profileLogo" src={profile.clubLogo}/>
                <div className="profileButtons">
                  <button className="button">🤢</button>
                  <button className="button">❤️</button>
                </div>
              </div>
              <img className="profilePicture" src={profile.profilePicture}/>
              <h2>Preferred Role: {profile.role1}</h2>
              <h3>Secondary Role: {profile.role2}</h3>
              <p><strong>Bio:</strong> {profile.bio}</p>
            </div>
          </div>
        </div>
        :
        <p>Loading...</p>
    );
  }
}


export default FindPlayers;
