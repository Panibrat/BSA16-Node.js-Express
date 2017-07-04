var express = require("express");
var bodyPareser = require("body-parser");

var app = express();
var server  = app.listen(5555);
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