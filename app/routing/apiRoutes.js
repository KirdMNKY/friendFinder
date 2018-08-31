// // Set up all dependencies
// var express = require("express");
// var exphbs = require("express-handlebars");
// var bodyparser = require("body-parser");
// var path = require("path");

// // Instantiate the express app
// var app = express();

// Routes
// GET /api/friends to access data
app.get("/api/friends", function(req, res){
    res.sendFile(path.join(__dirname, "/app/data/friends.js"));
});


// Collect Info

// POST /api/friends to write data
 // AJAX post the data to the friends API.
 app.post("/api/friends", userData, function(data) {

    // Grab the result from the AJAX post so that the best match's name and photo are displayed.
    $("#match-name").text(data.name);
    $("#match-img").attr("src", data.photo);

    // Show the modal with the best match
    $("#results-modal").modal("toggle");

  });
