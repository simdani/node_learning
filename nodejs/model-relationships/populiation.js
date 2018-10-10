const mongoose = require('mongoose');

mongoose.connect('mongodb://testas:testas1@ds247310.mlab.com:47310/node-api-testas')
  .then(() => console.log('Connected to Mongodb...'))
  .catch(err => console.error('Could not connect to Mongodb...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }
}));

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website
  });

  const result = await author.save();
  console.log(result);
};

async function createCourse(name, author) {
  const course = new Course({
    name,
    author
  });

  const result = await course.save();
  console.log(result);
};

async function listCourses() {
  const courses = await Course
    .find()
    .select('name');

  console.log(courses);
};

// createAuthor('test', 'my bio', 'my website');
