const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const http = require('http');
const express = require('express');
const passport = require('passport');
const app = express();
app.use(express.static('./public/uploads'));

const cors = require('cors');
app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());


const userRoute = require('./router/users');
app.use('/', userRoute);

const login = require('./router/login');
app.use('/', login);

require('./auth/auth');
app.use('/user', passport.authenticate('jwt', { session: false }), userRoute);


app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
})

app.listen(3000, () => {
  console.log('server started');
})
