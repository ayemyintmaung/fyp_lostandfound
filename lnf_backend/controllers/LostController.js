const LostModel = require("../models/LostModel");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", true);

const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const jwt = require("jsonwebtoken");


// var uploads =require('../helpers/fileUpload')
// const app = express();
/**
*Get all items
*/
exports.AllItems = [
	async function(req, res) {
		try {
			let params = {};
			LostModel.find(params, function(err, items) {
				if (err) {
					return res.status(500).json(err);
				}
				return res.status(200).json(items);
			});
		} catch (err) {
			//throw error in json response with status 500.
			return res.status(500).json(err);
		}
	}
];

/**
*Post Item
*/

module.exports.PostItem = [
	// Validate fields.
	body("category")
		.isLength({ min: 1 })
		.trim()
		.withMessage("Category must be specified."),

	body("date")
		.isLength({min:6})
		.trim()
		.withMessage("Date must be a valid one."),

	body("description"),
	body("region"),
	body("image"),

	// Sanitize fields.
	sanitizeBody("category").escape(),
	sanitizeBody("description").escape(),
	sanitizeBody("region").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req.body);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return res.status(400).json(errors);
			} else {
				var item = new LostModel({
								category: req.body.category,
								date: req.body.date,
								name: req.body.name,
								email: req.body.email,
								image:req.body.image,
								region:req.body.region,
								description:req.body.description,
								phone:req.body.phone
							});
							// Save item.
							item.save(function(err) {
								if (err) {
									return res.status(500).json(err);
								}
								return res.status(200).json("Lost item posted successfully.");
							});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return res.status(500).json(err);
		}
	}
];

/**
*Remove Item
*@param {String} 
 */

exports.RemoveItem = [
	function(req, res) {
		try {
			LostModel.findById(req.params.id, function(err, request) {
				if (request === null) {
					return res.status(404).json(err);
				}
				LostModel.findByIdAndRemove(req.params.id, function(err) {
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
 * update item
 * @param {String} id
 * @param {Object}
 */
exports.UpdateItem = [
	async function(req, res) {
		try {
			LostModel.findById(req.params.id, function(err, founded) {
				if (founded === null) {
					return res.status(404).json(err);
				}
				LostModel.findOne({ user_id: req.body.user_id }, function(err, found) {
					console.log(found);
					if (founded.user_id !== req.body.user_id) {
						return res.status(409).json("No such user_id is existed.");
					}
					
					LostModel.findByIdAndUpdate(
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
