import React from 'react';
import axios from 'axios';
import { authorizationHeader, decodeToken } from '../../lib/auth';

class MatchEdit extends React.Component{
  constructor(props){
    super(props);
    this.state = props.match;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const sendObject = {
      type: this.state.type,
      pitch: this.state.pitch,
      time: this.state.time,
      endTime: this.state.endTime,
      hostedBy: decodeToken().sub
    };
    axios.put(`/api/matches/${this.props.match.params.id}`, sendObject, authorizationHeader())
      .then(result => {
        this.props.history.push(`/matches/${ result.data._id }`);
      });
  }

  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }

  getPitches(){
    axios.get('/api/pitches')
      .then(result => this.setState({ pitches: result.data}));
  }

  componentDidMount(){
    axios.get(`/api/matches/${this.props.match.params.id}`, authorizationHeader())
      .then(result => this.setState({
        type: result.data.type,
        pitch: result.data.pitch._id,
        time: result.data.time.slice(0, 16),
        endTime: result.data.endTime.slice(0, 16) }
      , this.getPitches));
  }

  render(){
    return(
      <section>
        <h2 className="subtitle is-2">Host Your Game</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="field">
            <label className="label">Match Type</label>
            <div className="control">
              <div className="select">
                <select onChange={this.handleChange} value={this.state.type || ''} name="type" required>
                  <option>Please select</option>
                  <option value="Kick-About">Kick-About</option>
                  <option value="Headers and Volleys">Headers and Volleys</option>
                </select>
              </div>
            </div>
          </div>
          {this.state.pitches && <div className="field">
            <label className="label">Pitch</label>
            <div className="control">
              <div className="select">
                <select onChange={this.handleChange} value={this.state.pitch || ''} name="pitch" required>
                  <option>Please select</option>
                  {
                    this.state.pitches.map(pitch => <option key={pitch._id} value={pitch._id}>{pitch.name}</option>)
                  }
                </select>
              </div>
            </div>
          </div> }
          <div className="field">
            <label className="label">Kick-Off</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.time || ''} name="time" className="input" type="datetime-local" required/>
            </div>
          </div>
          <div className="field">
            <label className="label">Final Whistle</label>
            <div className="control">
              <input onChange={this.handleChange} value={this.state.endTime || ''} name="endTime" className="input" type="datetime-local" required/>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Update</button>
            </div>
          </div>
        </form>
      </section>
    );
  }
}

export default MatchEdit;
