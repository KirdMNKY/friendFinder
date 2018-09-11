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

//var friends = require("./app/data/friends.js");
// Sample list of folks to be matched
var friends = [
    {
        name: "John",
        photo: "https://media.licdn.com/dms/image/C4E03AQHO4h1ur4tShg/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=b-IprADe8b--J2BYpjAjocCuZ8Fc8ra3Nksd4n6Ar2s",
        scores: [ 
            5, 1, 5, 3, 4, 2, 1, 1, 5, 4
        ]
    },
    {
        name: "Sean",
        photo: "https://media.licdn.com/dms/image/C5603AQEGE3OvLRNYgQ/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=kQ3dSAdQKNhIsgCTkbRNvINUTs2kASgUy__YqQ5RXuU",
        scores: [ 
            2, 4, 3, 3, 2, 1, 5, 3, 1, 3
        ]
    },
    {
        name: "Nanette",
        photo: "https://media.licdn.com/dms/image/C4E03AQH79M-CUsYTrQ/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=V3Fvm03Cw3GNlfBVZXlJ7l7kffzibqYvmedcPiu27CU",
        scores: [ 
            2, 1, 2, 1, 2, 2, 1, 1, 3, 2
        ]
    },
    {
        name: "Mike",
        photo: "https://media.licdn.com/dms/image/C4E03AQGZ2rVWMIAk4Q/profile-displayphoto-shrink_200_200/0?e=1541030400&v=beta&t=Oiv661fbu9ySI_QX7Ko31T-Rsf7C7p_gHvJw2dNBQ7o",
        scores: [ 
            5, 4, 5, 4, 4, 5, 4, 4, 5, 5
        ]
    },
    {
        name: "Eric",
        photo: "https://media.licdn.com/dms/image/C5603AQFpHDF6LA349A/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=h2RQeZWt9iSUtp6INvy2fmFaEfEy26C0xerswkyhtws",
        scores: [ 
            3, 3, 3, 3, 3, 3, 3, 3, 3, 3
        ]
    },
    {
        name: "Erik",
        photo: "https://media.licdn.com/dms/image/C5603AQGzxfMGN3A0XQ/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=0hjsd43Im_yq74cjePtFRDwqYl-slMNFFpXgD9nfCVk",
        scores: [ 
            5, 4, 3, 3, 2, 3, 4, 4, 3, 1
        ]
    },
    {
        name: "James",
        photo: "https://media.licdn.com/dms/image/C4E03AQEwKctLoig4IQ/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=kCB5LYtqRvpEx5MpLdSDhyIMNOS8XjsQOtD6v0x61UA",
        scores: [ 
            5, 4, 5, 4, 4, 4, 4, 4, 5, 4
        ]
    },
    {
        name: "Melissa",
        photo: "https://media.licdn.com/dms/image/C4E03AQEPbtvyo4H97Q/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=kRK2MEw5uINgiBl_z1ZI6x-F8z0Md5IIEK_8ZHBAKA0",
        scores: [ 
            3, 1, 3, 3, 4, 3, 4, 3, 3, 4
        ]
    },
    {
        name: "Carmen",
        photo: "https://media.licdn.com/dms/image/C4E03AQEeYh7GoMin7w/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=2YWoN8t0ez1S56sevz-XrGqb-3QDP5w5MlAFg4Mi4F0",
        scores: [ 
            5, 4, 5, 4, 4, 5, 5, 4, 4, 5
        ]
    },
    {
        name: "Richard",
        photo: "https://media.licdn.com/dms/image/C4E03AQEgbo2WLdAbjw/profile-displayphoto-shrink_800_800/0?e=1541030400&v=beta&t=ieA1HaIyiqPsCw4kqr_MhVYIOX5rUoh78RC8fes0fe8",
        scores: [ 
            4, 3, 4, 2, 1, 3, 3, 4, 2, 4
        ]
    }

]
// Collect Info
app.post("/api/friends", function(req,res){
    console.log("button clicked");
    var friend = req.body;
    console.log(friend.scores);
    // Compare user score with friends
    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    // Check all current friends
    for(var i=0; i<friend.length; i++){
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


// Activate localhost server
app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});


