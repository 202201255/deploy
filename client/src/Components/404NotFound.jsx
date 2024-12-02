import React from 'react';
import myGif from '../Images/404.gif'; // Update with your preferred GIF path

const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Transparent background effect
      backdropFilter: 'blur(8px)', // Adds a glass-like blur effect
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
      color: '#333',
      maxWidth: '90%',
      margin: 'auto',
    },
    heading: {
      fontSize: '88px',
      fontWeight: 'bold',
      color: '#ff6b6b', // Vibrant red for attention
      margin: '0',
      textShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    },
    message: {
      fontSize: '22px',
      fontWeight: '300',
      color: '#555',
      maxWidth: '600px',
      lineHeight: '1.6',
    },
    gif: {
      width: '320px', // Adjust for balance
      height: 'auto',
      borderRadius: '15px',
      margin: '20px 0',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    button: {
      marginTop: '20px',
      padding: '12px 30px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#007bff', // Bright blue for the button
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
      transition: 'all 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker shade for hover
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.container}>
      {/* <h1 style={styles.heading}>404</h1> */}
      <p style={styles.message}>
        Oops! The page you're looking for doesn't exist. But don't worry, you can always go back home!
      </p>
      <img src={myGif} alt="Page Not Found" style={styles.gif} />
      <button
        style={styles.button}
        onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={() => (window.location.href = '/')}
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
