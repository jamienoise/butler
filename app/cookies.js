//Cookie handler module for Butler 1.0 by JAttwood, 11/27/16

//This module checks and writes a PID to and from a user's cookie which corresponds to an entry in the database.

var exports = module.exports = {};

var cookie = require('cookie');

//This function checks the cookie value. Returns cookie value and/or nothing
exports.checkCookie = function(req) {
	var cookies = cookie.parse(req.headers.cookie || '');
	console.log('Cookie check returned PID of ' + cookies.pid);
	return cookies.pid;
}

exports.writeCookie = function(data) {
	var pid = data;
	console.log('Writing cookie; pid ' + pid);
	//Set cookie with given pid.
    res.setHeader('Set-Cookie', cookie.serialize('pid', pid, {   //Was String(data) - Since this is a number, does it have to be a string?
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week 
    }));
}