import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { authorizationHeader } from '../../lib/auth';

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
            <div className="column is-6">
              <h2>{pitch.name}</h2>
              <p>Quality Rating: {pitch.averageRating}/5</p>
              <p>Discovered By: {pitch.uploadedBy.firstName + ' ' + pitch.uploadedBy.lastName}</p>
              <Link to={`/pitches/${pitch._id}/edit`}><button className="button is-rounded">Edit</button></Link>
              <button onClick={this.handleDelete} className="button is-rounded is-danger">Delete</button>
              <div>Map goes here</div>
            </div>
            <div className="column is-12">Reviews go here</div>
          </section>
          :
          <p>Loading...</p>
        }
      </main>
    );
  }
}

export default PitchShow;
