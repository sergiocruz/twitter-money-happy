var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    'avg': Number,
    'name': String
});

var Tweet = mongoose.model('Tweet', schema);

module.exports = Tweet;