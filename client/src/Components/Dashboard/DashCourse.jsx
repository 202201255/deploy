import React from 'react';
import { Box } from '@mui/material';
import BookIcon from '../../Images/book.gif'

import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const DashCourse = () => {
    const navigate = useNavigate();
    return (
			<Box
				sx={{
					display: "flex",
					gap: "16px", // Adds some space between the two boxes
				}}
			>
				<Box
					sx={{
						width: "100%",
						height: "100%",
						padding: "10px",
						// backgroundColor: "lightgray",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						 cursor: "pointer",
						 margin:'30px'
					}}
					onClick={() => {
						navigate(`/Mycourses`);
					}}
				>
					<img src={BookIcon} alt="Book" style={{ width: '40px', height: '40px' }}/>
					<Typography
						sx={{ padding: "20px" }}
						
					>
						My Courses
					</Typography>
				</Box>

				
			</Box>
		);
};

export default DashCourse;
