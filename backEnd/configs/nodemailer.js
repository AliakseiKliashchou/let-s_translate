const nodemailer = require('nodemailer');

let sendEmail = (guid, id) => {
  let url = `http://localhost:3000/confirm?code=${guid}&id=${id}`;
  console.log(url);
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
    text: `For confirm your account you need follow this link ${url}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).json({message: error})
    } else {
      console.log(info.response)
    }
  })
};

let resetPassword = (encrypt) => {
  let url = '';
};

module.exports = {sendEmail, resetPassword};
