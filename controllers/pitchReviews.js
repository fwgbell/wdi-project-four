const Pitch = require('../models/pitch');

function createRoute(req, res, next){
  req.body.reviewedBy = req.currentUser._id;
  Pitch
    .findById(req.params.id)
    .populate('uploadedBy reviews.reviewedBy')
    .then(pitch => {
      pitch.reviews.push(req.body);
      return pitch.save();
    })
    .then(pitch => res.json(pitch))
    .catch(next);
}

function updateRoute(req, res, next){
  Pitch
    .findById(req.params.id)
    .populate('uploadedBy reviews.reviewedBy')
    .then(pitch => {
      const review = pitch.reviews.id(req.params.reviewId);
      if(!review.reviewedBy._id.equals(req.currentUser._id)) {
        throw new Error('Unauthorized');
      }
      review.set(req.body);
      return pitch.save();
    })
    .then(pitch => res.json(pitch))
    .catch(next);
}

function deleteRoute(req, res, next){
  Pitch
    .findById(req.params.id)
    .populate('uploadedBy reviews.reviewedBy')
    .then(pitch => {
      const review = pitch.reviews.id(req.params.reviewId);
      if(!review.reviewedBy._id.equals(req.currentUser._id)) {
        throw new Error('Unauthorized');
      }
      review.remove();
      return pitch.save();
    })
    .then(pitch => res.json(pitch))
    .catch(next);
}

module.exports = {
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
};
