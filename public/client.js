//Client-side script for Butler 1.0 by JAttwood 11/15/16

var socket = io(); 
var outputBox = document.getElementById("output");
var sendButton = document.getElementById("send");
var input = document.getElementById("inputBox");

//Handle server output and add it to the page log by line. todo: pull recent chat messages to populate page log on load
socket.on('message', function(data){
    if(data.message) {
        var newMessage = (data.message);
        var currentLog = outputBox.innerHTML;
        outputBox.innerHTML = currentLog + newMessage;
        outputBox.scrollTop = outputBox.scrollHeight;
    }
})

//This transmits user input to the server
sendButton.onclick = function() {
    event.preventDefault();
    if (input.value !="") {
        socket.emit('send', {message: input.value});  
        input.value = "";
    }
}

