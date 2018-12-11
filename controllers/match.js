const Match = require('../models/match');
const User = require('../models/user');

function showRoute(req, res, next){
  Match
    .findById(req.params.id)
    .populate('hostedBy pitch attending')
    .then(match => res.json(match))
    .catch(next);
}

function createRoute(req, res, next){
  req.body.hostedBy = req.currentUser._id;
  Match
    .create(req.body)
    .then(match => res.status(201).json(match))
    .catch(next);
}

function updateRoute(req, res, next){
  Match
    .findById(req.params.id)
    .populate('hostedBy pitch')
    .then(match => {
      Object.assign(match, req.body);
      return match.save();
    })
    .then(match => Match.populate(match, 'attending'))
    .then(match => res.json(match))
    .catch(next);
}

function deleteRoute(req, res, next){
  Match
    .findById(req.params.id)
    .then(match => match.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function rateRoute(req, res, next){
  const ratings = req.body.ratings;
  Promise.all(ratings.map(rating => {
    User
      .findById(rating._id)
      .then(user => {
        user.chillRating.push(rating.chillRating);
        user.skillRating.push(rating.skillRating);
        if(rating.hostRating) user.hostRating.push(rating.hostRating);
        return user.save();
      });
  }))
    .then( Match
      .findById(req.body.match)
      .populate('hostedBy pitch attending')
      .then(match => res.json(match))
      .catch(next)
    );
}

module.exports = {
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  rate: rateRoute
};
