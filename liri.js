// import modules
var request = require('request');
var Twitter = require('twitter')

var input = process.argv[2];
var queryURL;

switch (input) {
	case 'my-tweets':
		var twitterKeys = require('./keys.js');
		var client = new Twitter(twitterKeys);
		client.get('statuses/user_timeline',{count:3},function(error,tweets,response) {
			if (error) throw error;
			console.log(tweets[1].created_at)
			console.log(tweets[1].text);
		})

		// queryURL = 'https://api.twitter.com/1.1/statuses/home_timeline.json';
		// numTweets = 20;
		// request
		// 	.get(queryURL + '?count=' + numTweets)
		// 	.on('response', function(response) {
		// 		console.log(response.statusCode);
		// 	});
		break;
	case 'spotify-this-song':
	case 'movie-this':
	case 'do-what-it-says':
	default:
		console.log('No user input or invalid user input!');
}