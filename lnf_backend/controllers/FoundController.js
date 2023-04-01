const FoundModel = require("../models/FoundModel");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", true);

const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const jwt = require("jsonwebtoken");
/**
*Get all items
*/
exports.AllItems = [
	async function(req, res) {
		try {
			let params = {};
			
			FoundModel.find(params, function(err, items) {
				if (err) {
					return res.status(500).json(err);
				}
				console.log(items);
				return res.status(200).json(items);
			});
		} catch (err) {
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

	body("name")
		.trim(),

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
				var item = new FoundModel({
								category: req.body.category,
								date: req.body.date,
								name: req.body.name,
								email: req.body.email,
								image:req.body.image,
								region:req.body.region,
								description:req.body.description,
								phone:req.body.phone
							});
							item.save(function(err) {
								if (err) {
									return res.status(500).json(err);
								}
								return res.status(200).json("Found item posted successfully.");
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
			FoundModel.findById(req.params.id, function(err, request) {
				if (request === null) {
					return res.status(404).json(err);
				}
				FoundModel.findByIdAndRemove(req.params.id, function(err) {
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
			FoundModel.findById(req.params.id, function(err, founded) {
				if (founded === null) {
					return res.status(404).json(err);
				}
				FoundModel.findOne({ user_id: req.body.user_id }, function(err, found) {
					if (founded.user_id !== req.body.user_id) {
						return res.status(409).json("No such user_id is existed.");
					}
					
					FoundModel.findByIdAndUpdate(
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
