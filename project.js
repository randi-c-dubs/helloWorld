var mongoose = require("mongoose");
var User = require("./user.js");

var projectSchema = mongoose.Schema({
	name: {type:String, required:true},
	description: {type:String, required:true},
	skills: [{type:String}]
})

/** Class Methods **/

projectSchema.statics.newProject = function(req, res) {
	var token = req.body.token;
	var name = req.body.name;
	var descritipn = req.body.description;
	var skills = JSON.parse(typeof req.body.skills === "undefined" ? "[]" : req.body.skills);
	User.findOne({token: token}, function(err, user) {
		if (err || !user) res.send({result: "Error"});
		else {
			var project = new Project({
				name: name,
				description: description,
				skills: skills
			});
			project.save(function(err, result) {
				if (err) res.send({result: "Error"});
				else {
					user.update({$push: {'projects':project.id}}, function(err, user) {
						if (err) res.send({result: "Error", payload: JSON.stringify(err)});
						else res.send({result: "Success", payload: project});
					})
				}
			});
		}
	});
}

projectSchema.statics.deleteProject = function(req, res) {
	var id = typeof req.body.params === "undefined" ? "" : req.body.params;
	Project.findOneById(id, function(err, project) {
		if (err) res.send({result: "Error", payload: JSON.stringify(err)});
		else {
			project.remove(function(err, project) {
				if (err) res.send({result: "Error", payload: JSON.stringify(err)});
				else res.send({result: "Success"});
			})
		}
	})
}

/** Instance Methods **/

/* Finish */
var Project = mongoose.model("Project", projectSchema);
module.exports = Project;