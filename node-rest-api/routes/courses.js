const express = require('express');
const router = express.Router();

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'}
];

// get all courses
router.get('/', (req, res) => {
  res.send(courses);
});

// get specifi course
router.get('/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Resource not found');
  }
  res.send(course);
});

router.post('/', (req, res) => {
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
router.put('/:id', (req, res) => {
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


router.delete('/:id', (req, res) => {
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

module.exports = router;