import React from "react";
import { Card, Grid, Box, Tooltip, Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description"; // Class notes icon
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // Hover effect icon for redirection
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "250px", // Adjusted for better balance and visibility
  borderRadius: "16px",
  boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
  cursor: "pointer",
  transition: "transform 0.3s ease, box-shadow 0.4s ease",
  backgroundColor: theme.palette.background.paper,
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.25)",
  },
}));

const HoverIcon = styled(OpenInNewIcon)(({ theme }) => ({
  position: "absolute",
  bottom: "16px",
  right: "16px",
  fontSize: "32px", // Size of the hover icon
  color: theme.palette.primary.main,
  opacity: 0,
  transform: "translateY(10px)",
  transition: "opacity 0.3s ease, transform 0.3s ease",
  "&:hover": {
    opacity: 1,
    transform: "translateY(0)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: "80px", // Consistent size
  height: "80px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #004085, #0066cc)", // Gradient dark blue background
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "16px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  transition: "background-color 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #003366, #0059b3)", // Darker gradient on hover
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "18px",
  textAlign: "center",
  color: theme.palette.text.primary,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

const ClassNotes = ({ notes }) => {
  return (
    <Box sx={{ padding: "20px" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontWeight: 700,
          marginBottom: "30px",
          color: "#1976d2", // Color for the title
        }}
      >
        Class Notes
      </Typography>
      <Grid container spacing={4}>
      {notes ?
				// ? Lists.map((List, index) => 
        (notes.map((note, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note.note_id}>
            <Tooltip title="Click to view note" arrow>
              <StyledCard onClick={() => window.open(note.note_link, "_blank")}>
                <IconWrapper>
                  <DescriptionIcon sx={{ fontSize: "40px", color: "#fff" }} /> {/* White icon for better contrast */}
                </IconWrapper>
                <TitleTypography>Note {index + 1}</TitleTypography>
                <HoverIcon />
              </StyledCard>
            </Tooltip>
          </Grid>
        ))):null
      }
      </Grid>
    </Box>
  );
};

export default ClassNotes;
