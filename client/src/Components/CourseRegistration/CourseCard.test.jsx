// src/Components/CourseCard.test.jsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import CourseCard from '../CourseRegistration/CourseCard';
import courseCardGif from '../../Images/value.gif';

const mockCourse = {
  course_name: 'Test Course',
};

const mockOnClick = jest.fn();

test('renders CourseCard component', () => {
  const { getByText, getByAltText } = render(
    <CourseCard course={mockCourse} onClick={mockOnClick} isSelected={false} />
  );

  expect(getByText('Test Course')).toBeInTheDocument();
  expect(getByAltText('Course Icon')).toHaveAttribute('src', courseCardGif);
});

test('calls onClick when clicked', () => {
  const { getByText } = render(
    <CourseCard course={mockCourse} onClick={mockOnClick} isSelected={false} />
  );

  fireEvent.click(getByText('Test Course'));
  expect(mockOnClick).toHaveBeenCalledWith(mockCourse);
});

test('displays selected overlay when isSelected is true', () => {
  const { getByText } = render(
    <CourseCard course={mockCourse} onClick={mockOnClick} isSelected={true} />
  );

  expect(getByText('Selected')).toBeInTheDocument();
});