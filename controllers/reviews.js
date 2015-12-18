var Review = require('../models').model('Review');
var db = require('../models/index');

module.exports = {
    deny : function(req, res) {
            res.sendStatus(405);
    },
    root : {
        get : function index(req, res, next) {
            Review.find({}).exec().then(function(review) {
                  res.json(review);
                }).catch(function(error) {
                  next(error);
            });
        }
    },
    create : {
        post : function(req, res, next) {
                    var pReview = new Promise(function(res, rej) {
                        Review.create({
                            user_ObjectId: req.user._id,
                            userName: req.user.userName,
                            review: req.body.review,
                            course_ObjectId: req.body.course_ObjectId,
                        }, function(err, review) {
                            if(err) {
                                rej(err);
                                return;
                            }
                            res(review);
                        });
                    });
                pReview.then(function(doc) {
                res.json(doc);
                return doc.save();
                }).catch(function(err) {
                next(err);
                });
        }
    },
    update: {
        patch : function(req,res,next) {
            var pReview = new Promise(function(res, rej){
                Review.update({user_ObjectId: req.user._id, course_ObjectId: req.body.course_ObjectId},{
                    review: req.body.review
                },function(err, review) {
                            if(err) {
                                rej(err);
                                return;
                            }
                            res(review);

                });
            });
            pReview.then(function(doc){

                return res.json(doc);
            }).catch(function(err) {
                next(err);
            });
        }

    },
    destroy : {
        delete : function(req, res, next) {
            Review.remove({user_ObjectId: req.user._id, course_ObjectId: req.body.course_ObjectId}, function(err, review) {
                if (err) return next(err);
                res.send(review); // see results
            });
        }
    }

};
