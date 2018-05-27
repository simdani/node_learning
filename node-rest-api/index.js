const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const Joi = require('joi');
const logger = require('./logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // key=vaue&key=value adds payloads
app.use(express.static('public')); // use static assets (we can serve static content)
app.use(helmet);
app.use(morgan('tiny')); // for logging requests

// midleware function are called in sequence
app.use(logger);

app.use(function(req, res, next) {
  console.log('Authenticating...');
  next();
});

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
  res.send('hello world!');
});

// get all courses
app.get('/api/courses', (req, res) => {
  res.send(courses);
});

// get specifi course
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Resource not found');
  }
  res.send(course);
});

app.post('/api/courses', (req, res) => {
  const { error } = validateCourse(req.body); // eq to result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course);
});

// update the course
app.put('/api/courses/:id', (req, res) => {
  // look up the course
  // if it does not exist return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Resource not found');
  }

  const { error } = validateCourse(req.body); // eq to result.error
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  // update course
  course.name = req.body.name;
  // return the updated course
  res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
  // look up for the course
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Resource not found');
  }
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1); // remove the course
  // return same course
  res.send(course);
});

function validateCourse(course) {
  // validate the data if invalid,return 400
  const schema = {
    name: Joi.string().min(3).required()
  };

  return Joi.validate(course, schema);  
}

// port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});