import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

function PitchWrapper({ pitch, filter }){
  return (
    <Link className="column is-6 pitchWrapper" to={`/pitches/${pitch._id}`}>
      {pitch.averageRating && filter === 'score'?
        <h2>{pitch.name} - {pitch.averageRating}/5</h2>
        :
        pitch.distance && filter === 'distance'?
          <h2>{pitch.name} - {pitch.distance.toFixed(2)} Km Away</h2>
          :
          pitch.matches.length > 0 && filter === 'match'?
            <h2>{pitch.name} - {moment(pitch.matches[0].time).fromNow()}</h2>
            :
            <h2>{pitch.name}</h2>
      }
      <img src={pitch.image}/>
    </Link>
  );
}

export default PitchWrapper;
