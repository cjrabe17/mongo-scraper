var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");

var PORT = process.env.PORT || 3000;

var app = express();

var routes = require("./routes");

app.use(express.static("public"));

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.listen(PORT, function() {
    console.log("Listening on port: " + PORT);
});