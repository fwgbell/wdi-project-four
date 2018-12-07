import React from 'react';
import axios from 'axios';
import PitchWrapper from './PitchWrapper';
import { getDistanceFromLatLngInKm } from '../../lib/map';

class PitchIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: 'Highest Scoring Pitches'
    };
    this.sortByDistance = this.sortByDistance.bind(this);
    this.sortByScore = this.sortByScore.bind(this);
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
      this.setState({ titleText: 'Closest Pitches To You', pitches: pitches});
    }, this.setState({ titleText: 'Looking For Your Location...'}));
  }

  sortByScore(){
    const pitches = this.state.pitches.sort(function(a, b){
      return b.averageRating - a.averageRating;
    });
    this.setState({ titleText: 'Highest Scoring Pitches', pitches: pitches});
  }

  componentDidMount() {
    axios.get('/api/pitches')
      .then(res => {
        res.data.sort(function(a, b){
          return b.averageRating - a.averageRating;
        });
        this.setState({ pitches: res.data });
      });
  }

  render() {
    return (
      <section className="indexPage columns is-multiline">
        <div className="column is-12">
          <p>Sort by:</p>
          <button onClick={this.sortByDistance} className="button">Distance</button>
          <button onClick={this.sortByScore} className="button">Score</button>
        </div>
        <h1 className="title column is-12">{this.state.titleText}</h1>
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
