import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const MapBox = ({ userPosition, pitches }) => {
  return (
    <div id='map'>
      <Map center={userPosition || [pitches[0].lat, pitches[0].lng]} zoom={14}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {userPosition && <Marker position={userPosition}>
          <Popup>
            You!
          </Popup>
        </Marker>}
        {pitches && pitches.map(pitch =>
          <Marker key={pitch._id} position={[pitch.lat, pitch.lng]}>
            <Popup>
              <Link to={`/pitches/${pitch._id}`}>
                {pitch.name}
              </Link>
            </Popup>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default MapBox;
