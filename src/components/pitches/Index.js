import React from 'react';
import axios from 'axios';
import PitchWrapper from './PitchWrapper';
import { getDistanceFromLatLngInKm } from '../../lib/map';

class PitchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.sortByDistance = this.sortByDistance.bind(this);
  }

  sortByDistance(){
    navigator.geolocation.getCurrentPosition((pos)=>{
      const userPos = [pos.coords.latitude, pos.coords.longitude];
      const pitches = this.state.pitches.map(function(pitch){
        pitch.distance = getDistanceFromLatLngInKm(userPos[0], userPos[1], pitch.lat, pitch.lng);
        return pitch;
      });
      pitches.sort(function(a, b){
        return a.distance - b.distance;
      });
      this.setState({ pitches: pitches});
    }, ()=> console.log('failed to find user loction :('));
  }



  componentDidMount() {
    axios.get('/api/pitches')
      .then(res => this.setState({ pitches: res.data }));
  }

  render() {
    return (
      <section className="indexPage columns is-multiline">
        <button onClick={this.sortByDistance} className="column is-12">sort</button>
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
