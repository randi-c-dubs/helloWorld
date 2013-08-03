var express = require('express');
var mongoose = require("mongoose");
var User = require('./user');

/* Initialize */
// Express & Nunjucks
var app = express();
app.use(express.bodyParser());

// Mongo
mongoose.connect("mongodb://localhost/caliban");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function callback() {
	// Start
	var port = 3000;
	app.listen(port);
	console.log("Started helloWorld on port " + port);
})

/* Routes */

app.get("/api/signUp", function(req, res) {
	User.signUp(req, res);
});