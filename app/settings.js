//Settings file for Butler 1.0 11/13/16

var exports = module.exports = {};

//This sets the port the server will use
exports.port = 3000;

//This sets the message of the day
exports.motd = "I'm sorry I've doomed us to a lingering death, Sandy.";

//This sets the greeting chat users receive
exports.greeting = "Butler has connected";

//Database configuration file
exports.dbConfig = {
	user: 'butler',
	database: 'postgres',
	password: 'butler',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000
};