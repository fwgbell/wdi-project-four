import React from 'react';
import { Link } from 'react-router-dom';


function PitchWrapper({ pitch }){
  return (
    <Link className="column is-6 pitchWrapper" to={`/pitches/${pitch._id}`}>
      {pitch.averageRating ?
        <h2>{pitch.name} - {pitch.averageRating}/5</h2>
        :
        <h2>{pitch.name}</h2>
      }
      <img src={pitch.image}/>
    </Link>
  );
}

export default PitchWrapper;
