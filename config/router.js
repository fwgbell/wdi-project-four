const router = require('express').Router();
const pitches = require('../controllers/pitches');
const auth = require('../controllers/auth');
const profile = require('../controllers/profile');
const pitchReviews = require('../controllers/pitchReviews');
const match = require('../controllers/match');
const messages = require('../controllers/messages');
const secureRoute = require('../lib/secureRoute');


router.route('/pitches')
  .get(pitches.index)
  .post(secureRoute, pitches.create);

router.route('/pitches/:id')
  .get(pitches.show)
  .put(secureRoute, pitches.update)
  .delete(secureRoute, pitches.delete);

router.route('/pitches/:id/reviews')
  .post(secureRoute, pitchReviews.create);

router.route('/pitches/:id/reviews/:reviewId')
  .put(secureRoute, pitchReviews.update)
  .delete(secureRoute, pitchReviews.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);

router.get('/users', secureRoute, profile.index);

router.route('/profile/:id')
  .get(secureRoute, profile.show)
  .put(secureRoute, profile.update);

router.post('/matches', secureRoute, match.create);

router.route('/matches/:id')
  .get(secureRoute, match.show)
  .put(secureRoute, match.update)
  .delete(secureRoute, match.delete);

router.post('/match/rating', secureRoute, match.rate);

router.route('/messages')
  .get(secureRoute, messages.index)
  .post(secureRoute, messages.create);

router.route('/messages/:id')
  .delete(secureRoute, messages.delete);

router.post('/like', secureRoute, profile.like);
router.post('/dislike', secureRoute, profile.dislike);

module.exports = router;
