const User = require('../models/user');

function profileIndexrRoute(req, res, next){
  User
    .find()
    .then(users => res.json(users))
    .catch(next);
}


function profileShowRoute(req, res, next){
  User
    .findById(req.params.id)
    .populate('matches hosting')
    .then(user => res.json(user))
    .catch(next);
}

function profileUpdateRouote(req, res, next){
  User
    .findById(req.params.id)
    .then(user => {
      Object.assign(user, req.body);
      return user.save();
    })
    .then(user => res.json(user))
    .catch(next);
}

module.exports = {
  index: profileIndexrRoute,
  show: profileShowRoute,
  update: profileUpdateRouote
};
