var mongoose = require("mongoose");

var LostSchema = new mongoose.Schema(
	{
		name:{type:String, require:true},
		email:{type:String, require:true},
		region:{type:String, require:true},
		category:{type:String, require:true},
		description:{type:String, require:true},
		date:{type:Date, require:true},
		phone:{type:String},
		image: {type:String}
	},
	{
		timestamps:true
	}
);

module.exports = mongoose.model("lost_item", LostSchema);