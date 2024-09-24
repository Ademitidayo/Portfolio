import React, { useState, useEffect } from 'react';
import './Studashboard.css'; // Import your CSS for styling

const StudentDashboard = () => {
  const [teachers, setTeachers] = useState([]); // State to hold the list of teachers
  const [selectedTeacher, setSelectedTeacher] = useState(''); // State to hold the selected teacher

  useEffect(() => {
    // Simulate an API call to fetch teachers
    const fetchTeachers = async () => {
      const response = await fetch('http://localhost:5000/api/teachers'); // Replace with your actual API endpoint
      const data = await response.json();
      setTeachers(data.teachers); // Assuming the API returns an object with a 'teachers' array
    };

    fetchTeachers();
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Your Student Dashboard</h1>
      </header>

      <div className="dashboard-container">
        <aside className="sidebar">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/assignments">Assignments</a></li>
            <li><a href="/grades">Grades</a></li>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </aside>

        <main className="dashboard-main">
          <div className="teacher-selection">
            <h2>Select Your Teacher</h2>
            <select 
              value={selectedTeacher} 
              onChange={(e) => setSelectedTeacher(e.target.value)}
              required
            >
              <option value="" disabled>Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div className="dashboard-overview">
            <h2>Overview</h2>
            <div className="cards">
              {/* Example cards for upcoming assignments and course progress */}
              <div className="card">
                <h3>Upcoming Assignments</h3>
                {/* List of assignments */}
              </div>
              <div className="card">
                <h3>Your Courses</h3>
                {/* List of courses */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;