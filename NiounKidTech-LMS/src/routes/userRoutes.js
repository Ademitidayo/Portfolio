const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Register a new user (for students and teachers)
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!['teacher', 'student'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword, role });
  
  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully. Awaiting approval.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// Admin approves teachers and students
router.post('/approve/:userId', auth, checkRole('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    
    user.isApproved = true;
    await user.save();
    
    res.status(200).json({ message: 'User approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving user.' });
  }
});

// Teacher approves students
router.post('/approve-student/:userId', auth, checkRole('teacher'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || user.role !== 'student') {
      return res.status(404).json({ message: 'Student not found.' });
    }
    
    user.isApproved = true;
    await user.save();
    
    res.status(200).json({ message: 'Student approved.' });
  } catch (error) {
    res.status(500).json({ message: 'Error approving student.' });
  }
});

module.exports = router;
