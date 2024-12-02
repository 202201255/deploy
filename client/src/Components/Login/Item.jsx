// Item.jsx
import React from 'react'; // Import React
import PropTypes from 'prop-types'; // Import PropTypes
import { Paper } from '@mui/material';

export default function Item({ item }) {
    return (
        <Paper
            elevation={0} // Remove shadow for the background
            style={{
                width: "100%",
                height: "100vh", // Make sure it takes the full height of the screen
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 1, // You can adjust the opacity to your liking
            }}
        >
        </Paper>
    );
}

// Define propTypes for the component
Item.propTypes = {
    item: PropTypes.shape({
        image: PropTypes.string.isRequired, // Validate that item.image is a required string
    }).isRequired, // Validate that item itself is required
};
