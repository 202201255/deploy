import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import CourseCard2 from "./CourseCard2"; // Import the ClassroomCard component
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useAPI from "../../hooks/api";
import Loader from "../../Pages/Loding"; // Import the Loader component
//integration
import axios from "axios";


//  import dotenv from 'dotenv';
//  dotenv.config();

const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

const userInfo = localStorage.getItem("userInfo");
const ID = userInfo ? JSON.parse(userInfo).SID : null;
const role = userInfo ? JSON.parse(userInfo).role : null;

// const Api = `${ENDPOINT}/api/user/profdashboard/mycourses?ID=S001&Semester=5`;
let Api = null;
if (role === "student") {
	Api = `${ENDPOINT}/api/user/dashboard/mycourses?ID=${ID}&Semester=5`;
} else if (role === "faculty") {
	Api = `${ENDPOINT}/api/user/profdashboard/mycourses?ID=${ID}`;
}

const parentstyle = {
    marginTop: "100px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "5px",
    margin: "5px",
};
const Courses = () => {
    // List of courses (already present in your original code)
    const [isLoading, setIsLoading] = useState(true);
    const [mycourses, setMycourses] = useState([]);
    const [semester, setSemester] = React.useState("4");

    const { GET, POST } = useAPI();

    const handleChange = (event) => {
        setSemester(event.target.value);
    };

	useEffect(() => {
		const fetchApiData = async () => {
			try {
				const response = await axios.get(Api);
				console.log(response.data);

				// const courseData = { ID: "S001", Semester: "4" };
				// const courseData = { ID: String(ID), Semester: String(semester) };
				// console.log(courseData);
				// let results;
				// if (role === "student") {
				// 	results = await GET("/api/user/dashboard/mycourses", courseData);
				// 	setMycourses(results.data.mycourses);
				// } else {
				// 	results = await GET("/api/user/prof/dashboard/mycourses", courseData);
				// 	setMycourses(results.data.mycourses);
				// }
				// const results = await GET("/api/user/dashboard/mycourses", courseData);

				// console.log(results.data.mycourses);
				setMycourses(response.data.mycourses);

                // const results = await axios.get(
                // 	`http://localhost:3001/api/user/dashboard/mycourses?ID=${S001}&Semester=${5}`
                // );

				setMycourses(response.data?.mycourses);
			} catch (error) {
				//   setError(error);
				console.log(error);
			}
		};
		fetchApiData();
	}, [semester]);

	useEffect(() => {
		console.log(mycourses);
	}, [mycourses]);

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
                        // marginTop: "200px",
                        m: 1,
                        minWidth: 120,
                        borderRadius: "8px",
                        backgroundColor: "#f5f5f5",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        "& .MuiSelect-root": {
                            padding: "10px",
                            border: "1px solid #ccc",
                            "&:hover": {
                                borderColor: "#3f51b5",
                            },
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#3f51b5",
                        },
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
                        sx={{
                            "& .MuiSelect-icon": {
                                color: "#3f51b5",
                            },
                        }}
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
                    {/* Sidebar with Navbar */}

					{/* Course Cards Section */}
					<Grid
						item
						md={12}
						xs={9}
						sm={10}
						sx={{ position: "relative" }}
						style={parentstyle}
					>
						<Grid
							container
							spacing={4}
							style={{ padding: "5px", margin: "5px" }}
						>
							{mycourses.length === 0 ? (
								<p>No courses available for the selected semester.</p>
							) : (
								mycourses.map((course, index) => (
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