var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var ioCtr = require('./controllers/io')(io);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
    res.render('home')
});

http.listen(app.get('port'), function(){
    console.log('listening on %s', app.get('port'));
});