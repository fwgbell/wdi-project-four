const router = require('express').Router();
const pitches = require('../controllers/pitches');
const auth = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');

router.route('/pitches')
  .get(pitches.index)
  .post(secureRoute, pitches.create);

router.route('/pitches/:id')
  .get(pitches.show)
  .put(secureRoute, pitches.update)
  .delete(secureRoute, pitches.delete);

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;
