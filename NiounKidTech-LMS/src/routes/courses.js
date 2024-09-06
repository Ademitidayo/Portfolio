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
router.post('/', (req, res) => {
    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).send('Title and description are required.');
    }

    const newCourse = {
        id: courses.length + 1,
        title,
        description
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// PUT: Update an existing course
router.put('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(c => c.id === courseId);

    if (!course) return res.status(404).send('Course not found.');

    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).send('Title and description are required.');
    }

    // Update course details
    course.title = title;
    course.description = description;

    res.json(course);
});
router.delete('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }

    // Remove the course from the array
    courses.splice(courseIndex, 1);
    res.status(204).send(); // No content
});
module.exports = router;
