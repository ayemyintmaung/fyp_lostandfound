var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
	{
		name:{type:String, require:true},
		email:{type:String, require:true},
		password:{type:String, require:true},
	},
	{
		timestamps:true
	}
);

module.exports = mongoose.model("user", UserSchema);