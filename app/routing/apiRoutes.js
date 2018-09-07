// // Set up all dependencies
// var express = require("express");
// var exphbs = require("express-handlebars");
// var bodyparser = require("body-parser");
// var path = require("path");

// // Instantiate the express app
// var app = express();

module.exports = function(app){

// Routes
// GET /api/friends to access data
app.get("/api/friends", function(req, res){
    res.sendFile(path.join(__dirname, "/app/data/friends.js"));
});


// Collect Info


require("./app/routes/apiRoutes.js")(app);

var friends = require("./app/data/friends.js");
// Collect Info
app.post("/api/friends", function(req,res){
    console.log("button clickec");
    res.json(req.body);
    var friend = req.body;
    console.log(friend.scores);
    // Compare user score with friends
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    // Check all current friends
    for(var i=0; i<friends.length; i++){
      var scoresDiff = 0;
      // Compare scores
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      // Add results
      scoresArray.push(scoresDiff);
    }

    // Look for best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bff = friends[bestMatch];
    res.json(bff);

    //pushes new submission into the friendsList array
    friends.push(req.body);
  });
}