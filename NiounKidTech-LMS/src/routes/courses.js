const express = require('express');
const router = express.Router();

// Mock data for courses (replace with your actual data or database queries)
const courses = [
    { id: 1, title: 'JavaScript Basics', description: 'Learn the basics of JavaScript.' },
    { id: 2, title: 'HTML & CSS', description: 'Learn how to build websites using HTML and CSS.' },
];

// GET all courses
router.get('/', (req, res) => {
    res.json(courses);
});

// GET a course by ID
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('Course not found');
    res.json(course);
});

module.exports = router;
