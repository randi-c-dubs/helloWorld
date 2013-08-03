var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	token: {type:String, unique:true},
	name: {type:String, required:true},
	email: {type:String, required:true},
	languages: [{type:String}],
	skills: [{type:String}],
	projects: [{type:mongoose.Schema.Types.ObjectId, ref:"Project"}],
	githubUrl: {type:String},
	locationString: {type:String, required: true},
	lat: {type:Number, required:true},
	lng: {type:Number, required:true}
})

/** Class methods **/
/* Controllers */
userSchema.statics.signUp = function(req, res) {
	var token = req.body.token;
	var name = req.body.name;
	var email = req.body.email;
	var languages = req.body.languages === "undefined" ? [] : req.body.languages;
	var lat = req.body.lat;
	var lng = req.body.lng;
	var locationString = req.body.locationString;
	var fbUrl = req.body.fbUrl;

	var user = new User({
		token: token,
		name: name,
		email: email,
		languages: languages,
		lat: lat,
		lng: lng,
		locationString: locationString,
		fbUrl: fbUrl
	});
	user.save(function(err, result) {
		if (err) res.send({result: "Error", payload: err});
		else res.send({result: "Success"});
	});
}

userSchema.statics.signIn = function(req, res) {
	var token = req.body.token;
	User.findOne({token: token}, function(err, user) {
		if (err || !user) res.send({result: "Error"});
		else {
			user.populate("projects", function(err, populatedUser) {
				if (err) res.send({result: "Error"});
				else {
					res.send({
						result: "Success",
						payload: {
							name: populatedUser.name,
							email: populatedUser.email,
							languages: populatedUser.languages,
							skills: populatedUser.skills,
							projects: populatedUser.projects,
							github: populatedUser.github,
							lat: populatedUser.lat,
							lng: populatedUser.lng,
							locationString: populatedUser.locationString,
							fbUrl: populatedUser.fbUrl
						}
					})
				}
			})
		}
	})
}

userSchema.statics.getFiltered = function(req, res) {
	var skills = typeof req.body.skills === "undefined" ? [] : req.body.skills;
	var languages = typeof req.body.languages === "undefined" ? [] : req.body.languages;
	var topLeftLat = req.body.topLeftLat == "" ? 0 : req.body.topLeftLat;
	var topLeftLng = req.body.topLeftLng == "" ? 0 : req.body.topLeftLng;
	var bottomRightLat = req.body.bottomRightLat == "" ? 0 : req.body.bottomRightLat;
	var bottomRightLng = req.body.bottomRighttLng == "" ? 0 : req.body.bottomRighttLng;

	User.find({
		skills : {$in: skills},
		languages : {$in: languages},
		lat : {$gt: bottomRightLat, $lt: topLeftLat},
		lng : {$lt: bottomRightLng, $gt: topLeftLng},
	}).populate("projects").exec(function(err, users) {
		if (err) res.send({result: "Error", payload: err});
		else res.send({result: "Success", payload: users})
	});
}

/** Instance methods **/

/* DB Hooks */

/* Finish */
var User = mongoose.model("User", userSchema);
module.exports = User;