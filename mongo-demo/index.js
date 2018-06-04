const mongoose = require('mongoose');

mongoose.connect('mongodb://testas:testas1@ds247310.mlab.com:47310/node-api-testas')
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.log('could not connect to mongodb...', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags:[ String ],
  date: { 
    type: Date, 
    default: Date.now
  },
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);
const course = new Course({
  name: 'Node.js course',
  author: 'Sim',
  tags: ['node', 'backend'],
  isPublished: true
});