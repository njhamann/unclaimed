
/*
 * GET users listing.
 */

var mongodb = require('mongodb');

exports.get = function(req, res){
    var BSON = mongodb.BSONPure;
    var oId = new BSON.ObjectID(req.param('id'));
    var server = new mongodb.Server("127.0.0.1", 27017, {});
    new mongodb.Db('noone', server, {w: 1}).open(function (error, client) {
        if (error) throw error;
        var collection = new mongodb.Collection(client, 'posts');
        collection.findOne({_id: oId}, function(error, docs){
            res.json({ 
                success: 1,
                post: docs
            });
        });
    });
};

exports.save = function(req, res){
    var server = new mongodb.Server("127.0.0.1", 27017, {});
    new mongodb.Db('noone', server, {w: 1}).open(function (error, client) {
        if (error) throw error;
        var collection = new mongodb.Collection(client, 'posts');
        collection.insert(req.body, function(err, docs){
            if (error) throw error;
            res.json({
                success: 1,
                id: docs[0]._id
            });
            server.close(); 
        });
    });
};
