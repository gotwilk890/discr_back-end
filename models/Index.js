'use strict';

var mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.model('User', require('./User'));
mongoose.model('Course', require('./Course'));

mongoose.connect("mongodb://localhost/discrdb");

module.exports = mongoose;
