const UserModel = require("../models/UserModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * User registration.
 *
 * @param {string}      name
 * @param {boolean}     gender
 * @param {string}      birthday
 * @param {Number}      nationality
 * @param {string}      avatar
 * @param {string}      password
 *
 * @returns {Object}
 */
module.exports.register = [
	// Validate fields.
	body("name")
		.isLength({ min: 1 })
		.trim()
		.withMessage("Username must be specified.")
		.custom(value=>{
			return UserModel.findOne({name:value}).then(user=>{
				if(user){
					return Promise.reject("The name already in use")
				}	
			})
		}),

	body("password")
		.isLength({ min: 6 })
		.trim()
		.withMessage("Password must be 6 characters or greater."),
	body("email"),

	// Sanitize fields.
	sanitizeBody("name").escape(),
	sanitizeBody("password").escape(),
	// Process request after validation and sanitization.
	(req, res) => {
		try {
			// Extract the validation errors from a request.
			const errors = validationResult(req.body);
			if (!errors.isEmpty()) {
				// Display sanitized values/errors messages.
				return res.status(400).json(errors);
			} else {
				UserModel.findOne({email:req.body.email}).then((user)=>{
					if(user){
						return  res.status(401).json("The email is already in use.");
					}else{
						//hash input password
						bcrypt.hash(req.body.password, 10, function(err, hash) {
							// Create User object with escaped and trimmed data
							var user = new UserModel({
								name: req.body.name,
								email: req.body.email,
								password: hash
							});
							// Save user.
							user.save(function(err) {
								if (err) {
									return res.status(500).json(err);
								}
								let userData = {
									_id: user._id,
									name: user.name,
									email: user.email
								};
								return res.status(200).json(userData);
							});
						});
					}
				});
			}
		} catch (err) {
			//throw error in json response with status 500.
			return res.status(500).json(err);
		}
	}
];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
	body("email")
		.isLength({ min: 1 })
		.trim()
		.withMessage("email must be specified."),

	body("password")
		.isLength({ min: 1 })
		.trim()
		.withMessage("Password must be specified."),

	sanitizeBody("email").escape(),
	sanitizeBody("password").escape(),

	(req, res) => {
		try {
			//Extract the validation errors from the request
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json(errors);
			} else {

				UserModel.findOne({ email: req.body.email }).then(user => {
					if (user) {
						//Compare given password with db's hash.
						bcrypt.compare(req.body.password, user.password, function(
							err,
							same
						) {
							if (same) {
								let userData = {
									email: user.email,
									name: user.name,
								};
								//Prepare JWT token for authentication
								const jwtPayload = userData;
								const jwtData = {
									expiresIn: process.env.JWT_TIMEOUT_DURATION
								};
								const secret = process.env.JWT_SECRET;
								//Generated JWT token with Payload and secret.
								userData.token = jwt.sign(jwtPayload, secret, jwtData);
								return res.status(200).json(userData);
							} else {
								return res.status(401).json("Email or Password wrong.");
							}
						});
					} else {
						return res.status(401).json("Email or Password wrong.");
					}
				});

			}
		} catch (err) {
			return res.status(500).json(err);
		}
	}
];
