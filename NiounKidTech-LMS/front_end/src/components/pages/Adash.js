import React, { useState, useEffect } from 'react';
import './ADash.css';

function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch pending users and courses
    const fetchPendingData = async () => {
      try {
        const userResponse = await fetch('http://localhost:5000/admin/pending-users');
        const users = await userResponse.json();
        setPendingUsers(users);

        const courseResponse = await fetch('http://localhost:5000/admin/pending-courses');
        const courses = await courseResponse.json();
        setPendingCourses(courses);
      } catch (error) {
        setErrorMessage('Failed to fetch pending data.');
      }
    };

    fetchPendingData();
  }, []);

  const approveUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/approve-user/${userId}`, {
        method: 'POST',
      });

      if (response.ok) {
        setPendingUsers(pendingUsers.filter((user) => user.id !== userId));
      } else {
        setErrorMessage('Failed to approve user.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while approving the user.');
    }
  };

  const approveCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:5000/admin/approve-course/${courseId}`, {
        method: 'POST',
      });

      if (response.ok) {
        setPendingCourses(pendingCourses.filter((course) => course.id !== courseId));
      } else {
        setErrorMessage('Failed to approve course.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while approving the course.');
    }
  };

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="pending-section">
        <h3>Pending Users</h3>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => approveUser(user.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pending-section">
        <h3>Pending Courses</h3>
        <table>
          <thead>
            <tr>
              <th>Course Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingCourses.map((course) => (
              <tr key={course.id}>
                <td>{course.title}</td>
                <td>{course.description}</td>
                <td>
                  <button onClick={() => approveCourse(course.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
