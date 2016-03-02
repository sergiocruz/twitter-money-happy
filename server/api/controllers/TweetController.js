/**
 * TweetController
 *
 * @description :: Server-side logic for managing tweets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Twitter = require('twitter');
var twitter_keys = require('./twitter-keys');

var client = new Twitter({
    consumer_key: twitter_keys.consumer_key,
    consumer_secret: twitter_keys.consumer_secret,
    access_token_key: twitter_keys.token_key,
    access_token_secret: twitter_keys.token_secret
});

var tickers = ['MSFT', 'FB', 'AAPL', 'GOOG'];

module.exports = {

	import: function(req, res) {
        client.stream('statuses/filter', {track: '$GOOG$'},  function(stream){
            stream.on('data', function(tweet) {
                console.log(tweet.text);
            });

            stream.on('error', function(error) {
                console.log(error);
            });
        });
	}

};


//https://api.twitter.com/1.1/search/tweets.json?q=%24AAPL%24&src=typd