//Database script interfacing with PGSQL for Butler 1.0 by JAttwood, 11/30/16

var exports = module.exports = {};

const settings = require('./settings.js');

const pg = require('pg');
var config = settings.dbConfig;
var pool = new pg.Pool(config);          //This creates a client pool. This is what we want.


//This function checks the database for a given username. If it finds that username, it then matches the password. If it is correct, it returns a PID
exports.loginUser = function(username, password) {
	var pid;
	console.log('Checking database for user')

	return(pid);
}

//This function queries the database for the username matching a given PID and returns the username.
exports.lookupPID = function(pid) {
	var username;

	return(username);
}

//This function gueries the database for information on a given user. It currently returns PID - in the future it may return other DB data
exports.lookupUser = function(username) {
	//todo: figure out how to return multiple values.

}

//This function adds a user to the database, using name and password (eventually secured somehow) and assigns a PID using math/magic - returns pid
exports.addUser = function(username, password) {
	var queryName = username;
	var queryPass = password;
	var pid;
	pool.query('INSERT INTO "public"."users" (name, pass, level) VALUES ($1, $2, 1)', [queryName, queryPass], function(err, result) {
		if (err) throw err;
		//todo: query the DB for the pid of the user we just entered. This could probably just use lookupUser. If you can use an exported function?

	});
	console.log('User ' + username + ' added to database.');
	return(pid);
}

//This function deletes a user from the database by username. 
exports.deleteUser = function(username) {

	console.log('User ' + username + ' deleted from database.');
}