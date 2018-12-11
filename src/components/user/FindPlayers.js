import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { authorizationHeader, decodeToken } from '../../lib/auth';

class FindPlayers extends React.Component {
  constructor(props){
    super(props);
    this.state={
      index: 0
    };
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  sortUsers(){
    const users = this.state.users;
    const index = users.findIndex(function(user){
      return user._id === decodeToken().sub;
    });
    const currentUser = users.splice(index, 1)[0];
    const filtered = users.filter(function(user){
      return !currentUser.likes.includes(user._id) || !currentUser.dislikes.includes(user._id);
    });
    this.setState({ users: filtered, profile: filtered[this.state.index] });
  }

  like(){
    console.log('liked!', this.state.profile);
  }

  dislike(){
    console.log('dislike :(', this.state.profile);
  }

  componentDidMount(){
    axios.get('/api/users', authorizationHeader())
      .then(result => this.setState({ users: result.data}, this.sortUsers));
  }

  render(){
    const profile = this.state.profile;
    return (
      profile?
        <div className="findPage">
          <div className="fifaCard">
            <div className="cardHead">
              <h1>{profile.username}</h1>
            </div>
            <div className="cardBody">
              <div className="profileEmblems">
                <img className="profileLogo" src={profile.clubLogo}/>
                <div className="profileButtons">
                  <button onClick={this.dislike} className="button">🤢</button>
                  <button onClick={this.like} className="button">❤️</button>
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
