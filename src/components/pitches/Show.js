import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authorizationHeader, decodeToken } from '../../lib/auth';
import MapBox from '../common/MapBox';


class PitchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deletePitch = this.deletePitch.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/pitches/${this.props.match.params.id}`)
      .then(result => this.setState({ pitch: result.data }));
  }

  deletePitch(){
    axios.delete(`/api/pitches/${this.state.pitch._id}`, authorizationHeader())
      .then( () => this.props.history.push('/pitches'));
  }

  deleteReview = review =>{
    axios.delete(`/api/pitches/${this.state.pitch._id}/reviews/${review._id}`, authorizationHeader())
      .then(result => this.setState({ pitch: result.data }));
  }

  render() {
    const pitch = this.state.pitch;
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
                    <p>Pitch Score: {pitch.averageRating}/5</p>
                    :
                    <p>Not Yet Rated</p>
                  }
                  <p>Discovered By: {pitch.uploadedBy.username}</p>
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
            <div className="column is-12 reviewContainer">
              <h3>Reviews</h3>
              <hr />
              {pitch.reviews.length > 0
                ?
                pitch.reviews.map(review =>
                  <div key={review._id} className="pitchReview columns is-multiline">
                    <h4 className="column is-8">{review.title}</h4>
                    <h5 className="column is-4">{review.reviewedBy.username} - {review.rating}/5</h5>
                    <p className="column is-12">{review.content}</p>
                    {review.reviewedBy._id === decodeToken().sub &&
                      <div>
                        <button className="button is-rounded">Edit</button>
                        <button onClick={() => this.deleteReview(review)} className="button is-rounded is-danger">Delete</button>
                      </div>
                    }
                  </div>)
                :
                <p>No reviews yet</p>
              }
              {!pitch.reviews.find(review => review.reviewedBy._id === decodeToken().sub) &&
                <form>
                  <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                      <input className="input" required/>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Rating</label>
                    <div className="control">
                      <input type="range" min="1" max="5" />
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Review</label>
                    <div className="control">
                      <textarea rows="4" required></textarea>
                    </div>
                  </div>
                  <button className="button is-rounded is-info">Submit</button>
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
