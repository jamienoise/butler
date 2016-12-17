//Routing functions for Butler 1.0 by JAttwood, 11/26/16

//This simply loads the various HTML files for express to serve. In the future it may handle more complex routing tasks.
//Fucking restored as of 12/12

var fs = require('fs');
var exports = module.exports = {};

//Load main homepage to exported variable
fs.readFile('./web/index.html', 'utf8', function(err, data) {
	if (err) throw err;
	exports.homepage = data;
	console.log('Homepage loaded from /web/index.html');
})

//Load login page to exported variable
fs.readFile('./web/login.html', 'utf8', function(err, data) {
	if (err) throw err;
	exports.login = data;
	console.log('Login page loaded from /web/login.html')
})

//Load registration page to exported variable
fs.readFile('./web/register.html', 'utf8', function(err, data) {
	if (err) throw err;
	exports.register = data;
	console.log('Registration page loaded from /web/register.html')
})