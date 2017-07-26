var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var getMyTweets = function() {
 
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'DRafei'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    //console.log(tweets);
	    for (var i = 0; i<tweets.length; i++) {
	    	console.log(tweets[1].created_at);
	    	console.log(' ');
	    	console.log(tweets[i].text);
	    }
	  }
	});

}

var getArtistNames = function(artist) {
	return artist.name;
}

var getMeSpotify = function(songName) {

	var spotify = new Spotify({
	  id: 'b34359e000874c96833b73c896c34f5f',
	  secret: '8d9648f23aed4df791b53bbca466058c',
	});
	 
	spotify.search({ type: 'track', query: songName }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }

		var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
			console.log(i);
			console.log('artist(s): ' + songs[i].artists.map(
				getArtistNames));
			console.log('song name: ' + songs[i].name);
			console.log('preview song: ' + songs[i].preview_url);
			console.log('album: ' + songs[i].album.name);
			console.log('---------------------------------------------------');
		}
	});
}

var getMeMovie = function (movieName) {

	request('http://www.omdbapi.com/?apikey=40e9cece&' + movieName, function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log('body:', body); // Print the HTML for the Google homepage. 

	  	if (!error && response.statusCode == 200) {

			var jsonData = JSON.parse.(body);

			console.log('Title: ' + jsonData.Title);
			console.log('Year: ' + jsonData.Year);
			console.log('Rated: ' + jsonData.Rated);
			console.log('IMDB Rating: ' + jsonData.imdbRating);
			console.log('Country: ' + jsonData.Country);
			console.log('Language: ' + jsonData.Language);
			console.log('Plot: ' + jsonData.Plot);
			console.log('Actors: ' + jsonData.Actors);
			console.log('Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
			console.log('Rotten Tomatoes URL: ' + + jsonData.tomatoURL);
		}
	});
}

var doWhatItSays = function() {
	fs.readFile('random.txt', 'utf8', function(err, data) {
		if (err) throw err;
		
		var dataArr = data.split(',');

		if (dataArr.length == 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr.length ==1){
			pick(dataArr[0]);
		}
	});
}

var pick = function(caseData, functionData) {
	switch(caseData) {
		case 'my-tweets':
			getMyTweets();
			break;
		case 'spotify-this-song':
			getMeSpotify(functionData);
			break;
		case 'movie-this':
			getMeMovie(functionData);
		case 'do-what-it-says':
			doWhatItSays();
			break;
		default:
		console.log('LIRI does not know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);




