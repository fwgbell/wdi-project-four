const Match = require('../models/match');

function createRoute(req, res, next){
  req.body.hostedBy = req.currentUser._id;
  Match
    .create(req.body)
    .then(match => res.status(201).json(match))
    .catch(next);
}

function deleteRoute(req, res, next){
  Match
    .findById(req.params.id)
    .then(match => match.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  create: createRoute,
  delete: deleteRoute
};
