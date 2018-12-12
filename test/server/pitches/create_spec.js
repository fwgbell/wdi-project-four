/* global describe, it, expect, api, beforeEach */

const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

const { secret } = require('../../../config/environment');

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

let token;

describe('Pitch CREATE', () => {

  beforeEach(done => {
    Pitch.remove({})
      .then(() => User.remove({}))
      .then(() => User.create({
        email: 'test',
        username: 'test',
        password: 'test',
        role1: 'Striker',
        club: 'Burnley'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' });
        done();
      });
  });

  it('should return a 401 response without a token', done => {
    api.post('/api/pitches')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 response', done => {
    api.post('/api/pitches')
      .set('Authorization', `Bearer ${token}`)
      .send(pitchData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/pitches')
      .set('Authorization', `Bearer ${token}`)
      .send(pitchData)
      .end((err, res) => {
        expect(res).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/pitches')
      .set('Authorization', `Bearer ${token}`)
      .send(pitchData)
      .end((err, res) => {
        expect(res.body.name).to.eq(pitchData.name);
        expect(res.body.image).to.eq(pitchData.image);
        expect(res.body.lat).to.eq(pitchData.lat);
        expect(res.body.lng).to.eq(pitchData.lng);
        done();
      });
  });
});
