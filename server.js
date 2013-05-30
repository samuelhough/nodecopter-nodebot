var Arduino = require('./arduino');

var arduino = new Arduino;

arduino.on('nodebot', function(msg) {
  return console.log("msg", msg);
});

arduino.start();

// - Dependencies
var express = require('express'),
    hbs     = require('hbs'),
    path    = require('path'),
    util    = require('util'),
    app     = express(),
    port    = 3030

// - Server Settings

app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

app.use(express.static(__dirname + '/public'));

app.use(express.favicon());
app.use(express.logger('dev'));

app.use(express.query());
app.use(express.bodyParser());
app.use(express.cookieParser("whateveryouwantmetobe"));
app.use(express.methodOverride());

app.use(express.session());

// app.use(app.router);

app.get('*', function(req, res) {

  res.render('index', {
    layout: false
  });
});

// - Start Up Server

app.listen(port);

util.log("Express server instance listening on port " + port);
