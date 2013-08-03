var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
	token: {type:String, unique:true},
	name: {type:String, required:true},
	email: {type:String, required:true},
	languages: [{type:String}],
	skills: [{type:String}],
	projects: [{type:mongoose.Schema.Types.ObjectId, ref:"Project"}],
	githubUrl: {type:String},
	location: {type:String, required: true},
	lat: {type:Number, required:true},
	lng: {type:Number, required:true}
})

/** Class methods **/
/* Controllers */
userSchema.statics.signUp = function(req, res) {
	var token = req.body.token;
	var name = req.body.name;
	var email = req.body.email;
	var languages = req.body.languages;
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
		if (err) res.send({result: "Error"});
		else res.send({result: "Success"})
	});
}

/* Helpers */

/** Instance methods **/

/* DB Hooks */

/* Finish */
var User = mongoose.model("User", userSchema);
module.exports = User;