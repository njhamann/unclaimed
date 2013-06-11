var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {type: String, required: true, unique: false},
    body: {type: String, required: true, unique: false},
    remix_id: {type: String, required: false, unique: false} 
});

module.exports = mongoose.model('Post', postSchema);
