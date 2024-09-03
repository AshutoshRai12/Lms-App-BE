const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        minlength: 4
    },
    courseDuration: {
        type: Number,
        required: true
    },
    courseDescription: {
        type: String,
        required: true,
        minlength: 100
    },
    technology: {
        type: String,
        required: true
    },
    launchURL: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Course', CourseSchema);
