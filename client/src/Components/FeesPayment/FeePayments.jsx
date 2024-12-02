import React, { useState } from 'react';
import axios from 'axios';
import {
  Grid, Typography, FormControl, Select, MenuItem, Button, Box, useMediaQuery,
  Accordion, AccordionSummary, AccordionDetails, Paper, Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import FeeCard from './FeeCard';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const FeePayments = () => {
  const navigate = useNavigate();
  const [semester, setSemester] = useState('');
  const [fees, setFees] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const studentId = JSON.parse(localStorage.getItem("userInfo")).SID;

  const fetchFees = async (semester) => {
    try {
      const response = await axios.get(`${ENDPOINT}/api/user/fees`, {
        params: { studentId, semester },
      });
      setFees(response.data);
    } catch (error) {
      console.error("Failed to fetch fees", error);
    }
  };

  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;
    setSemester(selectedSemester);
    fetchFees(selectedSemester);
  };

  const handlePayment = async (feeId) => {
    try {
      const response = await axios.post(`${ENDPOINT}/api/user/pay`, { feeId });
      alert(response.data.message);
      fetchFees(semester); // Refresh the data after payment
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed");
    }
  };

  const handleApplyForScholarship = () => {
    // Scholarship application logic, using window location for navigation
    // window.location.href = '/scholarship';
    navigate('/scholarship');
  };

  const handleDownloadReceipt = async () => {
    if (semester) {
      try {
        const response = await axios.get(`${ENDPOINT}/api/user/download-receipt/${studentId}/${semester}`, {
          responseType: 'blob',
        });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Semester_${semester}_Receipt.pdf`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error downloading receipt', error);
        alert('Failed to download receipt');
      }
    } else {
      alert('Please select a semester');
    }
  };


  return (
    <>
    <Box sx={{ padding: '20px', backgroundColor: '#f7faff', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold', color: '#0d47a1' }}>
        Fee Payment Portal
      </Typography>

      <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mb: 2 }}>
        Select your semester to view fee details, make payments, and download receipts.
      </Typography>

      <FormControl fullWidth sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
        <Select
          value={semester}
          onChange={handleSemesterChange}
          sx={{
            width: isSmallScreen ? '100%' : '300px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
          }}
        >
          <MenuItem value="" disabled>
            Select Semester
          </MenuItem>
          {[...Array(8)].map((_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Semester {i + 1}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {semester && (
        <>
          <Typography variant="h5" gutterBottom textAlign="center" sx={{ color: '#1565c0' }}>
            Fees for Semester {semester}
          </Typography>
          <br></br>

          <Grid container spacing={3} justifyContent="center">
            {fees.map((fee) => (
              <Grid item xs={12} sm={6} md={4} key={fee.id}>
                <FeeCard fee={fee} onPayment={handlePayment} />
              </Grid>
            ))}
          </Grid>

<br></br>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleDownloadReceipt}
              sx={{
                padding: '10px 20px',
                borderRadius: '8px',
                background: '#0d47a1',
                color: '#ffffff',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Download Receipt for Semester {semester}
            </Button>
          </Box>
        </>
      )}

      <br></br>

      {/* Scholarship Application Section */}
      <Box sx={{ mt: 4, p: 3, border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f7faff' }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Apply for Scholarship
        </Typography>
        <Typography variant="body1" textAlign="center" color="textSecondary" sx={{ mb: 2 }}>
          Students are encouraged to apply for available scholarships. Check eligibility and submit your application below.
        </Typography>

        <Link to={`/scholarship`} style={{ textDecoration: 'none' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ display: 'block', mx: 'auto' }}
        >
          Go to Scholarship Application
        </Button>
        </Link>

      </Box>

      <br></br>

      {/* FAQ Section with Accordion */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>What happens if I miss the payment deadline?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              Missing the deadline will result in a late fee. You may also experience restricted access to certain facilities. Contact the administration for more information.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>Can I apply for multiple scholarships?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              Yes, students are allowed to apply for multiple scholarships if eligible. Each application will be reviewed independently.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>How do I download my fee receipts?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              Select your semester from the dropdown and click "Download Receipt" to download the corresponding fee receipt.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 1, border: '1px solid #ddd', borderRadius: '8px' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ backgroundColor: '#f7f7f7', fontWeight: 'bold' }}>
            <Typography><strong>Who should I contact for payment assistance?</strong></Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ backgroundColor: '#f9f9f9' }}>
            <Typography>
              For assistance, please contact the Student Finance Office at <strong>finance@university.edu</strong> or visit their office during business hours.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <br></br>

      <Paper elevation={3} sx={{ padding: '20px', backgroundColor: '#e3f2fd', textAlign: 'center' }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#0d47a1' }}>
          For Queries, Contact the College Administration
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Email: support@college.edu
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          Phone: +91-9876543210
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Office Hours: Mon-Fri, 9:00 AM to 5:00 PM
        </Typography>
      </Paper>

    </Box>

    </>
  );
};

export default FeePayments;
