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

  componentDidMount() {
    axios.get(`/api/matches/${this.props.match.params.id}`, authorizationHeader())
      .then(result => this.setState({ match: result.data }));
  }

  render(){
    const match = this.state.match;
    return (
      <div>
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
              {match.attending.length > 0 &&
                <div>
                  <h2>Match Lineup:</h2>
                  <p><Link to={`/profile/${match.hostedBy._id}`}>{match.hostedBy.username}</Link></p>
                  {match.attending.map(player =>
                    <div key={player._id}><Link to={`/profile/${player._id}`}>{player.username}</Link></div>
                  )}
                </div>
              }
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
                <div>
                  <h2>Match Lineup:</h2>
                  <p><Link to={`/profile/${match.hostedBy._id}`}>{match.hostedBy.username}</Link></p>
                  {match.attending.map(player =>
                    <div key={player._id}><Link to={`/profile/${player._id}`}>{player.username}</Link></div>
                  )}
                </div>
              }
            </div>
          :
          <div>Loading...</div>
        }
      </div>
    );
  }
}

export default MatchShow;
