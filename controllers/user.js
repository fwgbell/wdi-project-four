const User = require('../models/user');

function profileShowRoute(req, res, next){
  User
    .findById(req.params.id)
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
  show: profileShowRoute,
  update: profileUpdateRouote
};
