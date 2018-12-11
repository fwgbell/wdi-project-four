const Message = require('../models/message');

function indexRoute(req, res, next) {
  Message.find({ $or: [{ from: req.currentUser._id }, { to: req.currentUser._id }] })
    .populate('from to', 'username profilePicture')
    .sort('createdAt')
    .then(messages => res.json(messages))
    .catch(next);
}

function createRoute(req, res, next) {
  req.body.from = req.currentUser._id;
  Message.create(req.body)
    .then(message => Message.populate(message, 'from to'))
    .then(message => res.json(message))
    .catch(next);
}

function deleteRoute(req, res, next) {
  Message.findOneAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  delete: deleteRoute
};
