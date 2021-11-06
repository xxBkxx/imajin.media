var express = require('express');
var app     = express();
var path    = require('path');
var http    = require('http');
var https   = require('https');
var fs 		= require('fs');
var message_routes = require('./routes/message.routes');

// var message 	   = require('./models/message');

app.use('/', message_routes);


// console.log(__dirname + '..\\app\\');

var mongoose = require('mongoose');

var PORT  = 3000;
app.use(express.static(__dirname + './../app', {redirect: true}));

console.log(__dirname);

// url beautification
app.use('*', function(req,res,next){
	var indexFile = path.resolve(__dirname + './../app/index.html');
	// console.log(indexFile);
	res.sendFile(indexFile);
})


var insecureConn = http.createServer(app).listen(3000);

const OPTIONS = {
	key:  fs.readFileSync('blast.key'),
	cert: fs.readFileSync('blast.crt')
};

var secureConn = https.createServer(app).listen(443);

mongoose.connect('mongodb://localhost/data/db/');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function(){
	console.log('connected to db at /data/db');
});

// app.listen(PORT, function(){
// 	console.log("server started on http:/\/localhost:8080");
// 	console.log("press ctrl + c  to stop server");
// });





// var newMessage  = Message(

// 	{
// 		email: 'bkdixxon@gmail.com',
// 		message: 'Testing 1 2 3'
// 	}

// );

// newMessage.save(function(err){

// 	if (err){

// 		console.log(err)

// 	}else{

// 		console.log('message made');

// 	}
// });