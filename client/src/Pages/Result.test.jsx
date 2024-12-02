// src/Components/Result.test.js
import React from 'react';
import { render } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import Result from './Result';

test('renders Result component with student details and grade details', () => {
  const { getByText } = render(<Result />);

  // Check if student details are rendered
  expect(getByText('Name:')).toBeInTheDocument();
  expect(getByText('Student ID:')).toBeInTheDocument();
  expect(getByText('Program:')).toBeInTheDocument();
  expect(getByText('Semester:')).toBeInTheDocument();

  // Check if grade details are rendered
  expect(getByText('Course 1')).toBeInTheDocument();
  expect(getByText('Course 2')).toBeInTheDocument();
  expect(getByText('Course 3')).toBeInTheDocument();
  expect(getByText('Course 4')).toBeInTheDocument();
  expect(getByText('Course 5')).toBeInTheDocument();
  expect(getByText('Course 6')).toBeInTheDocument();
});