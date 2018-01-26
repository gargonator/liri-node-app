// import relevant modules
const request = require('request');
const Twitter = require('twitter');
const Spotify = require('node-spotify-api');
const fs = require('fs');

// store the user inputted arguments (undefined is stored if user did not input anything)
var command = process.argv[2];
var search_param = process.argv[3];

// makes the API call based on user inputted arguments!
makeAPICalls(command,search_param);

// function that makes API calls based on a command and an API search parameter
function makeAPICalls(command,search_param) {
	switch (command) {

		case 'my-tweets':
			var twitterKeys = require('./keys.js').twitter;
			var client = new Twitter(twitterKeys);
			// make GET request to Twitter API to get created date and tweets list
			client.get('statuses/user_timeline',{count:20},function(error,data) {
				if (error) throw error;
				data.forEach(function(tweet) {
					console.log(tweet.created_at);
					console.log(tweet.text);
					console.log('-------');
				})
			})
			// Note: Fewer than 20 tweets will be returned if the user has < 20 tweets total
			break;

		case 'spotify-this-song':
			var spotifyKeys = require('./keys.js').spotify;
			var client = new Spotify(spotifyKeys);
			// if user did not input a song, ask user to enter a song and quit the program
			if (!search_param) {
				console.log('Please enter a song to search for!');
				break;
			}
			// make request to Spotify Search API to get artist, album, song name, and preview info
			client.search({type:'track', limit:1, query:search_param},function(error,data) {
				if (error) throw error;
				console.log("Artist: ",data.tracks.items[0].album.artists[0].name);
				console.log("Album: ",data.tracks.items[0].album.name)
				console.log("Song Name: ",data.tracks.items[0].name);
				console.log("Preview Link: ",data.tracks.items[0].preview_url);
			})
			break;

		case 'movie-this':
			var APIkey = '5f6f94c9';
			var movie_title;
			// if user did not input a movie, default to searching for Mr. Nobody
			if (!search_param) {
				search_param = 'Mr. Nobody';
			}
			// make GET request to OMDB API for movie info
			var queryURL = 'http://www.omdbapi.com/?apikey=' + APIkey +
				'&t=' + search_param;
			request.get(queryURL,function(error,response,body) {
				if (error) throw error;
				var data = JSON.parse(body);
				console.log("Title: ",data.Title);
				console.log("Year Released: ",data.Year);
				console.log("IMDB Rating: ",data.Ratings[0].Value);
				console.log("Rotten Tomatoes Rating: ",data.Ratings[1].Value);
				console.log("Produced in: ",data.Country);
				console.log("Language: ",data.Language);
				console.log("Plot: ",data.Plot);
				console.log("Actors: ",data.Actors);
			});
			break;

		case 'do-what-it-says':
			// read contents of random.text
			fs.readFile('random.txt','utf8',(err,data) => {
				if (err) throw err;
				// store the command and search parameter contained in random.txt
				var command = data.split(',')[0];
				var param = data.split(',')[1];
				// make recursive call
				makeAPICalls(command,param);
			})
			break;
			
		default:
			console.log('Please enter valid inputs!');
	}
}