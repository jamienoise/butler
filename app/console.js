//Console input and response module for Butler, 11/13/16

const readline = require('readline');
const commands = require('./commands.js');

//Create a basic interface in the console window
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
	prompt: '>'
});

//Pass any input from the interface to the command/input handler
rl.on('line', (input) => {
	commands.checkInput(input);    //Public function from commands module
})