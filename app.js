var express = require('express');
var compress = require('compression');

var app = express();
var oneDay = 86400000; // miliseconds

// GZip compress static content
app.use(compress());

// Static file server on public
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

// Custom 404 handler
app.use(function(req, res) {
	res.status(404);
	res.sendfile(__dirname + "/public/404.html");
});

// Fire it up!
app.listen(process.env.PORT || 3000);
