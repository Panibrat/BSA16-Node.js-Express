var express = require("express");
var bodyPareser = require("body-parser");

var app = express();
var server  = app.listen(5555);
var staticDir = __dirname + "/public/";

app.use(bodyPareser.json());
app.use(bodyPareser.urlencoded());

app.get('/', function (req, res) {
    res.sendfile(staticDir + 'index.html');
})