import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CourseCard2 from "./CourseCard2";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const userInfo = localStorage.getItem("userInfo");
const ID = userInfo ? JSON.parse(userInfo).SID : null;
const role = userInfo ? JSON.parse(userInfo).role : null;

const Courses = () => {
	const [mycourses, setMycourses] = useState([]);
	const [semester, setSemester] = useState("4");
	const [loading, setLoading] = useState(false); // Track loading state

	const handleChange = (event) => {
		setSemester(event.target.value); // Update semester when changed
	};

	useEffect(() => {
		const fetchApiData = async () => {
			setMycourses([]); // Clear courses
			setLoading(true); // Start loading
			try {
				// Dynamically construct the API endpoint
				let Api = null;
				if (role === "student") {
					Api = `${ENDPOINT}/api/user/dashboard/mycourses?ID=${ID}&Semester=${semester}`;
				} else if (role === "faculty") {
					Api = `${ENDPOINT}/api/user/profdashboard/mycourses?ID=${ID}`;
				}

				const response = await axios.get(Api);
				// console.log(response.data);
				setMycourses(response.data.mycourses);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false); // End loading
			}
		};

		fetchApiData();
	}, [semester]); // This useEffect depends on semester, triggers when semester changes

	return (
		<>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					padding: "0 20px",
					marginTop: "15px",
				}}
			>
				<h1 style={{ zIndex: "1", width: "100%", margin: 0 }}>My Courses</h1>

				<FormControl
					sx={{
						m: 1,
						minWidth: 120,
						borderRadius: "8px",
						backgroundColor: "#f5f5f5",
						boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
					}}
					size="medium"
				>
					<InputLabel id="demo-select-small-label">Semester</InputLabel>
					<Select
						labelId="demo-select-small-label"
						id="demo-select-small"
						value={semester}
						label="Semester"
						onChange={handleChange}
					>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
							<MenuItem key={sem} value={sem}>
								{sem}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>

			<div style={{ marginTop: "40px" }}>
				<Grid container>
					<Grid
						item
						md={12}
						xs={9}
						sm={10}
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginTop: "50px",
						}}
					>
						<Grid
							container
							spacing={4}
							style={{ padding: "5px", margin: "5px" }}
						>
							{loading ? (
								<p>Loading courses...</p>
							) : mycourses && mycourses.length === 0 ? (
								<p>No courses available for the selected semester.</p>
							) : (
								mycourses?.map((course, index) => (
									<div key={index} style={{ padding: "5px", margin: "5px" }}>
										<CourseCard2
											cid={course.cid}
											courseName={course.course_code}
											instructor={course.course_code}
											avatarLetter={course.avatarLetter}
											courseCode={course.course_code}
										/>
									</div>
								))
							)}
						</Grid>
					</Grid>
				</Grid>
			</div>
		</>
	);
};

export default Courses;
