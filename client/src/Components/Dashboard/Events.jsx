import React, { useEffect } from 'react';
import { Paper, Typography } from '@mui/material';
import '../../CSS/Events.css'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types';

export const colorPalette = [
  '#1976d2',  
  '#ff4081',  
  '#4caf50',  
  '#ff9800',  
  '#9c27b0',  
  '#f44336',  
  '#00bcd4',  
  '#1abc9c',  
  '#2ecc71',  
  '#3498db',  
  '#9b59b6',  
  '#e74c3c',  
  '#f39c12',  
  '#d35400',  
  '#7f8c8d',  
  '#e67e22',  
  '#34495e',  
];

// Function to get random color
export function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colorPalette.length);
  return colorPalette[randomIndex];
}

function Events({height, event}) {

  useEffect(() => {
    // console.log('Event data:', event);
  }, [event]);
  return (
    <>
    <h2 className='eventsHead'>Up Coming Events!</h2>
    {/* <h3>{props.event}</h3> */}

    <Box
      style={{
        maxHeight: height,
        overflowY: 'auto', 
        scrollbarWidth: 'thin',
      }}
    >
     {(event || []).map(data => {
          // Get a new random color for each event
          const randomColor = getRandomColor();

          return (
            <Paper
              key={data.id} 
              data-testid={`event-paper-${data.id}`}
              style={{
                paddingLeft: '10px', 
                marginRight: '0px', 
                margin: '10px', 
                borderLeft: `5px solid ${randomColor}`,
                borderTopLeftRadius: '20px',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Typography variant="h6">{data.title}</Typography>
              <Typography variant="body1">{data.description}</Typography>
              <Typography variant="body1">{data.date}</Typography>
            </Paper>
          );
        })}
    </Box>
    </>
  );
}

Events.propTypes = {
  height: PropTypes.string,
};

export default Events;
