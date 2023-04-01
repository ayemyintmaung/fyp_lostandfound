#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('../app');
var debug = require('debug')('rest-api-nodejs-mongodb:server');
var http = require('http');
var cors = require('cors');
var fs = require('fs');

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(process.env.PORT || '8081');
app.set('port', port);

// CORS middleware
app.use(cors());

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
console.log(`API Server running on port ${port}`);

/**
 * Event listener for HTTP server "listening" event.
 */
 function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	console.log('Listening on ' + bind);
  }
  
/**
 * Normalize a port into a number, string, or false.
 */

 function normalizePort(val) {
	var port = parseInt(val, 10);
  
	if (isNaN(port)) {
	  // named pipe
	  return val;
	}
  
	if (port >= 0) {
	  // port number
	  return port;
	}
  
	return false;
  }
  
  /**
   * Event listener for HTTP server "error" event.
   */
  
  function onError(error) {
	if (error.syscall !== 'listen') {
	  throw error;
	}
  
	var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
	// handle specific listen errors with friendly messages
	switch (error.code) {
	  case 'EACCES':
		console.error(bind + ' requires elevated privileges');
		process.exit(1);
		break;
	  case 'EADDRINUSE':
		console.error(bind + ' is already in use');
		process.exit(1);
		break;
	  default:
		throw error;
	}
  }




  
// socket server
const socketServer = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
});

const io = socketServer.listen(process.env.SOCKET_PORT);
console.log(`Socket server running on port ${process.env.SOCKET_PORT}`);

// Assign socket object to every request
app.use(function(req, res, next) {
  req.io = io;
  next();
});

// file upload

// var storage = multer.diskStorage({
// 	destination: function (req, file, callback) {
// 	fs.mkdir('./uploads', function(err) {
// 		if(err) {
// 			console.log(err.stack)
// 		} else {
// 			callback(null, './uploads');
// 		}
// 	})
// 	},
// 	filename: function (req, file, callback) {
// 		callback(null, file.fieldname + '-' + Date.now());
// 	}
// });

// app.post('/api/file', function(req,res){
// 	var upload = multer({ storage : storage}).single('userFile');

// 	upload(req,res,function(err) {
// 		if(err) {
// 			return res.end("Error uploading file.");
// 		}
// 		res.end("File is uploaded");
// 	});
// });