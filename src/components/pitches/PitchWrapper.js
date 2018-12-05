import React from 'react';
import { Link } from 'react-router-dom';


function PitchWrapper({ pitch }){
  return (
    <Link className="column" to={`/pitches/${pitch._id}`}>
      <div>
        <h2>{pitch.name}</h2>
        <img src={pitch.image}/>
      </div>
    </Link>
  );
}

export default PitchWrapper;
