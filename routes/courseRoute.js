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
    
    router.route("/courses/add").post(protect, addCourse);
    router.route("/courses/details/:name").get(protect, getCourse);
    router.route('/courses/delete/:name').delete(protect,deleteCourse);
    router.route('/courses/getall').get(protect,getCourseList ) ;
    router.route('/courses/update/:name').put(protect, updateCourse) ;
  
    module.exports= router;