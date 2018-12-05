import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class PitchShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/pitches/${this.props.match.params.id}`)
      .then(result => this.setState({ pitch: result.data }));
  }

  // handleDelete(event){
  //   event.preventDefault();
  //   axios.delete(`/api/topics/${this.state.topic._id}`)
  //     .then( () => this.props.history.push('/topics'));
  // }

  render() {
    const pitch = this.state.pitch;
    return (
      <main>
        {pitch
          ?
          <section>
            {pitch.name} - will add content here later
            <Link to={`/pitches/${pitch._id}/edit`}><button className="button is-rounded">Edit</button></Link>
            <button onClick={this.handleDelete} className="button is-rounded is-danger">Delete</button>
          </section>
          :
          <p>Loading...</p>
        }
      </main>
    );
  }
}

export default PitchShow;
