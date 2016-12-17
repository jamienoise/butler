//Main server script for Butler 1.0 by JAttwood 11/12/16

//Backed up to server.stable 12/12/16 before abandonment of cookies and implementation of JWT authentication

const settings = require('./settings.js');
const commands = require('./commands.js');
const cookies = require('./cookies.js');
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
console.log('Butler is starting...');
app.use(express.static('public'));
var loginState = 1;                     //Default value for testing purposes. 0 - send login page; 1 - send home page.


//Base path handler - checks for login state and serves either login page or homepage.
app.get('/', function (req, res) {
	//var pid = cookies.checkCookie(req);         //This section commented out to sidestep cookie auth
	//if (pid !== undefined) {
	//	  loginState = 1; }
	//else {loginState = 0;
	//}
	switch (loginState) {    
	case 1:
		console.log('Homepage served @ path ' + req.url);
		res.setHeader('Content-type', 'text/html; charset=utf-8');   //You can -definitely- believe everything you read on the internet.
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
	//database.addUser('guy', 'thing');                        //yeah, it fucking works
})

//listen for socket connections
io.on('connection', function (socket) { 
	//console.log('io connection received');        //Cleaning up console log. todo: integrate log level logic
	//todo: add user to active user list
	socket.on('disconnect', function(){
    //todo: remove user from active user list
  });
        socket.emit('message', { message: greeting + '\n' + motd + '\n'});  //todo: pull recent messages from db
        socket.on('send', function (data) {
        	//Handler for messages coming in
            var newMessage = (data.message);
            var message = commands.checkInput(newMessage);
            if (message !== undefined) {					   		//Only messages or commands which return values post.
                io.sockets.emit('message', {message: message + '\n'});
            }
        })
        socket.on('login', function (data) {
        	//Handle input from login page
        	var userName = data.username;
        	var password = data.password;
        	console.log('login received: ' + userName);
        	var userPID = database.loginUser(userName, password);
        	if (userPID !== undefined) { 
        		console.log('User found - PID ' + userPID)
        		cookies.writeCookie(userPID);
        	}
        	else {console.log('User not found')}
        })
        socket.on('register', function (data) {
        	//Handle input from registration page
        	console.log('Registration request received');
        	database.addUser(data.username, data.password);
        	//todo:pull user id out of database with the username just given, assign it to client through a cookie
        })
})