import React, { useState } from 'react';
import axios from 'axios';
import dummy from '../../src/Components/Helper/admindata.json';
import '../CSS/adminDash.css';
import Loader from '../Pages/Loding'; // Import the Loader component
import { toast, ToastContainer } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const dummydata = dummy;
const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const AdminDash = () => {
  const cookiesid = JSON.parse(localStorage.getItem('userInfo'));

  const [selectedBatch, setSelectedBatch] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(false); // Initialize loading state

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
    setIsButtonEnabled(true);
  };

  const handleStartClick = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get(`${ENDPOINT}/api/admin/start-course-allocation?batch=${selectedBatch}`);
      console.log(cookiesid);
      console.log(response.data);
      if(response.data.success === "true"){
        toast.success('Course allocation started successfully!');
      }
      else{
        toast.error('Failed to start course allocation. Please try again.');
      }
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleDistributeClick = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`${ENDPOINT}/api/admin/allocate-courses`);
      console.log(response.data);
      setCourseData(response.data);
      toast.success('Courses distributed successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to distribute courses. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const handleApproveClick = async () => {
    if (!courseData || !courseData.allocations) return;
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.post(`${ENDPOINT}/api/admin/approve-course-allotment`, courseData.allocations);
      console.log(response.data);
      setCourseData(null);
      if(response.data.success === "true") {
        toast.success('Course allotment approved successfully!');
      }
      else{
        toast.error('Failed to approve course allotment. Please try again.');
      }
    } catch (error) {
      console.error(error);
      
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  const currentYear = new Date().getFullYear();
  const lastFourYears = Array.from({ length: 4 }, (_, i) => currentYear - i);

  if (loading) {
    return <Loader />; // Display the Loader component when loading
  }

  return (
    <div className="admin-dashboard">
      <ToastContainer /> {/* Add ToastContainer to display toasts */}
      <h1 className="admin-title">Admin Dashboard</h1>

      <div className="semester-selection">
        <label htmlFor="batch-select">Select Batch:</label>
        <select
          id="batch-select"
          value={selectedBatch}
          onChange={handleBatchChange}
        >
          <option value="" disabled>
            Select Batch
          </option>
          {lastFourYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="registration-actions">
        <button
          className="btn-start-registration"
          onClick={handleStartClick}
          disabled={!isButtonEnabled}
        >
          Start
        </button>
        <button
          className="btn-start-registration"
          onClick={handleDistributeClick}
        >
          Distribute Courses
        </button>
      </div>

      <div className="student-data-section">
        <h2>Allocations and Scores</h2>
        <table className="student-data-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Courses</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dummydata.allocations).map(([student, courses]) => (
              <tr key={student}>
                <td>{student}</td>
                <td>{courses.join(', ')}</td>
                <td>{dummydata.scores[student] || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        className="btn-approve-registration"
        onClick={handleApproveClick}
      >
        Approve
      </button>
    </div>
  );
};

export default AdminDash;
