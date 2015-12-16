'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var courseSchema = new mongoose.Schema({
  user_ObjectId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "User"
  },
  name: {
    type: 'String',
    required: true,
    ref: "Course name"
  },
  street_address: {
    type: 'String',
    required: true,
    unique: true,
    ref: 'Course Address'
  },
  town:{
    type: 'String',
    required: true,
    ref: 'Course Address'
  },
  state:{
    type: 'String',
    required: true,
    ref: 'Course Address'
  },
  country:{
    type: 'String',
    required: true,
    ref: 'Course Address'
  }
  holes: {
    type: 'String',
    required: true,
    ref: 'Amount of holes'
  },
  tees: {
    type: 'String',
    required: true,
    ref: 'type of tee pads'
  },
  layout: {
    type: 'String',
    required: true,
    ref: 'environment, woods, open field, etc.'
  },
  fee: {
    type: 'String',
    required: true,
    ref: 'fee to play'
  },
  rating:{
    type: 'String',
    required: true,
    ref: 'course rating'
  },
});

courseSchema.plugin(uniqueValidator);

module.exports = courseSchema;
