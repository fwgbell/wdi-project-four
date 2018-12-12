/* global describe, it, expect, api, beforeEach */

const Pitch = require('../../../models/pitch');
const userIds = [
  '5bf17051d4a071297aa4b6ea'
];


const pitchData = {
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
};


describe('Pitch INDEX', () => {

  beforeEach(done => {
    Pitch.remove({})
      .then(() => Pitch.create(pitchData))
      .then(() => done());
  });

  it('should return a 200s response', done => {
    api.get('/api/pitches')
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an array', done => {
    api.get('/api/pitches')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should return an array of objects', done => {
    api.get('/api/pitches')
      .end((err, res) => {
        res.body.forEach(item => expect(item).to.be.an('object'));
        done();
      });
  });
});
