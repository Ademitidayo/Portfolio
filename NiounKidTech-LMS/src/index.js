const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const authRoutes = require('./routes/auth');  // Use new auth routes
const coursesRoute = require('./routes/courses'); // Your previous routes
const userRoutes = require('./routes/userRoutes');
const checkRole = require('./routes/checkRole');

const app = express();

// Middleware to parse JSON requests
app.use(cors()); 
app.use(express.json());

// Connect to MongoDB
mongoose.set('strictQuery', true);

// Retrieve the MongoDB URI from environment variables
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error('MONGO_URI environment variable is not defined');
  process.exit(1);  // Exit the process with an error code
}

// Connect to MongoDB
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Use the routes
app.use('/auth', authRoutes);  // Use the new routes for signup/login
app.use('/courses', coursesRoute);  // Your previous courses route

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
