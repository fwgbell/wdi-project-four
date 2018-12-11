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
              <h1>{match.type}</h1>
              <h1>Host: <Link to={`/profile/${match.hostedBy._id}`}>{match.hostedBy.username}</Link></h1>
              <h2>Pitch: <Link to={`/pitches/${match.pitch._id}`}>{match.pitch.name}</Link></h2>
              <p>Match Day: {moment(match.time).format('dddd Do MMMM')}</p>
              <p>Kick-Off: {moment(match.time).format('h:m a')}</p>
              <p>Final Whistle: {moment(match.endTime).format('h:m a')}</p>
              {match.hostedBy._id === decodeToken().sub ?
                <div>
                  <button onClick={this.cancelMatch}>Call Off Match</button>
                  <Link to={`/matches/${this.props.match.params.id}/edit`}><button>Edit Match</button></Link>
                </div>
                :
                <div>
                  {!match.attending.find(player => player._id === decodeToken().sub) ?
                    <button onClick={this.attendMatch}>Attend</button>
                    :
                    <button onClick={this.leaveMatch}>Leave</button>
                  }
                </div>}
              <div>
                <h2 className="title is-2">Match Lineup:</h2>
                <div className="matchPlayer"><Link to={`/profile/${match.hostedBy._id}`}>
                  <img src={match.hostedBy.profilePicture}/>
                  <h3>{match.hostedBy.username}</h3>
                </Link></div>
                {match.attending.map(player =>
                  <div className="matchPlayer" key={player._id}><Link to={`/profile/${player._id}`}>
                    <img src={player.profilePicture} />
                    <h3>{player.username}</h3>
                  </Link></div>
                )}
              </div>
            </div>
            :
            <div>
              <h1>Match Type: {match.type}</h1>
              <h1>Host: <Link to={`/profile/${match.hostedBy._id}`}>{match.hostedBy.username}</Link></h1>
              <h2>Pitch: <Link to={`/pitches/${match.pitch._id}`}>{match.pitch.name}</Link></h2>
              <p>Match Day: {moment(match.time).format('dddd Do MMMM')}</p>
              <p>Kicked-Off: {moment(match.time).format('h:m a')}</p>
              <p>Final Whistle: {moment(match.endTime).format('h:m a')}</p>
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
              {canRate &&
              <form onSubmit={this.handleSubmit}>
                {match.hostedBy._id !== decodeToken().sub &&
                    <div>
                      <h2>{ match.hostedBy.username}</h2>
                      <div className="field">
                        <label className="label">Host Rating</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state.hostHostRating || ''} name="hostHostRating" className="input" type="number" min="1" max="5" required/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Chill Rating</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state.hostChillRating || ''} name="hostChillRating" className="input" type="number" min="1" max="5" required/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Skill Rating</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state.hostSkillRating || ''} name="hostSkillRating" className="input" type="number" min="1" max="5" required/>
                        </div>
                      </div>
                    </div>
                }
                {
                  match.attending.map((player) =>
                    <div key={player._id}>
                      <h2>{ player.username}</h2>
                      <div className="field">
                        <label className="label">Chill Rating</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state[(player.username + 'ChillRating')] || ''} name={`${player.username}ChillRating`} className="input" type="number" min="1" max="5" required/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Skill Rating</label>
                        <div className="control">
                          <input onChange={this.handleChange} value={this.state[(player.username + 'SkillRating')] || ''} name={`${player.username}SkillRating`} className="input" type="number" min="1" max="5" required/>
                        </div>
                      </div>
                    </div>
                  )
                }
                <button className="button is-rounded">Submit</button>
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
