const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const http = require('http');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());

const routes = require('./router/routes');
app.use('/', routes);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
})

app.listen(3000, () => {
  console.log('server started');
})
