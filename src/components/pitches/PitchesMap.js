import React from 'react';
import axios from 'axios';

import MapBox from '../common/MapBox';

class PitchesMap extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      pitches: null,
      userPosition: null
    };
    this.getLocation = this.getLocation.bind(this);
    this.getPitches = this.getPitches.bind(this);
  }

  getLocation(pos) {
    this.setState({ userPosition: [pos.coords.latitude, pos.coords.longitude]}, () => {
      this.getPitches();
    });
  }

  getPitches() {
    axios.get('/api/pitches')
      .then(res => {
        this.setState({ pitches: res.data });
      });
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getLocation, this.getPitches);
  }

  render(){
    return(
      <div className="mapPage">
        {!this.state.userPosition && !this.state.pitches
          ?
          <p className="loadingMapPage">Loading map...</p>
          :
          <MapBox
            userPosition={this.state.userPosition}
            pitches={this.state.pitches} />
        }
      </div>
    );
  }
}

export default PitchesMap;
