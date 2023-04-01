// var importData = require('./seeder');
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiResponse = require("./helpers/apiResponse");
var cors = require("cors");
const multer = require('multer');
const bodyParser = require('body-parser');

// var session = require('express-session')/**/

// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
console.log(typeof(MONGODB_URL)+" "+MONGODB_URL);
mongoose
	.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		//don't show the log when it is test
		if (process.env.NODE_ENV !== "test") {
			console.log("Connected to %s", MONGODB_URL);
			console.log("App is running ... \n");
			console.log("Press CTRL + C to stop the process. \n");
		}
	})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
mongoose.connection;

// importData();
var app = express();

//don't show the log when it is test
if (process.env.NODE_ENV !== "test") {
	app.use(logger("dev"));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/',express.static(path.join(__dirname, "public")));



app.use(bodyParser.urlencoded({
    extended: true
}));
const uploads = multer({
    storage: storage
})

//To allow cross-origin requests
app.use(cors());

app.post('/api/image/upload', uploads.single('image'), (req, res) => {
	console.log(req.file.path);
	res.send(req.file.path);
})

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);


// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if (err.name == "UnauthorizedError") {
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

module.exports = app;
