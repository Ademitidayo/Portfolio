const express = require('express');
const app = express();
const coursesRoute = require('./routes/courses');
const userRoutes = require('./routes/userRoutes');

// Middleware to parse JSON requests
app.use(express.json());

// Use the courses route for requests to /courses
app.use('/courses', coursesRoute);
app.use('/api', userRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
