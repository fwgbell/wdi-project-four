import React from 'react';
import axios from 'axios';
import { authorizationHeader, decodeToken } from '../../lib/auth';
import { Link } from 'react-router-dom';
import moment from 'moment';


class MatchShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.attendMatch = this.attendMatch.bind(this);
    this.leaveMatch = this.leaveMatch.bind(this);
    this.cancelMatch = this.cancelMatch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  attendMatch(){
    const sendObject = this.state.match;
    sendObject.attending.push(decodeToken().sub);
    axios.put(`/api/matches/${this.props.match.params.id}`, sendObject, authorizationHeader())
      .then(result => this.setState({ match: result.data}));
  }

  leaveMatch(){
    const sendObject = this.state.match;
    const index = sendObject.attending.findIndex(player => player._id === decodeToken().sub);
    sendObject.attending.splice(index, 1);
    axios.put(`/api/matches/${this.props.match.params.id}`, sendObject, authorizationHeader())
      .then(result => this.setState({ match: result.data}));
  }

  cancelMatch(){
    axios.delete(`/api/matches/${this.props.match.params.id}`, authorizationHeader())
      .then( () => this.props.history.push('/pitches'));
  }

  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }

  handleSubmit(event){
    event.preventDefault();
    const data = this.state;
    const sendObject = {
      ratings: [],
      match: data.match._id
    };
    data.match.attending.forEach(function(player){
      data[(player.username + 'iD')] = player._id;
    });
    if(data.hostHostRating){
      const hostObject = {
        _id: data.match.hostedBy._id,
        hostRating: data.hostHostRating,
        chillRating: data.hostChillRating,
        skillRating: data.hostSkillRating
      };
      sendObject.ratings.push(hostObject);
      delete data.hostHostRating;
      delete data.hostChillRating;
      delete data.hostSkillRating;
    }
    delete data.match;
    for(let i = 0; i < Object.keys(data).length; i = i + 3){
      const playerObject = {
        chillRating: data[Object.keys(data)[i]],
        skillRating: data[Object.keys(data)[i + 1]],
        _id: data[Object.keys(data)[i + 2]]
      };
      sendObject.ratings.push(playerObject);
    }
    axios.post('/api/match/rating', sendObject, authorizationHeader())
      .then(result => this.setState({ match: result.data }));
  }

  componentDidMount() {
    axios.get(`/api/matches/${this.props.match.params.id}`, authorizationHeader())
      .then(result => this.setState({ match: result.data }));
  }

  render(){
    const match = this.state.match;
    let canRate = false;
    function findIdMatch(player){
      return player._id === decodeToken().sub;
    }

    if(match){
      if(match.hostedBy._id === decodeToken().sub && !match.hasRated.includes(match.hostedBy._id)){
        canRate = true;
      }
      if(match.attending.findIndex(findIdMatch) !== -1 && !match.hasRated.includes(decodeToken().sub)){
        canRate = true;
      }
    }

    return (
      <div className="matchShow">
        {match ?
          Date.parse(match.endTime) > new Date() ?
            <div>
              <div className="matchInfoWrapper">
                <h1>{match.type}</h1>
                <h2>Host: <Link to={`/profile/${match.hostedBy._id}`}>{match.hostedBy.username}</Link></h2>
                <h2>Pitch: <Link to={`/pitches/${match.pitch._id}`}>{match.pitch.name}</Link></h2>
                <h2>Match Day: {moment(match.time).format('dddd Do MMMM')}</h2>
                <h2>Kick-Off: {moment(match.time).format('h:m a')}</h2>
                <h2>Final Whistle: {moment(match.endTime).format('h:m a')}</h2>
              </div>
              {match.hostedBy._id === decodeToken().sub ?
                <div>
                  <button className="button is-rounded" onClick={this.cancelMatch}>Call Off Match</button>
                  <Link to={`/matches/${this.props.match.params.id}/edit`}><button>Edit Match</button></Link>
                </div>
                :
                <div>
                  {!match.attending.find(player => player._id === decodeToken().sub) ?
                    <button className="button is-rounded" onClick={this.attendMatch}>Attend</button>
                    :
                    <button className="button is-rounded" onClick={this.leaveMatch}>Leave</button>
                  }
                </div>}
              <div className="columns is-multiline">
                <h2 className="column is-12 title is-2">Match Lineup:</h2>
                <div className="column is-4 matchPlayer"><Link to={`/profile/${match.hostedBy._id}`}>
                  <img src={match.hostedBy.profilePicture}/>
                  <h3>{match.hostedBy.username}</h3>
                </Link></div>
                {match.attending.map(player =>
                  <div className="column is-4 matchPlayer" key={player._id}><Link to={`/profile/${player._id}`}>
                    <img src={player.profilePicture} />
                    <h3>{player.username}</h3>
                  </Link></div>
                )}
              </div>
            </div>
            :
            <div>
              <div className="matchInfoWrapper">
                <h1>{match.type}</h1>
                <h2>Host: <Link to={`/profile/${match.hostedBy._id}`}>{match.hostedBy.username}</Link></h2>
                <h2>Pitch: <Link to={`/pitches/${match.pitch._id}`}>{match.pitch.name}</Link></h2>
                <h2>Match Day: {moment(match.time).format('dddd Do MMMM')}</h2>
                <h2>Kicked-Off: {moment(match.time).format('h:m a')}</h2>
                <h2>Final Whistle: {moment(match.endTime).format('h:m a')}</h2>
              </div>
              {match.attending.length > 0 &&
                <div className="columns is-multiline">
                  <h2 className="column is-12 title is-2">Match Lineup:</h2>
                  <div className="column is-4 matchPlayer"><Link to={`/profile/${match.hostedBy._id}`}>
                    <img src={match.hostedBy.profilePicture}/>
                    <h3>{match.hostedBy.username}</h3></Link>
                  </div>
                  {match.attending.map(player =>
                    <div className="column is-4 matchPlayer" key={player._id}><Link to={`/profile/${player._id}`}>
                      <img src={player.profilePicture} />
                      <h3>{player.username}</h3></Link>
                    </div>
                  )}
                </div>
              }
              {canRate && match.attending.length > 0 &&
              <form  className="columns is-multiline" onSubmit={this.handleSubmit}>
                {match.hostedBy._id !== decodeToken().sub &&
                    <div className="column is-3">
                      <h2>{ match.hostedBy.username} (HOST)</h2>
                      <div className="field">
                        <label className="label">Host Rating {this.state.hostHostRating && '('+this.state.hostHostRating+')'}</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state.hostHostRating || ''} name="hostHostRating" className="slider" type="range" min="1" max="5" required/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Chill Rating {this.state.hostChillRating && '('+this.state.hostChillRating+')'}</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state.hostChillRating || ''} name="hostChillRating" className="slider" type="range" min="1" max="5" required/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Skill Rating {this.state.hostSkillRating && '('+this.state.hostSkillRating+')'}</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state.hostSkillRating || ''} name="hostSkillRating" className="slider" type="range" min="1" max="5" required/>
                        </div>
                      </div>
                    </div>
                }
                {
                  match.attending.map((player) =>
                    player._id === decodeToken().sub ?
                      <p key={player._id}></p>
                      :
                      <div className="column is-3" key={player._id}>
                        <h2>{ player.username}</h2>
                        <div className="field">
                          <label className="label">Chill Rating {this.state[(player.username + 'ChillRating')] && '('+this.state[(player.username + 'ChillRating')]+')'}</label>
                          <div className="control">
                            <input onChange={this.handleChange} value={this.state[(player.username + 'ChillRating')] || ''} name={`${player.username}ChillRating`} className="slider" type="range" min="1" max="5" required/>
                          </div>
                        </div>
                        <div className="field">
                          <label className="label">Skill Rating {this.state[(player.username + 'SkillRating')] && '('+this.state[(player.username + 'SkillRating')]+')'}</label>
                          <div className="control">
                            <input onChange={this.handleChange} value={this.state[(player.username + 'SkillRating')] || ''} name={`${player.username}SkillRating`} className="slider" type="range" min="1" max="5" required/>
                          </div>
                        </div>
                      </div>
                  )
                }
                <button className="ratingFormSubmit button is-rounded">Submit</button>
              </form>}
            </div>
          :
          <div>Loading...</div>
        }
      </div>
    );
  }
}

export default MatchShow;
