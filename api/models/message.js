var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var messageShema = new Schema({
	email: String,
	message: String
},
	{
		timestamps:{
			createdAt:'created'
		}
});

var message = mongoose.model('message', messageShema);

module.exports = message;