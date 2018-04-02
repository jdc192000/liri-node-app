
require("dotenv").config();

const keyList = require('./keys');
var fs = require("fs");
var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var inquirer = require("inquirer");
var spotify = new spotify(keyList.spotify);
var client = new twitter(keyList.twitter);


inquirer
    .prompt([
        {
            type: "list",
            message: "Please choose the command to execute:",
            choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "command"
        },
    ])
    .then(function (inquirerResponse) {

        var command = inquirerResponse.command;

        switch (command) {

            case "my-tweets":
                tweets();
                break;

            case "spotify-this-song":
                spotifyThisSong();
                break;

            case "movie-this":
                movieThis();
                break;

            case "do-what-it-says":
                doWhatItsays()
                break;

            default:
                console.log("Invalid command " + command);
                break;
        };
    })


function tweets() {
    console.log(" ");
    var params = { screen_name: 'jdckucoding2018' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            if (tweets.length <= 20) {
                var numTweets = tweets.length;
            } else {
                var numTweets = 20;
            };
            for (i = 0; i < numTweets; i++) {
                var tweetInfo = tweets[i];
                console.log("text: " + tweetInfo.text);
                console.log("created_at: " + tweetInfo.created_at);
                console.log("----------------------------");
            }
        }
    });
};

function spotifyThisSong() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Song name:",
                name: "search"
            },
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.search === '') {
                search = "The Sign";
            } else {
                search = inquirerResponse.search;
            }
            // var command = inquirerResponse.command;
            console.log(search);
            spotify.search({ type: 'track', query: search}, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }

                spotifyArr = data.tracks;

                console.log('---------------------------------------');
                console.log(JSON.stringify(spotifyArr, null, 2));

                //   console.log(JSON.parse(data.tracks.items.album)); 

                // console.log(data.tracks.items.length);
                // console.log(spotifyArr.artists);
            });
        });
};

function movieThis() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Movie name:",
                name: "search"
            },
        ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.search === '') {
                search = "Mr. Nobody";
            } else {
                search = inquirerResponse.search;
            }

            var movieName = search;

            var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            request(queryUrl, function (error, response, body) {

                if (!error && response.statusCode === 200) {
                    console.log(' ');
                    console.log("Title                 : " + JSON.parse(body).Title);
                    console.log("Release Year          : " + JSON.parse(body).Year);
                    console.log("IMBD Rating           : " + JSON.parse(body).imdbRating);
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
                    console.log("Country Produced      : " + JSON.parse(body).Country);
                    console.log("Language              : " + JSON.parse(body).Language);
                    console.log("Plot                  : " + JSON.parse(body).Plot);
                    console.log("Cast                  : " + JSON.parse(body).Actors);
                    console.log(' ');
                }
            });
        });
};

function doWhatItsays() {
    console.log("yep 'do-what-it-says' is");
};