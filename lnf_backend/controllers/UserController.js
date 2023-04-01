const User = require("../models/UserModel");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", true);


exports.AllUser = [
	async function(req, res){
		try{
			let params = {};
			//return all live users
			if(req.query.isLive){
				params = {
					...params,
					isLive:Boolean(req.query.isLive)
				}
			}
			User.find(params, function(err, users){
				if(err){
					// throw error in json response with status 500.
					return res.status(500).json(err);
				}
				return res.status(200).json(users);
			});


		}catch(err){
			// throw error in json response with status 500.
			return res.status(500).json(err);
		}
	}
];



/**
*Remove user
*@param {String} 
*/

exports.RemoveUser = [
	function(req, res) {
		try {
			User.findById(req.params.id, function(err, request) {
				if (request === null) {
					return res.status(404).json(err);
				}
				User.findByIdAndRemove(req.params.id, function(err) {
					if (err) {
						return res.status(500).json(err);
					}
					return res.status(200).json();
				});
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	}
];


/**
 * update user
 * @param {String} id
 * @param {Object}
 */
exports.UpdateUser = [
	async function(req, res) {
		try {
			User.findById(req.params.id, function(err, founded) {
				if (founded === null) {
					return res.status(404).json(err);
				}
				User.findOne({ email: req.body.email }, function(err, found) {
					if (founded.email !== req.body.email) {
						return res.status(409).json("No such email is existed.");
					}
					
					User.findByIdAndUpdate(
						req.params.id,
						req.body,
						{ timestamps: false },
						function(err) {
							if (err) {

								return res.status(500).json();
							}
							return res.status(200).json();
						}
					);
				});
			});
		} catch (err) {
			return res.status(500).json(err);
		}
	}
];
