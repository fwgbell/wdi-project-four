import React from 'react';
import axios from 'axios';
import PitchWrapper from './PitchWrapper';

class PitchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/pitches')
      .then(res => this.setState({ pitches: res.data }));
  }

  render() {
    return (
      <section className="indexPage columns is-multiline">
        <h1 className="title column is-12">Doing It For The Pitches</h1>
        {this.state.pitches
          ?
          this.state.pitches.map(pitch => <PitchWrapper key={pitch._id} pitch={pitch}/>)
          :
          <p>Loading...</p>}
      </section>
    );
  }
}
export default PitchIndex;
