var Course = require('../models').model('Course');
var db = require('../models/index');

module.exports = {
    deny : function(req, res) {
            res.sendStatus(405);
    },
    root : {
        get : function index(req, res, next) {
            Course.find({}).exec().then(function(course) {
                  res.json(course);
                }).catch(function(error) {
                  next(error);
            });
        }
    },
    create : {
        post : function(req, res, next) {
                    var pCourse = new Promise(function(res, rej) {
                        Course.create({
                            user_ObjectId: req.user._id,
                            name: req.body.name,
                            est_date: req.body.est_date,
                            address: req.body.address,
                            holes: req.body.holes,
                            tees: req.body.tees,
                            layout: req.body.layout,
                            fee: req.body.fee,
                            directions: req.body.directions,
                            rating: req.body.rating,
                            review_objectId: []
                        }, function(err, course) {
                            if(err) {
                                rej(err);
                                return;
                            }
                            res(course);
                        });
                    });
                pCourse.then(function(doc) {
                res.json(doc);
                return doc.save();
                }).catch(function(err) {
                next(err);
                });
        }
    }
};