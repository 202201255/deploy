import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Replace with your desired primary color
    },
    secondary: {
      main: '#ff4081', // Replace with your desired secondary color
    },
    background: {
      default: '#f4f6f8', // Light background color
      paper: '#ffffff', // White background for paper components
    },
    text: {
      primary: '#333333', // Primary text color
      secondary: '#555555', // Secondary text color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundcolor: '#87F6FF',
          backgroundImage: 'linear-gradient(135deg, #FFFFFF 7%, #48cae6 50%, #FFFFFF 100%)',
          minHeight: '100vh',
          margin: 0,
          padding: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 1)',
          boxShadow: '10px 14px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
        },
      },
    },
    
  },
});

export default theme;