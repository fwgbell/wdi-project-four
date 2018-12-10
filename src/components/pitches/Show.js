import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { authorizationHeader, decodeToken } from '../../lib/auth';
import MapBox from '../common/MapBox';


class PitchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 3,
      editing: false
    };
    this.deletePitch = this.deletePitch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editMode = this.editMode.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/pitches/${this.props.match.params.id}`)
      .then(result => this.setState({ pitch: result.data }));
  }

  deletePitch(){
    axios.delete(`/api/pitches/${this.state.pitch._id}`, authorizationHeader())
      .then( () => this.props.history.push('/pitches'));
  }

  handleSubmit(event){
    event.preventDefault();
    const sendObject = {
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating,
      reviewedBy: decodeToken().sub
    };
    axios.post(`/api/pitches/${this.state.pitch._id}/reviews`, sendObject, authorizationHeader())
      .then(result => this.setState({ pitch: result.data, title: null, content: null, rating: 3 }));
  }

  handleChange({ target: { name, value }}){
    this.setState({ [name]: value });
  }

  editMode(){
    const usersReveiw = this.state.pitch.reviews.find(review => review.reviewedBy._id === decodeToken().sub);
    this.setState({ editing: true, reviewId: usersReveiw._id, title: usersReveiw.title, content: usersReveiw.content, rating: usersReveiw.rating });
  }

  cancelEdit(){
    this.setState({ editing: false, title: null, content: null, rating: 3});
  }

  handleUpdate(event){
    event.preventDefault();
    const sendObject = {
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating,
      reviewedBy: decodeToken().sub
    };
    axios.put(`/api/pitches/${this.state.pitch._id}/reviews/${this.state.reviewId}`, sendObject, authorizationHeader())
      .then(result => this.setState({ pitch: result.data, editing: false, title: null, content: null, rating: 3 }));
  }

  deleteReview = review =>{
    axios.delete(`/api/pitches/${this.state.pitch._id}/reviews/${review._id}`, authorizationHeader())
      .then(result => this.setState({ pitch: result.data }));
  }

  render() {
    const pitch = this.state.pitch;
    let upcoming;
    if(pitch && pitch.matches){
      upcoming = pitch.matches.filter(match =>  Date.parse(match.endTime) > new Date());
      upcoming.sort(function(a, b){
        return Date.parse(a.time) - Date.parse(b.time);
      });
    }
    return (
      <main>
        {pitch
          ?
          <section className="showPage columns is-multiline">
            <img className="column is-6" src={pitch.image}/>
            <section className="column is-6">
              <h2>{pitch.name}</h2>
              <div className="columns">
                <div className="column is-6">
                  {pitch.averageRating?
                    <p>Pitch Score: {pitch.averageRating}/5.0</p>
                    :
                    <p>Not Yet Rated</p>
                  }
                  <p>Discovered By: <Link to={`/profile/${pitch.uploadedBy._id}`}>{pitch.uploadedBy.username}</Link></p>
                </div>
                {pitch.uploadedBy._id === decodeToken().sub &&
                  <div className="column is-6 buttonWrapperShowPage">
                    <Link to={`/pitches/${pitch._id}/edit`}><button className="button is-rounded">Edit</button></Link>
                    <button onClick={this.deletePitch} className="button is-rounded is-danger">Delete</button>
                  </div>
                }
              </div>
              <div>
                <MapBox userPosition={null} pitches={[pitch]} />
              </div>
            </section>
            <div className="column is-12 matchesSection">
              <h3>Fixture List</h3>
              <hr />
              <div className="matchesContainer columns">
                {upcoming && upcoming.length > 0
                  ?
                  upcoming.map(match =>
                    <div key={match._id} className="pitchMatch column is-3">
                      <Link to={`/matches/${match._id}`}>
                        <h3>{match.type}</h3>
                        <h5><strong>Match Day:</strong> {moment(match.time).format('dddd Do')}</h5>
                        { Date.parse(match.time) < new Date() ?
                          <h5><strong>Kicked Off:</strong> {moment(match.time).format('h:m a')} ({moment(match.time).fromNow()})</h5>
                          :
                          <h5><strong>Kick-Off:</strong> {moment(match.time).format('h:m a')} ({moment(match.time).fromNow()})</h5>
                        }
                        <h5><strong>Final Whistle:</strong> {moment(match.endTime).format('h:m a')}</h5>
                        <h5><strong>Duration:</strong> {moment(match.endTime).diff(moment(match.time), 'minutes')} minutes</h5>
                        { match.attending.length + 1 > 1?
                          <h5><strong>{match.attending.length + 1} players attending</strong></h5>
                          :
                          <h5><strong>1 player attending</strong></h5>
                        }
                      </Link>
                    </div>)
                  :
                  <p className="noMatch">No upcoming fixtures</p>
                }
              </div>
            </div>
            <div className="column is-12 reviewContainer">
              <h3>Pitch Reviews</h3>
              <hr />
              {pitch.reviews.length > 0
                ?
                pitch.reviews.map(review =>
                  <div key={review._id} className="pitchReview columns is-multiline">
                    <h4 className="column is-8">{review.title}</h4>
                    <h5 className="column is-4"><Link to={`/profile/${review.reviewedBy._id}`}>{review.reviewedBy.username}</Link> - {review.rating}/5</h5>
                    <p className="column is-12">{review.content}</p>
                    {review.reviewedBy._id === decodeToken().sub &&
                      <div>
                        <button onClick={this.editMode} className="button is-rounded">Edit</button>
                        <button onClick={() => this.deleteReview(review)} className="button is-rounded is-danger">Delete</button>
                      </div>
                    }
                  </div>)
                :
                <p className="noReview">No reviews yet</p>
              }
              {(!pitch.reviews.find(review => review.reviewedBy._id === decodeToken().sub) || this.state.editing) &&
                <form>
                  <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input className="input" onChange={this.handleChange} value={this.state.title || ''} name="title" required/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Score</label>
                    <div className="control">
                      <input type="range" min="1" max="5" onChange={this.handleChange} value={this.state.rating || ''} name="rating" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Review</label>
                    <div className="control">
                      <textarea rows="4" onChange={this.handleChange} value={this.state.content || ''} name="content" required></textarea>
                    </div>
                  </div>
                  { !this.state.editing
                    ?
                    <button onClick={this.handleSubmit} className="button is-rounded is-info">Submit</button>
                    :
                    <div>
                      <button onClick={this.handleUpdate} className="button is-rounded is-info">Update</button>
                      <button onClick={this.cancelEdit} className="button is-rounded is-primary">Cancel</button>
                    </div>
                  }
                </form>
              }
            </div>
          </section>
          :
          <p>Loading...</p>
        }
      </main>
    );
  }
}

export default PitchShow;
