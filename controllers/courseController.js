const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel.js");

// @route   GET /api/courses
// @desc    Get all courses

const getCourseList = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
});

// @route   GET /api/courses/:Name
// @desc    Get a course by Name

const getCourse = asyncHandler(async (req, res) => {
  try {
    console.log('name',req.params );
    const name = req.params.name; 
    const course = await Course.findOne({ courseName: name });
    if (!course) {
        return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(200).json(course);
} catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server error');
}
});

// @route   DELETE /api/courses/:Name
// @desc    Delete a course by Name

const deleteCourse = asyncHandler(async (req, res) => {
  try {
    const name = req.params.name; 
    const deletedCourse = await Course.findOneAndDelete({ courseName: name });
        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully', course: deletedCourse });
} catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Course not found' });
    }
    res.status(500).send('Server error');
}

});

// @route   post /api/courses/add
// @desc    Add New Course

const addCourse = asyncHandler(async (req, res) => {
  const { courseName, courseDuration, courseDescription, technology, launchURL } = req.body;
  if (!courseName || !courseDuration || !courseDescription || !technology || !launchURL) {
      return res.status(400).json({ msg: 'Please enter all fields' });
  }

  if (courseName.length < 4) {
      return res.status(400).json({ msg: 'Course Name should be at least 20 characters long' });
  }

  if (courseDescription.length < 100) {
      return res.status(400).json({ msg: 'Course Description should be at least 100 characters long' });
  }

  if (isNaN(courseDuration)) {
      return res.status(400).json({ msg: 'Course Duration should be numeric' });
  }

  try {
      const newCourse = new Course({
          courseName,
          courseDuration,
          courseDescription,
          technology,
          launchURL
      });

      await newCourse.save();
      res.status(201).json({ msg: 'Course added successfully', course: newCourse });
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

// @route   PUT /api/courses/:Name
// @desc    Update a course by Name

const updateCourse = asyncHandler(async (req, res) => {
  const { courseName, courseDuration, courseDescription, technology, launchURL } = req.body;
    // Build course object
    var courseFields = {};
    if (courseName) courseFields.courseName = courseName;
    if (courseDuration) courseFields.courseDuration = courseDuration;
    if (courseDescription) courseFields.courseDescription = courseDescription;
    if (technology) courseFields.technology = technology;
    if (launchURL) courseFields.launchURL = launchURL;
    // Validation
    if (courseName && courseName.length < 4) {
        return res.status(400).json({ msg: 'Course Name should be at least 4 characters long' });
    }

    if (courseDescription && courseDescription.length < 100) {
        return res.status(400).json({ msg: 'Course Description should be at least 100 characters long' });
    }

    if (courseDuration && isNaN(courseDuration)) {
        return res.status(400).json({ msg: 'Course Duration should be numeric' });
    }

    try {
        const name = req.params.name; 
        const courseDetails = await Course.findOne({ courseName: name });
        if (!courseDetails) {
            return res.status(404).json({ msg: 'Course not found' });
        }

        // Update course
        course = await Course.findOneAndUpdate({ courseName: name },{ $set: courseFields },{ new: true });
        res.status(200).json(course);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Course not found' });
        }
        res.status(500).send('Server error');
    }
});



module.exports = {
  addCourse,
  deleteCourse,
  getCourse,
  getCourseList,
  updateCourse
};
