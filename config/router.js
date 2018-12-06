const router = require('express').Router();
const pitches = require('../controllers/pitches');
const auth = require('../controllers/auth');
const pitchReviews = require('../controllers/pitchReviews');
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

module.exports = router;
