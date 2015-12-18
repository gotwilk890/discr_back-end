'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('Course', require('./Course'));
mongoose.model('Review', require('./Review'));

mongoose.connect(process.env.MONGOLAB_URI);

module.exports = mongoose.connection;
