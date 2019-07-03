const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const http = require('http');
const express = require('express');
const app = express();
app.use(express.static('./public/uploads'));

const cors = require('cors');
app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());

const login = require('./router/login');
app.use('/', login);

const registration = require('./router/registrations');
app.use('/create', registration);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
})

app.listen(3000, () => {
  console.log('server started');
})
