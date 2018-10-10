const config = require('config');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const Joi = require('joi');
const logger = require('./middleware/logger');

// load routes
const home = require('./routes/home');
const courses = require('./routes/courses');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default view folder

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=vaue&key=value adds payloads
app.use(express.static('public')); // use static assets (we can serve static content)
app.use(helmet());

// configuration
console.log('Application name: ' + config.get('name'));
console.log('mail server: ' + config.get('mail.host'));
console.log('mail password: ' + config.get('mail.password'));


// export DEBUG=app:* // for debugging
if (app.get('env') === 'development') {
  app.use(morgan('tiny')); // for logging requests
  startupDebugger('morgan is enabled');
}

// midleware function are called in sequence
app.use(logger);

app.use(function(req, res, next) {
  console.log('Authenticating...');
  next();
});

app.use('/', home);
app.use('/api/courses', courses);

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
