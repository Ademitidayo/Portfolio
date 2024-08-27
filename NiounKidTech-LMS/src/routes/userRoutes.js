const express = require('express');
const router = express.Router();

// Mock data for users (replace with your actual data or database queries)
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// GET all users
router.get('/users', (req, res) => {
    res.json(users);
});

// GET a user by ID
router.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found');
    res.json(user);
});

module.exports = router;
