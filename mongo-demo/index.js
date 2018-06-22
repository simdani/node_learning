const mongoose = require('mongoose');

mongoose.connect('mongodb://testas:testas1@ds247310.mlab.com:47310/node-api-testas')
  .then(() => console.log('Connected to MongoDb...'))
  .catch(err => console.log('could not connect to mongodb...', err));

const courseSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    enum: ['web', 'mobile', 'network'], // should be one of those values
    required: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag'
    }
  },
  date: { 
    type: Date, 
    default: Date.now
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished },
    min: 10,
    max: 200
  }
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular course',
    category: 'web',
    author: 'Sim',
    tags: [],
    isPublished: true,
    price: 15
  });

  try {
    const result = await course.save();
    console.log(result);
  }
  catch (ex) {
    console.log(ex.message);
  }
}

async function getCourses() {
  // eq(equal)
  // ne(not equal)
  // gt(greater than)
  // gte(greater then or equal to)
  // lt(less then)
  // lte
  // in
  // nin
  // or
  // and

  const courses = await Course

    // .find({ price: { $gt: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 20, 50]} })

    // .find()
    // .or([{ author: 'Simon'}, { isPublished: true}])


    // starts with sim (uing regular expressions)
    //.find({ author: /^Sim/ })

    .find({ author: 'Sim', isPublished: true})
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
    // .count(); returns count of documents
    
  console.log(courses);
}


// update course
async function updateCourseFirstApproach(id) {
  // ApproachL: query first (find by id)
  // approach2: go to database and update directly

  // first approach
  const course = await Course.findById(id)
  if (!course) return;
  // course.isPublished = true;
  // course.author = 'Another author'

  course.set({
    isPublished: true,
    author: 'Another author'
  });

  const result = await course.save();
  console.log(result);
}

async function updateCourseSecondApproach(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Sim',
      isPublished: false
    }
  });

  console.log(result);
}

// remove document
async function removeCourse(id) {
  const result = Course.deleteOne({ _id: id });
  console.log(result);
}

createCourse();
