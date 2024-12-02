import React, { useState, useEffect } from 'react';
import axios from 'axios'
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Twitter, LinkedIn, Facebook } from '@mui/icons-material';
import EligibilityCheck from './EligibilityCheck';

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const ScholarshipDetails = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({
    student_id: JSON.parse(localStorage.getItem('userInfo')).SID,
    application_year: new Date().getFullYear(),
    full_name: '',
    email: '',
    phone: '',
  });

  const [errors, setErrors] = useState({ full_name: '', email: '', phone: '' });

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `${ENDPOINT}/api/user/scholarship/applications`
      );
      const studentApplications = response.data.filter(
        (app) => app.student_id === newApplication.student_id
      );
      setApplications(studentApplications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const validateFields = () => {
    let valid = true;
    const newErrors = { full_name: '', email: '', phone: '' };
  
    // Full Name validation
    const nameRegex = /^[A-Za-z\s]+$/; // Only alphabets and spaces allowed
    if (!newApplication.full_name.trim()) {
      newErrors.full_name = 'Full Name is required.';
      valid = false;
    } else if (!nameRegex.test(newApplication.full_name)) {
      newErrors.full_name = 'Full Name can only contain alphabets.';
      valid = false;
    } else if (newApplication.full_name.length < 5) {
      newErrors.full_name = 'Full Name must be at least 5 characters.';
      valid = false;
    } else if (newApplication.full_name.length > 50) {
      newErrors.full_name = 'Full Name must not exceed 50 characters.';
      valid = false;
    }
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newApplication.email)) {
      newErrors.email = 'Enter a valid email address.';
      valid = false;
    }
  
    // Phone validation
    if (!/^\d{10}$/.test(newApplication.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
      valid = false;
    }
  
    setErrors(newErrors);
    return valid;
  };
  

  const handleSubmit = async () => {
    if (validateFields()) {
      try {
        await axios.post(
          `${ENDPOINT}/api/user/scholarship/applications`,
          newApplication
        );
        alert('Application submitted successfully!');
        fetchApplications();
        setNewApplication({
          student_id: JSON.parse(localStorage.getItem('userInfo')).SID,
          application_year: new Date().getFullYear(),
          full_name: '',
          email: '',
          phone: '',
        });
        setErrors({ full_name: '', email: '', phone: '' });
      } catch (error) {
        console.error('Error submitting application:', error);
        alert('Failed to submit the application.');
      }
    }
  };

  return (
    <Box
      sx={{
        padding: { xs: '2rem 1rem', sm: '3rem 2rem' },
        backgroundColor: '#e0f7fa',
        maxWidth: '1200px',
        margin: 'auto',
      }}
    >
      <Paper
        elevation={8}
        sx={{
          padding: { xs: '1.5rem', sm: '2rem' },
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Title and Intro */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: '700',
            color: '#0d47a1',
            mb: { xs: 2, sm: 3 },
            textAlign: 'center',
          }}
        >
          Merit Cum Means Scholarship
        </Typography>

        <Typography
          variant="body1"
          sx={{
            lineHeight: 1.8,
            color: '#1a237e',
            textAlign: 'center',
            mt: { xs: 1, sm: 2 },
          }}
        >
          The XYZ College Scholarship supports outstanding students by covering
          tuition and additional stipends. Learn more and apply below.
        </Typography>

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        {/* Scholarship Benefits */}
        <Typography
          variant="h6"
          sx={{ color: '#1565c0', mt: { xs: 2, sm: 4 }, textAlign: 'center' }}
        >
          Scholarship Amount & Benefits
        </Typography>

        {/* ...Benefits section remains unchanged... */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
        {[
          { title: 'Total Amount', value: 'INR 50,000' },
          { title: 'Stipend & Books', value: 'Tuition, monthly stipend, and book allowance.' },
          { title: 'Additional Benefits', value: 'Free access to workshops and networking events.' },
        ].map((benefit, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              sx={{
                padding: '1.5rem',
                backgroundColor: '#bbdefb',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '150px',
                textAlign: 'center',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
            >
              <Typography variant="h6" sx={{ color: '#0d47a1', fontWeight: 'bold' }}>
                {benefit.title}
              </Typography>
              <Typography variant="body1" sx={{ color: '#1a237e', mt: 1 }}>
                {benefit.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>


        {/* Deadline */}
        <Divider sx={{ my: { xs: 2, sm: 3 } }} />
        <Typography
          variant="h6"
          sx={{ color: '#1565c0', mt: { xs: 2, sm: 4 }, textAlign: 'center' }}
        >
          Scholarship Deadline
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: '#1a237e', textAlign: 'center', mb: { xs: 2, sm: 4 } }}
        >
          The last date to submit your application is{' '}
          <strong>December 31, 2024</strong>. Don't miss the chance to apply!
        </Typography>

        {/* Eligibility Check */}
        <EligibilityCheck />

        <Divider sx={{ my: { xs: 2, sm: 3 } }} />

        {/* Application Form */}
        <Typography variant="h6" sx={{ color: '#1565c0', mt: { xs: 2, sm: 4 } }}>
          Apply for Scholarship
        </Typography>
        <Box
          component="form"
          sx={{
            mt: { xs: 1, sm: 2 },
            mb: { xs: 2, sm: 4 },
          }}
        >
          {/* ...Form section remains unchanged... */}
          <TextField
            label="Student ID"
            variant="outlined"
            fullWidth
            value={JSON.parse(localStorage.getItem("userInfo")).SID}
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            value={newApplication.full_name}
            onChange={(e) => setNewApplication({ ...newApplication, full_name: e.target.value })}
            error={!!errors.full_name}
            helperText={errors.full_name}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={newApplication.email}
            onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            value={newApplication.phone}
            onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ px: 4, py: 1.5, fontWeight: 'bold' }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        {/* Submitted Applications */}
        <Divider sx={{ my: { xs: 2, sm: 3 } }} />
        <Typography
          variant="h6"
          sx={{ color: '#1565c0', mt: { xs: 2, sm: 4 }, textAlign: 'center' }}
        >
          Your Submitted Applications
        </Typography>
        {applications.length > 0 ? (
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {applications.map((app, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    backgroundColor: '#e3f2fd',
                    padding: 2,
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1">
                      <strong>Full Name:</strong> {app.full_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Application Id:</strong> {app.application_id}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Year:</strong> {app.application_year}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Status:</strong> {app.status}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body1"
            sx={{ textAlign: 'center', color: '#1a237e', mt: 2 }}
          >
            No applications submitted yet.
          </Typography>
        )}

        {/* Refer to Friend */}
        <Divider sx={{ my: { xs: 2, sm: 3 } }} />
        <Typography
          variant="h6"
          sx={{ color: '#1565c0', mt: { xs: 2, sm: 4 }, textAlign: 'center' }}
        >
          Refer this Scholarship to a Friend
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Tooltip title="Share on Twitter">
            <IconButton color="primary">
              <Twitter />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on LinkedIn">
            <IconButton color="primary">
              <LinkedIn />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on Facebook">
            <IconButton color="primary">
              <Facebook />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
};

export default ScholarshipDetails;

