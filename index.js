//Express initializes 'app' to be a function handler that can be supplied to an HTTP server (line 2)
var app = require('express')();
var http = require('http').Server(app);
//initialize new instance of 'socket.io' by passing http server object
var io = require('socket.io')(http);

// We define a route handler '/' that gets called when we hit our website home.
app.set('port', (process.env.PORT || 5000));
app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html');
});

//Listen on the 'connection' event for incoming sockets, and log it to the console
io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

});


//We make the http server listen on port 3000
// http.listen(3000, function(){
// 	console.log('listening on *:3000');
// })