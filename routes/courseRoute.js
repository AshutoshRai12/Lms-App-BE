const {
  addCourse,
  deleteCourse,
  getCourse,
  getCourseList,
  updateCourse
  } = require('../controllers/courseController.js')
    const{ protect} = require("../middleware/authMiddleware.js");
    const express = require('express');
    const router = express.Router();
    
    // Add New Course 
    router.route("/courses/add").post(protect, addCourse);
    //  Get Course Details By Name
    router.route("/courses/details/:name").get(protect, getCourse);
    // Delete Course by Name 
    router.route('/courses/delete/:name').delete(protect,deleteCourse);
    // Get all  registerd Course
    router.route('/courses/getall').get(protect,getCourseList ) ;
    // Update Course Details
    router.route('/courses/update/:name').put(protect, updateCourse) ;
  
    module.exports= router;