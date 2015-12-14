var express = require('express');
var router = express.Router();
var reviews = require('../controllers/reviews');

/* GET home page. */
router.get('/', reviews.root.get);
router.post('/', reviews.create.post);
router.patch('/', reviews.update.patch);
router.delete('/', reviews.destroy.delete);

module.exports = router;
