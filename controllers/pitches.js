const Pitch = require('../models/pitch');

function indexRoute(req, res, next) {
  Pitch
    .find()
    .populate('matches')
    .then(pitches => res.json(pitches))
    .catch(next);
}

function showRoute(req, res, next) {
  Pitch
    .findById(req.params.id)
    .populate('uploadedBy reviews.reviewedBy matches')
    .then(pitch => res.json(pitch))
    .catch(next);
}

function createRoute(req, res, next) {
  Pitch
    .create(req.body)
    .then(pitch => res.status(201).json(pitch))
    .catch(next);
}

function updateRoute(req, res, next) {
  Pitch
    .findById(req.params.id)
    .then(pitch => {
      Object.assign(pitch, req.body);
      return pitch.save();
    })
    .then(pitch => res.json(pitch))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Pitch
    .findById(req.params.id)
    .then(pitch => pitch.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
