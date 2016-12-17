//Commands module for Butler 1.0 by JAttwood 11/13/16

//This module processes a given input and determines if it contains a command. If so it acts on that command - otherwise it returns the input

var exports = module.exports = {};     //this is how you export functions...this is the only way you export functions

//todo: modify checkInput to only split after the first space and pass everything else as a single argument if "" is used

//note - if checkInput returns a value, that value is relayed back to all clients - can/should that be limit-able to the person issuing the command?
exports.checkInput = function(input) {
    if (input[0] === '/') { 
        var commandArgs = input.split(' '); 
        var command = commandArgs.shift(); 
        if (command === '/time') {
            console.log(getDateTime());
            return getDateTime();
        }
        else if (command === '/command'){
            console.log('command not found');
        }
        
        else {
            console.log('Command not found - ' + command);
        }

    } else {
        sendMessage(input);
        return input;
    }
}

// /time
function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return 'Current system time is ' + year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}
// /message
function sendMessage(message) {
    //todo: save message to database and/or text log
    console.log('chat message received: ' + message);
    return message;
}

// /port
//todo: write logic to search settings file for current port, replace with desired port...this is definitely the best way to do this



// /createuser
//todo:contact server, add user with given name and password taken from arguments

// /users
//todo: integrate logic from server main function into user list command. 