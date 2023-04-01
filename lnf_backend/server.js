// import module for node backend server
let http = require('http');
let express = require('express');
let bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');
let expressApp= express();
// express.set('port', process.env.PORT|| 3000);
const multer = require('multer')
const path = require('path')
const bodyParser = require('body-parser')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'public'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

expressApp.use(logger('dev'));
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.urlencoded({extended:false}));
expressApp.use(cors());
expressApp.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if ('OPTIONS' == req.method) {
	  res.sendStatus(200);
	}
	else {
	  next();
	}
});

expressApp.use(bodyParser.urlencoded({
    extended: true
}));
const uploads = multer({
    storage: storage
})

expressApp.post('/api/lost/upload', uploads.single('image'), (req, res) => {
    console.log('asd');
    console.log('uploaded:', req.file);
    res.sendFile(req.file.path);
})

let httpServer = http.createServer(expressApp);
httpServer.listen(8081);


console.log("\t==================================================");
console.log("\t The BackEnd Server of OpenmindChat Site started.");
console.log("\t==================================================");

expressApp.get("/login", function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end("GET_AAAAA");
});

expressApp.post("/login", function(req, res){
	res.write("");
	res.end();
});
