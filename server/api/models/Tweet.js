/**
* Tweet.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        symbol: {
            type: 'string',
            defaultsTo: 'null',
            unique: true
        }
        month: {
            type: 'string',
            defaultsTo: 'YYYY-MM'
        }
        sentiment: {
            type: 'integer',
            defaultsTo: 0
        }
        tweets: {
            type: 'array'
        }
    }
};

