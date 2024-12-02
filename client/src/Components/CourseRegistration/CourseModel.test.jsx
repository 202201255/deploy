// src/Components/CourseModel.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import CourseModel from './CourseModel';

const mockCourse = {
  course_name: 'Test Course',
  course_description: 'This is a test course description.',
  course_code: 'TC101',
  semester: 'Fall',
  year: 2021,
  credit: 3,
  prof_id: 'Prof123',
};

const mockOnClose = jest.fn();

test('renders CourseModel component with course data', () => {
  const { getByText } = render(
    <CourseModel course={mockCourse} onClose={mockOnClose} />
  );

  expect(getByText('Test Course')).toBeInTheDocument();
  expect(getByText('This is a test course description.')).toBeInTheDocument();
  expect(getByText('Course ID: TC101')).toBeInTheDocument();
  expect(getByText('Semester: Fall')).toBeInTheDocument();
  expect(getByText('Year: 2021')).toBeInTheDocument();
  expect(getByText('Credit: 3')).toBeInTheDocument();
  expect(getByText('Professor: Prof123')).toBeInTheDocument();
});

test('renders CourseModel component without course data', () => {
  const { queryByText } = render(
    <CourseModel course={null} onClose={mockOnClose} />
  );

  expect(queryByText('Test Course')).not.toBeInTheDocument();
});

test('calls onClose when close button is clicked', () => {
  const { getByRole } = render(
    <CourseModel course={mockCourse} onClose={mockOnClose} />
  );

  fireEvent.click(getByRole('button', { name: /×/i }));
  expect(mockOnClose).toHaveBeenCalled();
});

test('calls onClose when overlay is clicked', () => {
  const { getByTestId } = render(
    <CourseModel course={mockCourse} onClose={mockOnClose} />
  );

  fireEvent.click(getByTestId('course-modal-overlay'));
  expect(mockOnClose).toHaveBeenCalled();
});