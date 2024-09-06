const request = require('supertest');
const express = require('express');
const coursesRoute = require('../routes/courses');

const app = express();
app.use(express.json());
app.use('/courses', coursesRoute);

describe('Courses API', () => {
    // Test GET all courses
    it('should get all courses', async () => {
        const res = await request(app).get('/courses');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Test GET course by ID
    it('should get a course by ID', async () => {
        const res = await request(app).get('/courses/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', 1);
    });

    // Test POST create a new course
    it('should create a new course', async () => {
        const newCourse = {
            title: 'React Basics',
            description: 'Learn the basics of React.'
        };
        const res = await request(app).post('/courses').send(newCourse);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('title', 'React Basics');
    });

    // Test POST validation failure
    it('should return 400 when creating a course with missing fields', async () => {
        const invalidCourse = {
            title: ''
        };
        const res = await request(app).post('/courses').send(invalidCourse);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe('Title and description are required.');
    });

    // Test PUT update an existing course
    it('should update an existing course', async () => {
        const updatedCourse = {
            title: 'Updated Course Title',
            description: 'Updated Course Description'
        };
        const res = await request(app).put('/courses/1').send(updatedCourse);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('title', 'Updated Course Title');
    });

    // Test PUT validation failure
    it('should return 400 when updating a course with missing fields', async () => {
        const invalidCourse = {
            title: ''
        };
        const res = await request(app).put('/courses/1').send(invalidCourse);
        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe('Title and description are required.');
    });

    // Test DELETE a course
    it('should delete an existing course', async () => {
        const res = await request(app).delete('/courses/1');
        expect(res.statusCode).toEqual(204);
    });

    // Test GET non-existing course
    it('should return 404 when course not found', async () => {
        const res = await request(app).get('/courses/999');
        expect(res.statusCode).toEqual(404);
        expect(res.text).toBe('Course not found');
    });
});

