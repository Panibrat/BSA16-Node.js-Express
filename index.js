var express = require("express");
var bodyPareser = require("body-parser");
var socketio = require("socket.io");

var app = express();
var server  = app.listen(5555);
var io = socketio.listen(server);

var staticDir = __dirname + "/public/";

var messages = [{name: '1st name', data: '1st msg'}];

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded({extended: false}));

app.get('/', function (req, res) {
    res.sendFile(staticDir + 'index.html');
});

app.get('/messages', function(req, res){
    res.json(messages);
});

app.post('/messages', function(req, res){
    var message = req.body;
    messages.push(message);
    res.json(messages);
});

app.get('/sockets', function(req, res){
    res.sendFile(staticDir + 'index.html');
});

io.on('connection', function (socket) {
    console.log("Client Connected ");
    socket.on('disconnected', function(){
        console.log("Client Disconnected ");
    });
    socket.on('chat message', function (msg) {
        messages.push(msg);
        io.emit('chat message', msg);
    });
    socket.emit('chat history', messages);
});