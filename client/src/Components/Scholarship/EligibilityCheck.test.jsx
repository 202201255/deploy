// EligibilityCheck.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
import EligibilityCheck from './EligibilityCheck';

describe('EligibilityCheck Component', () => {
  test('renders the component with correct UI elements', () => {
    render(<EligibilityCheck />);

    // Check for the presence of headings and dropdowns
    expect(screen.getByText('Check Your Eligibility')).toBeInTheDocument();
    expect(screen.getByLabelText('Year of Study')).toBeInTheDocument();
    expect(screen.getByLabelText('Family Income')).toBeInTheDocument();
    expect(screen.getByLabelText('CGPA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Check Eligibility' })).toBeInTheDocument();
  });

  test('displays eligible message when criteria are met', () => {
    render(<EligibilityCheck />);

    fireEvent.mouseDown(screen.getByLabelText('Year of Study'));
    fireEvent.click(screen.getByRole('option', { name: 'Final Year' }));

    fireEvent.mouseDown(screen.getByLabelText('Family Income'));
    fireEvent.click(screen.getByRole('option', { name: 'Below 5 LPA' }));

    fireEvent.mouseDown(screen.getByLabelText('CGPA'));
    fireEvent.click(screen.getByRole('option', { name: '8.0' }));

    fireEvent.click(screen.getByRole('button', { name: 'Check Eligibility' }));

    expect(screen.getByText('You are eligible for the scholarship!')).toBeInTheDocument();
  });

  test('displays not eligible message when criteria are not met', () => {
    render(<EligibilityCheck />);

    fireEvent.mouseDown(screen.getByLabelText('Year of Study'));
    fireEvent.click(screen.getByRole('option', { name: 'Second Year' }));

    fireEvent.mouseDown(screen.getByLabelText('Family Income'));
    fireEvent.click(screen.getByRole('option', { name: 'Above 5 LPA' }));

    fireEvent.mouseDown(screen.getByLabelText('CGPA'));
    fireEvent.click(screen.getByRole('option', { name: '6.0' }));

    fireEvent.click(screen.getByRole('button', { name: 'Check Eligibility' }));

    expect(screen.getByText('You are not eligible for the scholarship.')).toBeInTheDocument();
  });
});