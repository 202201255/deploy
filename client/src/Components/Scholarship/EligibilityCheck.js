// EligibilityCheck.js
import React, { useState } from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const EligibilityCheck = () => {
  const [criteria, setCriteria] = useState({ year: '', income: '', gpa: '' });
  const [isEligible, setIsEligible] = useState(null);

  const handleChange = (event) => {
    setCriteria({ ...criteria, [event.target.name]: event.target.value });
  };

  const checkEligibility = () => {
    if ((criteria.year === 'Final Year' || criteria.year === 'Third Year') && criteria.income === 'Below 5 LPA' && criteria.gpa >= 7.5) {
      setIsEligible(true);
    } else {
      setIsEligible(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4">Check Your Eligibility</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="year-label">Year of Study</InputLabel>
            <Select
              labelId="year-label"
              id="year"
              name="year"
              value={criteria.year}
              onChange={handleChange}
            >
              <MenuItem value="First Year">First Year</MenuItem>
              <MenuItem value="Second Year">Second Year</MenuItem>
              <MenuItem value="Third Year">Third Year</MenuItem>
              <MenuItem value="Final Year">Final Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="income-label">Family Income</InputLabel>
            <Select
              labelId="income-label"
              id="income"
              name="income"
              value={criteria.income}
              onChange={handleChange}
            >
              <MenuItem value="Below 5 LPA">Below 5 LPA</MenuItem>
              <MenuItem value="Above 5 LPA">Above 5 LPA</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="gpa-label">CGPA</InputLabel>
            <Select
              labelId="gpa-label"
              id="gpa"
              name="gpa"
              value={criteria.gpa}
              onChange={handleChange}
            >
              <MenuItem value="6.0">6.0</MenuItem>
              <MenuItem value="7.0">7.0</MenuItem>
              <MenuItem value="8.0">8.0</MenuItem>
              <MenuItem value="9.0">9.0</MenuItem>
              <MenuItem value="10.0">10.0</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={checkEligibility}>
            Check Eligibility
          </Button>
        </Grid>
      </Grid>
      {isEligible !== null && (
        <Typography variant="h6">
          {isEligible ? 'You are eligible for the scholarship!' : 'You are not eligible for the scholarship.'}
        </Typography>
      )}
    </Box>
  );
};

export default EligibilityCheck;