import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/CR.css'; // Add styles for the registration page
import CourseCard from '../Components/CourseRegistration/CourseCard'; // Import the CourseCard component
import CourseModal from '../Components/CourseRegistration/CourseModel'; // For course details modals
import { Paper } from '@mui/material';
import Loader from '../Pages/Loding'; // Import the Loader component
import { toast, ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const CourseRegistration = () => {
  const [formData, setFormData] = useState({});
  const [studentCourses, setStudentCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [preferences, setPreferences] = useState(['', '', '', '', '']);
  const [allocationStatus, setAllocationStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [areButtonsEnabled, setAreButtonsEnabled] = useState(false); // State to track button enablement

  useEffect(() => {
    const sid = JSON.parse(localStorage.getItem('userInfo'))?.SID; // Adjust SID retrieval logic if necessary
    if (sid) {
      const fetchStudentInfo = async () => {
        try {
          const response = await axios.get(
            `${ENDPOINT}/api/user/course_registration?sid=${sid}`
          );
          const { studentInfo, courses, allocationStatus } = response.data;
          setFormData(studentInfo);
          setStudentCourses(courses);
          setAllocationStatus(allocationStatus);
        } catch (err) {
          console.error('Error fetching student info:', err);
          setError('Failed to load student info. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };

      fetchStudentInfo();
    } else {
      setError('Student ID not found. Please log in again.');
      setIsLoading(false);
    }
  }, []);

  const handleCourseClick = (course) => setSelectedCourse(course);
  const handleModalClose = () => setSelectedCourse(null);

  const handlePreferenceChange = (index, courseId) => {
    const newPreferences = [...preferences];
    newPreferences[index] = courseId;
    setPreferences(newPreferences);
    setAreButtonsEnabled(newPreferences.every((course) => course !== '')); // Enable buttons if all preferences are selected
  };

  const handleReset = () => {
    setPreferences(['', '', '', '', '']);
    setAreButtonsEnabled(false); // Disable buttons on reset
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (preferences.some((course) => course === '')) {
      toast.error('Please select all 5 preferences before submitting.');
      return;
    }

    if (window.confirm('Are you sure you want to submit the form?')) {
      try {
        const response = await axios.post(
          `${ENDPOINT}/api/user/course_registration`,
          {
            studentId: formData.sid,
            name: formData.sid,
            semester: formData.year,
            courses: preferences,
          }
        );

        if (response.status === 200) {
          toast.success('Preferences submitted successfully!');
        }
      } catch (err) {
        console.error('Error during course registration:', err);
        toast.error('Failed to register courses. Please try again.');
      }
    }
  };

  if (isLoading) {
    return <Loader />; // Display the Loader component when loading
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="course-container">
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
      <div className="header-section">
        <h1 className="course-registration-title">Course Registration</h1>
        <div className="student-info">
          <div className="info-item">
            <span className="info-label">Student Name</span>
            <span className="info-value">{formData.sid}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Student ID:</span>
            <span className="info-value">{formData.sid}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Semester:</span>
            <span className="info-value">{formData.year}</span>
          </div>
        </div>
      </div>

      <div className="courses-grid">
        {studentCourses.map((course) => (
          <CourseCard
            key={course.course_code}
            course={course}
            onClick={handleCourseClick}
            isSelected={preferences.includes(course.course_code)}
          />
        ))}
      </div>

      <Paper>
        <form className="course-selection-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            {preferences.map((_, index) => (
              <div key={index} id="form-group">
                <label htmlFor={`preference${index + 1}`}>Preference {index + 1}</label>
                <select
                  id={`preference${index + 1}`}
                  value={preferences[index]}
                  onChange={(e) => handlePreferenceChange(index, e.target.value)}
                >
                  <option value="">-- Select a Course --</option>
                  {studentCourses.map((course) => (
                    <option
                      key={course.course_code}
                      value={course.course_code}
                      disabled={
                        preferences.includes(course.course_code) &&
                        preferences[index] !== course.course_code
                      }
                    >
                      {course.course_name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="form-actions">
            
                <button type="submit" className="btn-submit" disabled={!areButtonsEnabled}>
                  Submit Registration
                </button>
                <button type="button" className="btn-reset" onClick={handleReset} disabled={!areButtonsEnabled}>
                  Reset Selection
                </button>
              
           
          </div>
        </form>
      </Paper>

      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={handleModalClose} />
      )}
    </div>
  );
};

export default CourseRegistration;