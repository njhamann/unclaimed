
/*
 * GET users listing.
 */

var Post = require('../models/post.js')
  , mongoose = require('mongoose');

exports.get = function(req, res){
    var ObjectId = mongoose.Types.ObjectId;
    var oId = new ObjectId(req.param('id'));
    Post.findOne({_id: oId}, function(err, docs) {
        res.json({ 
            success: 1,
            post: docs
        });
    });
};

exports.save = function(req, res){
    //validation
    req.checkBody('title', 'Must include title').notEmpty();
    req.checkBody('body', 'Must include body').notEmpty();
    
    var errors = req.validationErrors();
    if (errors) {
        res.json({ success: 0, errors: errors });
    }else{
        var post = new Post(req.body);
        post.save(function(err, docs){
            if (err) throw err;
            res.json({
                success: 1,
                id: docs._id
            });
        });
    }
};
