var router 	= require('express').Router();
var nodemailer = require('nodemailer');
var multer  = require('multer');
var upload  = multer();
var msg     = require('../models/message');


// Routes
router.post('/saveMsg', upload.any(), function(req, res){

	var from    = req.body.email_message; 
	var message = req.body.message;

	console.log(req.body);
	// console.log(res.status);
	// console.log(res);

	// if(res.status === 400){
	// 	console.log(400);
	// 	return res.send({message: "Bad Request"});
	// }

	// if(res.status === 401){
	// 	console.log(401);
	// 	return res.send({message:"unauthorized"});
	// }
	
	// if(res.status === 403){
	// 	console.log(403);
	// 	return res.send({message:"forbidden"})
	// }

	// if( res.status === 200){

		// console.log(200);

	// res.json({msg:'message POST endpoint reached'});
		// console.log('200');

		var _message = msg({
			email: req.body.email_message,
			message: req.body.message
		});

		_message.save(function(err){
			if (err){
				res.status(400).json({err:err})
			} else {
				res.status(200).send({body: req.body})
					console.log('message saved');
			}
		});

		let transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 	 'mail.gmail.com',
			secure:  true,
			auth:    {
					user: "imajineight@gmail.com",
					pass: 'Tmgpw0418#'
			}			
		});

		let mailOptions = {
			from: 	 from,
			to:      'imajineight@gmail.com',
			pass:    "Tmgpw0418#",
			subject: "A message from Imajin.Media",
			text:    message
		};

		transporter.sendMail(mailOptions, (error,info) =>{
			if (error){
				return console.log(error);

			} else{
				console.log('message %s', info.messageId, info.response);
			}
		});



	// }	
	// console.log('endpoint reached');
});

module.exports = router;