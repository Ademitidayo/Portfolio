const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const is_approved = role === 'student';  // Only students are auto-approved
        
        const newUser = new User({ username, password: hashedPassword, role, is_approved });
        await newUser.save();

    res.status(201).json({ message: 'User signed up successfully. Awaiting approval if admin/teacher.' });
    } catch (error) {
        res.status(400).json({ message: 'Error signing up user: ' + error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    
    if (!user) return res.status(400).send('Invalid username or password.');
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Invalid username or password.');

    if (!user.is_approved) return res.status(403).send('User awaiting approval.');

    res.status(200).send(`Welcome ${user.username}!`);
});

// Approve users route (Only admins)
router.post('/approve_user/:id', async (req, res) => {
    const admin = req.user;

    if (admin.role !== 'admin') {
        return res.status(403).send('Only admins can approve users.');
    }

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send('User not found.');

        user.is_approved = true;
        await user.save();

        res.status(200).send(`User ${user.username} approved.`);
    } catch (error) {
        res.status(400).send('Error approving user: ' + error.message);
    }
});

module.exports = router;