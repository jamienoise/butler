//Script for login page for Butler 1.0 by JAttwood, 12/1/16

//Something something boilerplate.

var socket = io(); 
var loginButton = document.getElementById("login");
var nameBox = document.getElementById("nameBox");
var passwordBox = document.getElementById("passwordBox");


//Submit function
loginButton.onclick = function() {
    event.preventDefault();
    if (nameBox.value !=="") {
    	//This sidesteps password hashing for now. Cleartext ftw
        socket.emit('login', {username: nameBox.value, password: passwordBox.value});  
        var t1 = window.setTimeout(function(){ window.location.href = "/"; },3000);    //Refresh / after waiting 3 seconds for the server to find user
    }
}

