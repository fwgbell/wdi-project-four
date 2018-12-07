export function getDistanceFromLatLngInKm(lat1,lng1,lat2,lng2) {
  const radius = 6371; // radius of the earth in km
  const latDistance = degreesToRadians(lat2-lat1);  // degreesToRadians below
  const lngDistance = degreesToRadians(lng2-lng1);
  const a =
    Math.sin(latDistance/2) * Math.sin(latDistance/2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(lngDistance/2) * Math.sin(lngDistance/2)
    ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = radius * c; // Distance in km
  return distance;
}

function degreesToRadians(degrees) {
  return degrees * (Math.PI/180);
}
