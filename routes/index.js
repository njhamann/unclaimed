/*
 * GET home page.
 */

var mongodb = require('mongodb');

exports.index = function(req, res){
    res.render('index');
};
