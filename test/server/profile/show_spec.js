/* global api, expect, describe, it, beforeEach */
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config/environment');

const User = require('../../../models/user');
const userIds = [
  '5bf17051d4a071297aa4b6ea'
];

const userData = {
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
};

let token;
let userId;

describe('User SHOW', () => {

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
      })
      .then(() => {
        token = jwt.sign({ sub: userId }, secret, { expiresIn: '6h' });
        done();
      });
  });
  it('should return a 401 response without a token', done => {
    api.get(`/api/profile/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });


  it('should return a 200 response', done => {
    api.get(`/api/profile/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/profile/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/profile/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body.name).to.eq(userData.name);
        expect(res.body.profilePicture).to.eq(userData.profilePicture);
        expect(res.body.club).to.eq(userData.club);
        done();
      });
  });

});
