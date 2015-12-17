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
    findOne : {
        get : function index(req, res, next) {
            var courseName = req.params.name;
            console.log(courseName);
            Course.find({name: courseName}).exec().then(function(course) {
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
                            street_address: req.body.street_address,
                            town: req.body.town,
                            state: req.body.state,
                            country: req.body.country,
                            lat: req.body.lat,
                            lng: req.body.lng,
                            holes: req.body.holes,
                            tees: req.body.tees,
                            layout: req.body.layout,
                            fee: req.body.fee
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
    },
    update: {
        patch : function(req,res,next) {
            var pCourse = new Promise(function(res, rej){
                Course.update({user_ObjectId: req.user._id, _id: req.body.course_ObjectId},{
                    user_ObjectId: req.user._id,
                    name: req.body.name,
                    street_address: req.body.street_address,
                    town: req.body.town,
                    state: req.body.state,
                    country: req.body.country,
                    lat: req.body.lat,
                    lng: req.body.lng,
                    holes: req.body.holes,
                    tees: req.body.tees,
                    layout: req.body.layout,
                    fee: req.body.fee,
                    rating: req.body.rating
                },function(err, course) {
                            if(err) {
                                rej(err);
                                return;
                            }
                            res(course);

                });
            });
            pCourse.then(function(doc){
                return res.json(doc);
            }).catch(function(err) {
                next(err);
            });
        }

    },
    destroy : {
        delete : function(req, res, next) {
            Course.remove({user_ObjectId: req.user._id, _id: req.body.course_ObjectId}, function(err, course) {
                if (err) return next(err);
                res.send(course); // see results
            });
        }
    }
};
