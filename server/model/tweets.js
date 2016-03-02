var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    symbol: 'string',
    month: 'string',
    sentiment: 'integer',
    tweets: 'array'
}); 