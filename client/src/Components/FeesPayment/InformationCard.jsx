import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const InformationCard = ({ heading, info }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '130px', // Slightly wider card
        height: '100px', // Square shape
        margin: 0.3,
        borderRadius: 8, // Increased border radius
        background: '#fff',
        transition: 'transform 0.3s ease, background 0.3s, color 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          color: '#fff', // Text color change on hover
        },
        boxShadow: '0px 6px 12px rgba(0,0,0,0.3)',
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center', // Centering the heading
            color: 'inherit',
          }}
        >
          {heading}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'inherit', textAlign: 'center' }} // Centering the info
        >
          {info}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InformationCard;
