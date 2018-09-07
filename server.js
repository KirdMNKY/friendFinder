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
app.use(bodyparser.json())
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


//require("./app/routes/apiRoutes.js")(app);

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

// Activate localhost server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});


