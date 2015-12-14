var express = require('express');
var router = express.Router();
var courses = require('../controllers/courses');

/* GET home page. */
router.get('/', courses.root.get);
router.post('/', courses.create.post);
router.patch('/', courses.update.patch);
router.delete('/', courses.destroy.delete);


module.exports = router;
