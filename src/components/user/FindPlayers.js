import React from 'react';
import { Link } from 'react-router-dom';
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
    this.carryOnSwiping = this.carryOnSwiping.bind(this);
  }

  sortUsers(){
    const users = this.state.users;
    const index = users.findIndex(function(user){
      return user._id === decodeToken().sub;
    });
    const currentUser = users.splice(index, 1)[0];
    const disliked = this.state.disliked;
    const liked = this.state.liked;
    const filtered = users.filter(function(user){
      return user._id !== disliked
      && user._id !== liked
      && !currentUser.likes.includes(user._id)
      && !currentUser.dislikes.includes(user._id);
    });
    this.setState({ users: filtered, profile: filtered[this.state.index] });
  }

  like(){
    console.log('liked!', this.state.profile);
    if(this.state.profile.likes.includes(decodeToken().sub)){
      const sendObject = {
        _id: this.state.profile._id
      };
      axios.post('/api/likedEachother', sendObject, authorizationHeader())
        .then(result => this.setState({ match: this.state.profile, liked: sendObject._id, users: result.data }, this.sortUsers));
    } else{
      const sendObject = {
        _id: this.state.profile._id
      };
      axios.post('/api/like', sendObject, authorizationHeader())
        .then(result => this.setState({ liked: sendObject._id, users: result.data }, this.sortUsers));
    }
  }

  dislike(){
    console.log('dislike :(', this.state.profile);
    const sendObject = {
      _id: this.state.profile._id
    };
    axios.post('/api/dislike', sendObject, authorizationHeader())
      .then(result => this.setState({ disliked: sendObject._id, users: result.data }, this.sortUsers));
  }

  carryOnSwiping(){
    this.setState({ match: null });
  }

  componentDidMount(){
    axios.get('/api/users', authorizationHeader())
      .then(result => this.setState({ users: result.data}, this.sortUsers));
  }

  render(){
    const profile = this.state.profile;
    const match = this.state.match;
    return (
      profile?
        <div className="findPage">
          {match && <div className="matchWrapper">
            <h1>You matched {match.username}</h1>
            <h2><Link to={'/messages'}>Send your new match a message <i className="far fa-comments"></i></Link></h2>
            <h2>Or ...</h2>
            <h2 onClick={this.carryOnSwiping}>Carry on swiping <i className="fas fa-times-circle"></i></h2>
            <img src={match.profilePicture} />
          </div>}
          <div className="fifaCard">
            <div className="cardHead">
              <h1>{profile.username}</h1>
            </div>
            <div className="cardBody">
              <div className="profileEmblems">
                <img className="profileLogo" src={profile.clubLogo}/>
                <div className="profileButtons">
                  <button onClick={this.dislike} className="button"><i className="fas fa-times"></i></button>
                  <button onClick={this.like} className="button"><i className="fas fa-heart"></i></button>
                </div>
              </div>
              <img className="profilePicture" src={profile.profilePicture}/>
              <div className="profileRatings">{ profile.averageChill && <p><i className="fas fa-snowflake"></i> {profile.averageChill} <i className="fas fa-running"></i> {profile.averageSkill} <i className="fas fa-futbol"></i> {profile.averageHost}</p>}</div>
              <h2>Preferred Role: {profile.role1}</h2>
              <h3>Back-up Role: {profile.role2}</h3>
              <p><strong>Bio:</strong> {profile.bio}</p>
            </div>
          </div>
        </div>
        :

        match?
          <div className="findPage">
            <div className="matchWrapper">
              <h1>You matched {match.username}</h1>
              <h2><Link to={'/messages'}>Send your new match a message <i className="far fa-comments"></i></Link></h2>
              <h2>Or ...</h2>
              <h2 onClick={this.carryOnSwiping}>Carry on swiping<i className="fas fa-times-circle"></i></h2>
              <img src={match.profilePicture} />
            </div>
          </div>
          :
          <h1 className="noMore">No more players in your area, check back soon. <br/> <i className="fas fa-sad-cry"></i></h1>

    );
  }
}


export default FindPlayers;
