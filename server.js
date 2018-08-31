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

// Set up handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");





// Home Route
app.get("/", function(req, res){                        // Possibly add handlebar functionality
    res.sendFile(path.join(__dirname, "home.html"));
});


// Activate localhost server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});