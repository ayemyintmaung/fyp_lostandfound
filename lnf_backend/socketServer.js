var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
let bodyParser = require('body-parser');
var logger = require('morgan');
var cors = require('cors');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
/* app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}); */

app.set('port',process.env.PORT || 5000);

app.post('/', function(req, res) {
  console.log(req.body);

  res.write(
    JSON.stringify({ id: 1012, name: req.body.name, pwd: req.body.pwd })
  );
  res.end();
});

server.listen(app.get('port'), function() {
  console.log('Node app is running on port ', app.get('port'));
});

var messages = [];
var users = [];

io.on('connection', function(socket) {
  //users.push(socket.id);
  console.log('A user connected');
  socket.emit('init-chat', messages);
  socket.emit('update-users', users);

  socket.on('send-msg', function(data) {
    var newMessage = {
      text: data.message,
      user: data.user,
      date: dateFormat(new Date(), 'shortTime')
    };

    messages.push(newMessage);
    io.emit('read-msg', newMessage);
  });

  socket.on('add-user', function(user) {
    users.push({ id: socket.id, name: user });
    io.emit('update-users', users);
  });
  socket.on('disconnect', function() {
    users = users.filter(function(user) {
      return user.id != socket.id;
    });
    io.emit('update-users', users);
    console.log('A user disconnected!');
  });
});
