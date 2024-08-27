const courses = [
    { id: 1, name: 'Introduction to Programming' },
    { id: 2, name: 'Advanced JavaScript' },
];

// Get all courses
exports.getAllCourses = (req, res) => {
    res.status(200).json(courses);
};

// Add a new course
exports.addCourse = (req, res) => {
    const newCourse = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(newCourse);
    res.status(201).json(newCourse);
};
