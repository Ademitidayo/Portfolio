const express = require('express');
const router = express.Router();
const checkRole = require('../middleware/checkRole');  // Role-checking middleware

// Mock data for courses (replace with actual data or database queries)
let courses = [
    { id: 1, title: 'JavaScript Basics', description: 'Learn the basics of JavaScript.' },
    { id: 2, title: 'HTML & CSS', description: 'Learn how to build websites using HTML and CSS.' },
];

// GET all courses (accessible to all users)
router.get('/', (req, res) => {
    res.json(courses);
});

// GET a course by ID (accessible to all users)
router.get('/:id', (req, res) => {
    const courseId = parseInt(req.params.id);

    // Validate ID
    if (isNaN(courseId)) {
        return res.status(400).send('Invalid course ID.');
    }

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send('Course not found.');
    }

    res.json(course);
});

// POST: Create a new course (restricted to Admin and Teacher roles)
router.post('/', checkRole(['admin', 'teacher']), (req, res) => {
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

    // Add new course to the list
    courses.push(newCourse);

    res.status(201).json(newCourse);  // Return the newly created course
});

// PUT: Update an existing course (restricted to Admin and Teacher roles)
router.put('/:id', checkRole(['admin', 'teacher']), (req, res) => {
    const courseId = parseInt(req.params.id);

    // Validate ID
    if (isNaN(courseId)) {
        return res.status(400).send('Invalid course ID.');
    }

    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return res.status(404).send('Course not found.');
    }

    const { title, description } = req.body;

    // Validate input
    if (!title || !description) {
        return res.status(400).send('Title and description are required.');
    }

    // Update course details
    course.title = title;
    course.description = description;

    res.json(course);  // Return the updated course
});

// DELETE: Remove a course by ID (restricted to Admin role only)
router.delete('/:id', checkRole(['admin']), (req, res) => {
    const courseId = parseInt(req.params.id);

    // Validate ID
    if (isNaN(courseId)) {
        return res.status(400).send('Invalid course ID.');
    }

    const courseIndex = courses.findIndex(c => c.id === courseId);

    if (courseIndex === -1) {
        return res.status(404).send('Course not found');
    }

    // Remove the course from the list
    courses = courses.filter(c => c.id !== courseId);

    res.status(204).send();  // Send no content response
});

module.exports = router;
