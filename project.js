var mongoose = require("mongoose");
var User = require("./user.js");

var projectSchema = mongoose.Schema({
	name: {type:String, required:true},
	description: {type:String, required:true},
	_owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	skills: [{type:String}]
})

/** Class Methods **/

projectSchema.statics.newProject = function(req, res) {
	var token = req.body.token;
	var name = req.body.name;
	var descritipn = req.body.description;
	var skills = JSON.parse(req.body.skills);
	User.findOne({token: token}, function(err, user) {
		if (err || !user) res.send({result: "Error"});
		else {
			var project = new Project({
				owner: user.id,
				name: name,
				description: description,
				skills: skills
			});
			project.save(function(err, result) {
				if (err) res.send({result: "Error"});
				else res.send({result: "Success"});
			});
		}
	});
}

/** Instance Methods **/

/* Finish */
var Project = mongoose.model("Project", projectSchema);
module.exports = Project;