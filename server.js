/*
                Michael Soto
                FriendFinder
                08/30/18

            This app will simulate 
            pairing a person with
            another with similar
            likes, dislikes, and
            tastes.

*/



// Set up all dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyparser = require("body-parser");
var path = require("path");

// Instantiate the express app
var app = express();

// Set the PORT and prep for Heroku deployment
var PORT = process.env.PORT || 8080;

app.use(express.static("app/public"));


// Home Route
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

// GET Routes
// /survey
app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});
// Default catch-all

app.get("/:text", function(req, res){
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

// Routes
// GET /api/friends to access data
app.get("/api/friends", function(req, res){
    res.sendFile(path.join(__dirname, "/app/data/friends.js"));
});


// Collect Info
app.post("/api/friends", function(req, res){
    var match = req.body
});



// Activate localhost server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});


