const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbURI } = require('../config/environment');
const Pitch = require('../models/pitch');
const User = require('../models/user');
const Match = require('../models/match');
const Message = require('../models/message');

const userIds = [
  '5bf17051d4a071297aa4b6ea',
  '5bf17051d4a071297aa4b6eb',
  '5bf17051d4a071297aa4b6ec',
  '5bf17051d4a071297aa4b6ed',
  '5bf17051d4a071297aa4b6ee'];

const pitchIds = ['5c0d442bf8d7918360005c4d', '5c0d442bf8d7918360005c50'];

const userData = [{
  _id: userIds[0],
  username: 'Freddie',
  email: 'f@f',
  password: 'pass',
  profilePicture: 'http://media-ima002.globaltalentsystems.com/23671/600/23671_000-11-30-2016-12520.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  role1: 'Winger',
  role2: 'Midfielder',
  club: 'Leicester City',
  country: 'England'
}, {
  _id: userIds[1],
  username: 'Big-Joe',
  email: 'j@j',
  password: 'pass',
  profilePicture: 'https://media.licdn.com/dms/image/C4D03AQHZijT3gSYPTQ/profile-displayphoto-shrink_800_800/0?e=1549497600&v=beta&t=nlF_uPB2MeC5rIGQTubhEtcERmB4j9zdOm_fFM8UREE',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  role1: 'Striker',
  role2: 'Top Man',
  club: 'Arsenal',
  country: 'England',
  chillRating: [5],
  skillRating: [3],
  hostRating: [5]
}, {
  _id: userIds[2],
  username: 'Francis-dinho',
  email: 'a@a',
  password: 'pass',
  profilePicture: 'https://media.licdn.com/dms/image/C4D03AQFEtVumC_yOng/profile-displayphoto-shrink_800_800/0?e=1550102400&v=beta&t=vnTCckTr5JST_tCBfYTxJYOhUuysoBocHu0VUhKpxgI',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  role1: '💦Water Boy💦',
  role2: 'Top Man',
  club: 'Crystal Palace',
  country: 'China',
  likes: [userIds[0]],
  chillRating: [5],
  skillRating: [3],
  hostRating: [5]

}, {
  _id: userIds[3],
  username: 'Dezzza',
  email: 'i@i',
  password: 'pass',
  profilePicture: 'https://scontent-lhr3-1.xx.fbcdn.net/v/t1.0-9/20769942_10211283715181481_1745424953888526791_n.jpg?_nc_cat=100&_nc_ht=scontent-lhr3-1.xx&oh=cdaf6f7b5ede87d4d91252a1dc40f0a4&oe=5C94FBC9',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod',
  role1: 'Striker',
  role2: 'Top Man',
  club: 'Chelsea',
  country: 'United States',
  likes: [userIds[0]],
  chillRating: [5],
  skillRating: [1],
  hostRating: [5]

}];

const matchData = [{
  hostedBy: userIds[1],
  time: 'Mon Dec 10 2018 13:15:00 GMT+0000 (Greenwich Mean Time)',
  endTime: 'Mon Dec 10 2018 13:45:28 GMT+0000 (Greenwich Mean Time)',
  type: 'Kick-About',
  pitch: pitchIds[0],
  attending: [userIds[0], userIds[2], userIds[3]]
}, {
  hostedBy: userIds[2],
  time: 'Tue Dec 11 2018 12:15:00 GMT+0000 (Greenwich Mean Time)',
  endTime: 'Tue Dec 11 2018 12:20:28 GMT+0000 (Greenwich Mean Time)',
  type: 'Kick-About',
  pitch: pitchIds[0]
}, {
  hostedBy: userIds[1],
  time: 'Sat Dec 15 2018 12:15:00 GMT+0000 (Greenwich Mean Time)',
  endTime: 'Sat Dec 15 2018 12:20:28 GMT+0000 (Greenwich Mean Time)',
  type: 'Baby',
  pitch: pitchIds[0],
  attending: [userIds[0], userIds[2], userIds[3]]
}];

const messageData = [
  {
    from: userIds[0],
    to: userIds[1],
    content: 'Hello Joe!'
  }, {
    from: userIds[1],
    to: userIds[0],
    content: 'New phone who dis?'
  }, {
    from: userIds[0],
    to: userIds[1],
    content: 'Messages are working!!'
  }
];

mongoose.connect(dbURI, (err, db) => {
  db.dropDatabase();

  Pitch.create([{
    _id: pitchIds[0],
    uploadedBy: userIds[0],
    name: 'Churchill Gardens',
    lat: 51.486425,
    lng: -0.140997,
    image: 'https://savethepitch.files.wordpress.com/2017/02/chaucer-house-churchill-gardens.jpg',
    reviews: [{
      title: 'My ends till I die',
      reviewedBy: userIds[0],
      rating: 5,
      content: 'This pitch is great, good surface quality and the walls keep the ball in play for a fast game!'
    }, {
      title: 'Where ballers are forged',
      reviewedBy: userIds[1],
      rating: 4,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  }, {
    _id: pitchIds[1],
    uploadedBy: userIds[1],
    name: 'Battersea Church Road',
    lat: 51.477472,
    lng: -0.173529,
    image: 'https://savethepitch.files.wordpress.com/2017/02/thomas-kinder-garden.jpg',
    reviews: [{
      title: 'Too good 😤',
      reviewedBy: userIds[0],
      rating: 4,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  }, {
    uploadedBy: userIds[1],
    name: 'Berner Pitch',
    lat: 51.512483,
    lng: -0.063817,
    image: 'https://savethepitch.files.wordpress.com/2017/02/brixton-station-road.jpg',
    reviews: [{
      title: 'Too good 😤',
      reviewedBy: userIds[0],
      rating: 2,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  }, {
    uploadedBy: userIds[1],
    name: 'Power League Shoreditch',
    lat: 51.523389,
    lng: -0.074862,
    image: 'https://www.dura-sport.co.uk/assets/js/tinymce/plugins/moxiemanager/data/files/IMAGES%20-%20FOOTBALL/FOOTBALL%20CASE%20STUDIES/Lucozade%20Canary%20Wharf/Lucozade2%20-%20done.jpg',
    reviews: [{
      title: 'Absolute rip off!! 🤬',
      reviewedBy: userIds[0],
      rating: 1,
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }]
  }])
    .then(pitches => {
      console.log(`${pitches.length} pitches created`);
      User
        .create(userData)
        .then(users => {
          console.log(`${users.length} users created`);
          Match
            .create(matchData)
            .then(matches => {
              console.log(`${matches.length} matches created`);
              Message
                .create(messageData)
                .then(messages => {
                  console.log(`${messages.length} messages created`);
                })
                .catch(err => console.log(err))
                .finally(() => mongoose.connection.close());
            });
        });
    });
});
