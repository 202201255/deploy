import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import PropTypes from "prop-types";

function CircularProgressWithLabel({ attendance }) {
  const attendanceValue = parseFloat(attendance); // Convert attendance to a number

  return (
    <Paper sx={{ width: '100%', borderRadius: '20px' }} data-testid="paper-component">
      <Box sx={{ position: "relative", display: "block", marginLeft: '30%', justifyContent: 'center', alignItems: 'center', paddingTop: '10%' }}>
        <CircularProgress
          variant="determinate"
          value={attendanceValue}
          size={130}
          thickness={5}
        />
        <Box
          sx={{
            top: '20%',
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
            paddingLeft: '20%',
            paddingBottom: '20%'
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${attendance}`}</Typography>
        </Box>
        <h4>Attendance</h4>
      </Box>
    </Paper>
  );
}

CircularProgressWithLabel.propTypes = {
  attendance: PropTypes.string.isRequired,
};

export default function ProgressBar({ attendance }) {
  return <CircularProgressWithLabel attendance={attendance} />;
}

ProgressBar.propTypes = {
  attendance: PropTypes.string.isRequired,
};
