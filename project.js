var mongoose = require("mongoose");

var projectSchema = mongoose.Schema({
	name: {type:String, required:true},
	description: {type:String, required:true},
	_owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
	skills: [{type:String}]
})

/** Class Methods **/

/** Instance Methods **/

/* Finish */
var Project = mongoose.model("Project", projectSchema);
module.exports = Project;