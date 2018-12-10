const Match = require('../models/match');

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
    .populate('hostedBy pitch attending')
    .then(match => {
      Object.assign(match, req.body);
      return match.save();
    })
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

module.exports = {
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
