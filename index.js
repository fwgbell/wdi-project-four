const express = require('express');
const bodyParser = require('body-parser');
const router = require('./config/router');
const { port, dbURI } = require('./config/environment');
const errorHandler = require('./lib/errorHandler');
const mongoose = require('mongoose');

const app = express();

mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.json());

app.use('/api', router);

app.use(errorHandler);

app.listen(port, () => console.log(`Up and running on port ${port}`));
