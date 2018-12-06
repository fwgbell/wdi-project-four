const Pitch = require('../models/pitch');

function createRoute(req, res, next){
  req.body.reviewedBy = req.currentUser._id;
  Pitch
    .findById(req.params.id)
    .populate('reviews.user')
    .then(pitch => {
      pitch.reviews.push(req.body);
      return pitch.save();
    })
    .then(pitch => res.json(pitch))
    .catch(next);
}

function updateRoute(req, res, next){

}

function deleteRoute(req, res, next){

}

module.exports = {
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
