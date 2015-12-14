'use strict'

var mongoose = require('mongoose');


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
  est_date: {
    type: 'String',
    required: true,
    ref: 'Established Date'
  },
  address: {
    type: 'String',
    required: true,
    unique: true,
    ref: 'Course Address'
  },
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
  directions: {
    type: 'String',
    required: true,
    ref: 'basic directions'
  },
  rating:{
    type: 'String',
    required: true,
    ref: 'course rating'
  }

});

courseSchema.plugin(uniqueValidator);

module.exports = orderSchema;
