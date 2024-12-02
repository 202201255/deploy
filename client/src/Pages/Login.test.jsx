import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login'; // Adjust the import path as necessary
import { toast } from 'react-toastify';

// Mock axios
jest.mock('axios');

// Mock toast
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Login component', () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    expect(getByLabelText('User Id ')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Submit')).toBeInTheDocument();
  });

  test('displays loader when submitting form', async () => {
    const { getByLabelText, getByText, queryByText } = render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(getByLabelText('User Id '), { target: { value: 'S001' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

    axios.post.mockResolvedValueOnce({
      data: {
        success: true,
        role: 'student',
        token: 'fake-token',
      },
    });

    fireEvent.click(getByText('Submit'));

    expect(queryByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  test('displays success toast and navigates on successful login', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(getByLabelText('User Id '), { target: { value: 'S001' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'password' } });

    axios.post.mockResolvedValueOnce({
      data: {
        success: true,
        role: 'student',
        token: 'fake-token',
      },
    });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Login Successful');
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'userInfo',
        JSON.stringify({
          success: true,
          role: 'student',
          token: 'fake-token',
        })
      );
    });
  });

  test('displays error toast on failed login', async () => {
    const { getByLabelText, getByText } = render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(getByLabelText('User Id '), { target: { value: 'S001' } });
    fireEvent.change(getByLabelText('Password'), { target: { value: 'wrong-password' } });

    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          message: 'Login Failed',
        },
      },
    });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Login Failed');
    });
  });
});