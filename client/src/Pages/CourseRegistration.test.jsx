import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import CourseRegistration from '../Pages/CourseRegistration';

// Mock axios
jest.mock('axios', () => {
  return {
    get: jest.fn(() =>
      Promise.resolve({
        data: {
          studentInfo: {
            sid: '202201239',
            year: '5',
          },
          courses: [
            { course_code: 'CSE101', course_name: 'Course 1' },
            { course_code: 'CSE102', course_name: 'Course 2' },
            { course_code: 'CSE103', course_name: 'Course 3' },
            { course_code: 'CSE104', course_name: 'Course 4' },
            { course_code: 'CSE105', course_name: 'Course 5' },
          ],
          allocationStatus: true,
        },
      })
    ),
    post: jest.fn(() => Promise.resolve({ status: 200 })),
  };
});

// Test cases
test('renders CourseRegistration component with student info and courses', async () => {
  const { getByText, getByLabelText } = render(<CourseRegistration />);

  // Wait for the student info and courses to be fetched and rendered
  await waitFor(() => {
    expect(getByText('Student Name')).toBeInTheDocument();
    expect(getByText('Course 1')).toBeInTheDocument();
    expect(getByText('Course 2')).toBeInTheDocument();
    expect(getByText('Course 3')).toBeInTheDocument();
    expect(getByText('Course 4')).toBeInTheDocument();
    expect(getByText('Course 5')).toBeInTheDocument();
  });

  // Check if the form fields are rendered
  expect(getByLabelText('Preference 1')).toBeInTheDocument();
  expect(getByLabelText('Preference 2')).toBeInTheDocument();
  expect(getByLabelText('Preference 3')).toBeInTheDocument();
  expect(getByLabelText('Preference 4')).toBeInTheDocument();
  expect(getByLabelText('Preference 5')).toBeInTheDocument();
});

// test('submits course preferences', async () => {
//   const { getByLabelText, getByText } = render(<CourseRegistration />);

//   // Wait for the student info and courses to be fetched and rendered
//   await waitFor(() => {
//     expect(getByText('Student Name:')).toBeInTheDocument();
//   });

//   // Fill out the form
//   fireEvent.change(getByLabelText('Preference 1'), { target: { value: 'CSE101' } });
//   fireEvent.change(getByLabelText('Preference 2'), { target: { value: 'CSE102' } });
//   fireEvent.change(getByLabelText('Preference 3'), { target: { value: 'CSE103' } });
//   fireEvent.change(getByLabelText('Preference 4'), { target: { value: 'CSE104' } });
//   fireEvent.change(getByLabelText('Preference 5'), { target: { value: 'CSE105' } });

//   // Submit the form
//   fireEvent.click(getByText('Submit Registration'));

//   // Assert API calls
//   await waitFor(() => {
//     expect(axios.post).toHaveBeenCalledWith(
//       `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'}/api/user/course_registration`,
//       {
//         studentId: '202201239',
//         name: '202201239',
//         semester: '5',
//         courses: ['CSE101', 'CSE102', 'CSE103', 'CSE104', 'CSE105'],
//       }
//     );
//   });

//   // Check success message
//   await waitFor(() => {
//     expect(getByText('Preferences submitted successfully!')).toBeInTheDocument();
//   });
// });

// test('shows error message when not all preferences are selected', async () => {
//   const { getByText } = render(<CourseRegistration />);

//   // Wait for the student info and courses to be fetched and rendered
//   await waitFor(() => {
//     expect(getByText('Student Name:')).toBeInTheDocument();
//   });

//   // Submit the form without selecting all preferences
//   fireEvent.click(getByText('Submit Registration'));

//   // Check if the error message is displayed
//   await waitFor(() => {
//     expect(getByText('Please select all 5 preferences before submitting.')).toBeInTheDocument();
//   });
// });