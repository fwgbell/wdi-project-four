import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authorizationHeader, decodeToken } from '../../lib/auth';
import MapBox from '../common/MapBox';


class PitchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/pitches/${this.props.match.params.id}`)
      .then(result => this.setState({ pitch: result.data }));
  }

  handleDelete(event){
    event.preventDefault();
    axios.delete(`/api/pitches/${this.state.pitch._id}`, authorizationHeader())
      .then( () => this.props.history.push('/pitches'));
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
                    <button onClick={this.handleDelete} className="button is-rounded is-danger">Delete</button>
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
              {pitch.reviews?
                pitch.reviews.map(review =>
                  <div key={review._id} className="pitchReview columns is-multiline">
                    <h4 className="column is-8">{review.title}</h4>
                    <h5 className="column is-4">{review.reviewedBy.username} - {review.rating}/5</h5>
                    <p className="column is-12">{review.content}</p>
                  </div>)
                :
                <p>No reviews yet</p>}
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
