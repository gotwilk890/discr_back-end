'use strict'

var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var todaysDate = function(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
      mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    return today;
  };

var reviewSchema = new mongoose.Schema({
  user_ObjectId: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    unique: true,
    ref: "User"
  },
  userName: {
    type: 'String',
    required: true,
    ref: "review creater"
  },
  date: {
    type: 'String',
    default: todaysDate(),
    required: true,
    ref: 'date created'
  },
  review: {
    type: 'String',
    required: true,
    ref: 'Actual Review'
  },
  course_ObjectId:{
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: 'Course ID'
  }
});

reviewSchema.plugin(uniqueValidator);


module.exports = reviewSchema;
