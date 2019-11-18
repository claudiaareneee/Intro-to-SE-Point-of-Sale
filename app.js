var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// var socket = io();

app.use(express.static(__dirname));
// app.use(express.static(__dirname + '/bower_components'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
