import React from 'react';
import { Link } from 'react-router-dom';


function PitchWrapper({ pitch, filter }){
  return (
    <Link className="column is-6 pitchWrapper" to={`/pitches/${pitch._id}`}>
      {pitch.averageRating && filter === 'score'?
        <h2>{pitch.name} - {pitch.averageRating}/5</h2>
        :
        pitch.distance && filter === 'distance'?
          <h2>{pitch.name} - {pitch.distance.toFixed(2)} Km away</h2>
          :
          <h2>{pitch.name}</h2>
      }
      <img src={pitch.image}/>
    </Link>
  );
}

export default PitchWrapper;
