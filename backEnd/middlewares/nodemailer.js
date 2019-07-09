const nodemailer = require('nodemailer');

let sendEmail = (req, res, next) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		secure: false,
		port: 25,
		auth: {
			user: 'lets.translate.prod@gmail.com',
			pass: 'iTechArtLab'
		}
	});

	const mailOptions = {
		from: 'lets.translate.prod@gmail.com',
		to: 'lets.translate.prod@gmail.com',
		subject: 'You have successfully registered with the Let\'s translate site!',
		text: 'some text'
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			res.status(401).json({message: error})
		} else {
			console.log(info.response)
		}
	})

	next();
}

module.exports = {
  sendEmail
}