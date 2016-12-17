//Main server script for Butler 1.0 by JAttwood 11/12/16 - reworked starting 12/12/16 for JWT authentication

const settings = require('./settings.js');
const commands = require('./commands.js');
const database = require('./database.js');
const routing = require('./routing.js');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
var port = settings.port;
var motd = settings.motd;
var greeting = settings.greeting;
var io = require('socket.io')(http);
var socketioJwt = require('socketio-jwt');
var jwt = require('jsonwebtoken');
console.log('Butler is starting...');
app.use(express.static('public'));
var loginState = 1;                     //Default value for testing purposes. 0 - send login page; 1 - send home page.


//This is the new login handler using POST. We are not quite sure how this functions yet.
app.post('/login', function (req, res) {
//Set up a generic user profile...we'll see how this goes
	var profile = {
		name: 'Guy',
		level: 1,
		id: 0
	};

	var token = jwt.sign(profile, jwtSecret, { expiresInMinutes: 60*5 });  //Do I need to define jwtSecret somewhere? What does it need to be?

	res.json({token: token});
})

//More new magic, copied in its entirety in the interest of battery life
io.set('authorization', socketioJwt.authorize({
  secret: jwtSecret,
  handshake: true
}));

//Base path handler - checks for login state and serves either login page or homepage.
app.get('/', function (req, res) {
	switch (loginState) {    
	case 1:
		console.log('Homepage served @ path ' + req.url);
		res.setHeader('Content-type', 'text/html; charset=utf-8');
		res.write(routing.homepage);
		res.end();
		break;
	case 0:
		res.setHeader('Content-type', 'text/html; charset=utf-8');
		res.write(routing.login);
		console.log('Login page served @ path ' + req.url);
		res.end();
}
})

//This seperate function serves the registration page
app.get('/register', function (req, res) {
	res.setHeader('Content-type', 'text/html; charset=utf-8');
	res.write(routing.register);
	console.log('Registration page served @ path ' + req.url)
	res.end()
})

//Listen for http connections
http.listen(port, function () {
	console.log('*---' + motd +'---*');
	console.log('Butler is accepting connections @' + port);
})

//Beginning of sockets.on - get handshake functionality working and incorporate old functions back in as possible
io.sockets.on('connection', function (socket) {
     console.log(socket.handshake.decoded_token.name, 'connected');
     //socket.on('event');
  });