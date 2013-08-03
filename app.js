var express = require('express');
var mongoose = require("mongoose");
var User = require('./user');
var Project = require("./project.js");

/* Initialize */
// Express & Nunjucks
var app = express();
app.use(express.bodyParser());

// Mongo
mongoose.connect("mongodb://localhost/helloWorld");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function callback() {
	// Start
	var port = 3000;
	app.listen(port);
	console.log("Started helloWorld on port " + port);
})

/* Routes */

app.post("/api/signUp", function(req, res) {
	User.signUp(req, res);
});

app.post("/api/signIn", function(req, res) {
	User.signIn(req, res);
});

app.post("/api/editUser", function(req, res) {
	User.editUser(req, res);
});

app.post("/api/newProject", function(req, res) {
	Project.newProject(req, res);
});

app.post("/api/deleteProject", function(req, res) {
	Project.deleteProject
});

app.post("/api/getFiltered", function(req, res) {
	User.getFiltered(req, res);
})