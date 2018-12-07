const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Pitch = require('../models/pitch');
const User = require('../models/user');

const userIds = [
  '5bf17051d4a071297aa4b6ea',
  '5bf17051d4a071297aa4b6eb',
  '5bf17051d4a071297aa4b6ec',
  '5bf17051d4a071297aa4b6ed',
  '5bf17051d4a071297aa4b6ee'];


const userData = [{
  _id: userIds[0],
  username: 'Freddie',
  email: 'f@f',
  password: 'pass',
  profilePicture: 'https://resources.stuff.co.nz/content/dam/images/1/s/w/u/9/h/image.related.StuffLandscapeSixteenByNine.710x400.1swu60.png/1543712142321.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  role1: 'Winger',
  role2: 'Midfielder',
  club: 'Leicester City'
}, {
  _id: userIds[1],
  username: 'Big-Joe',
  email: 'j@j',
  password: 'pass',
  profilePicture: 'https://media.licdn.com/dms/image/C4D03AQHZijT3gSYPTQ/profile-displayphoto-shrink_800_800/0?e=1549497600&v=beta&t=nlF_uPB2MeC5rIGQTubhEtcERmB4j9zdOm_fFM8UREE',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  role1: 'Striker',
  role2: 'Top Man',
  club: 'Arsenal'
}];

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Pitch.create([{
    uploadedBy: userIds[0],
    name: 'Churchill Gardens',
    lat: 51.486425,
    lng: -0.140997,
    image: 'https://savethepitch.files.wordpress.com/2017/02/chaucer-house-churchill-gardens.jpg',
    reviews: [{
      title: 'My ends till I die',
      reviewedBy: userIds[0],
      rating: 4,
      content: 'This pitch is great, good surface quality and the walls keep the ball in play for a fast game!'
    }, {
      title: 'Where ballers are forged',
      reviewedBy: userIds[1],
      rating: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  }, {
    uploadedBy: userIds[1],
    name: 'Battersea Church Road',
    lat: 51.477472,
    lng: -0.173529,
    image: 'https://savethepitch.files.wordpress.com/2017/02/thomas-kinder-garden.jpg',
    reviews: [{
      title: 'Too good 😤',
      reviewedBy: userIds[0],
      rating: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  }])
    .then(pitches => {
      console.log(`${pitches.length} pitches created`);
      User
        .create(userData)
        .then(users => {
          console.log(`${users.length} users created`);
        })
        .catch(err => console.log(err))
        .finally(() => mongoose.connection.close());
    });
});
