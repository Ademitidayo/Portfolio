const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { username, password, role, fullName, email, phone, address } = req.body;
    if (!username || !password || !fullName || !email || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Password validation: At least one number and one special character
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one number and one special character.' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userData = {
            username,
            password: hashedPassword,
            fullName,
            email,
            phone,
            address,
            role,
            isApproved: role === 'student' ? true : false // Auto-approve students
        };

        const newUser = new User(userData);
        await newUser.save();

        res.status(201).json({ message: 'User signed up successfully. Awaiting approval if admin/teacher.' });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0]; // Get the field that caused the duplicate
            return res.status(400).json({ message: `User with this ${duplicateField} already exists.` });
        }
        res.status(400).json({ message: 'Error signing up user.' + error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.status(400).json({ message: 'Invalid username or password.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid username or password.' });

    if (!user.isApproved) return res.status(403).json({ message: 'User awaiting approval.' });

    res.status(200).json({ message: `Welcome ${user.username}!` });
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

        user.isApproved = true;
        await user.save();

        res.status(200).send(`User ${user.username} approved.`);
    } catch (error) {
        res.status(400).send('Error approving user: ' + error.message);
    }
});

// Create Admin route (Only accessible to admins or directly in code)
router.post('/create-admin', async (req, res) => {
    const { username, password, fullName, email, phone, address } = req.body;

    // Ensure all fields are provided
    if (!username || !password || !fullName || !email || !phone || !address) {
        return res.status(400).json({ message: 'All fields are required to create an admin.' });
    }

    // Password validation
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Password must contain at least one number and one special character.' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const adminData = {
            username,
            password: hashedPassword,
            fullName,
            email,
            phone,
            address,
            role: 'admin', // Set the role as admin
            isApproved: true // Auto-approve the admin
        };

        const newAdmin = new User(adminData);
        await newAdmin.save();

        res.status(201).json({ message: 'Admin created successfully!' });
    } catch (error) {
        if (error.code === 11000) {
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({ message: `Admin with this ${duplicateField} already exists.` });
        }
        res.status(500).json({ message: 'Error creating admin: ' + error.message });
    }
});

module.exports = router;
