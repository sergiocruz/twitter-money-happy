/**
* Stocks.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    month: {
        type: 'string',
        defaultsTo: '0000-00'
    }
    symbol: {
        type: 'string',
        defaultsTo: 'null',
        unique: true
    }
    price: {
        type: 'integer',
        defaultsTo: 0
    }
  }
};

