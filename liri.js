// require("dotenv").config();

var keys = require("./keys.js");

console.log(keys);

// console.log(keys + "." + twitterKey);

console.log("hello world");

// console.log("Twitter: " + keys.twitter);
// console.log("Spotify: " + keys.spotify);

// exports.twitter

for (var key in keys) {

    console.log("Key1 is: " + keys[key]);

    // for (var key2 in key) {
    //     // for (var key1 in key2) {

    //     // console.log(key2);

    //     console.log("key2: " + key + " " + key2);

    //     console.log("Key2 is: " + key[key2]);
    //     console.log(key + ": " + key2 + "[" + key2 + "]");
    //     console.log("yep!!!");

    // };

};

// console.log("-----------------");
// console.log("spotify");
// console.log("-----------------");
// console.log(spotify);
// console.log("-----------------");

// console.log("-----------------");
// console.log("twitter");
// console.log("-----------------");
// console.log(twitter);
// console.log("-----------------");
