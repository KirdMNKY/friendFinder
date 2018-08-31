// Set up all dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyparser = require("body-parser");
var path = require("path");

// Instantiate the express app
var app = express();

// Create Routes
// GET Routes
// /survey
app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});
// Default catch-all

app.get("/:text", function(req, res){
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});
