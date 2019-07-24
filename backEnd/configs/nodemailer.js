const nodemailer = require('nodemailer');

let sendEmail = (guid, id, email) => {
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
    from: 'Lets Translate',
    to: `${email}`,
    subject: 'You have successfully registered with the Let\'s translate site!',
    text: `For confirm your account you need follow this link <a href = "${url}">Confirm account</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).json({message: error})
    } else {
      console.log(info.response)
    }
  });
};

let resetPassword = (encrypt, email) => {
  let url = `http://localhost:3000/reset-password?crypt=${encrypt}`;

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
    from: 'Lets Translate',
    to: `${email}`,
    subject: 'Reset password',
    text: `Follow this link to reset your password <a href = "${url}">Reset password</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).json({message: error})
    } else {
      console.log(info.response)
    }
  });
};

let passwordChanged = (email) => {
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
    from: 'Lets Translate',
    to: `${email}`,
    subject: 'Password update',
    text: `Your password successfully updated`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).json({message: error})
    } else {
      console.log(info.response)
    }
  });
}

module.exports = {sendEmail, resetPassword, passwordChanged};
