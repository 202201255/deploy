import React, { useState } from "react";
import {
	Box,
	Container,
	Paper,
	Typography,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
	Divider,
	Link,
	IconButton,
	CircularProgress,
	Snackbar,
	Alert,
} from "@mui/material";
import {
	Download as DownloadIcon,
	DateRange as DateRangeIcon,
	Send as SendIcon,
	Info as InfoIcon,
} from "@mui/icons-material";
import useAPI from "../../hooks/api";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { toast } from "react-toastify";

// import "react-toastify/dist/ReactToastify.css";

const userInfo = localStorage.getItem("userInfo");
const ID = userInfo ? JSON.parse(userInfo).SID : null;
const role = userInfo ? JSON.parse(userInfo).role : null;
const ENDPOINT = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";
const LabDetails = (props) => {
	const [submissionLink, setSubmissionLink] = useState("");
	const [comments, setComments] = useState("");
	const [recentSubmissions, setRecentSubmissions] = useState([]);
	const [commentsList, setCommentsList] = useState([]);
	const [isAdding, setIsAdding] = useState(false);
	const [toast, setToast] = useState({
		open: false,
		message: "",
		severity: "",
	});
	const [submissions, setSubmissions] = useState([]);
	const [errors, setFormErrors] = useState({});

	const dueDate = "2024-12-15"; // Example due date

	const { POST } = useAPI();

	const userInfo = localStorage.getItem("userInfo");
	const ID = userInfo ? JSON.parse(userInfo).SID : null;
	const role = userInfo ? JSON.parse(userInfo).role : null;

	const { course_id: cid } = useParams(); // Matches the route parameter name

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validate(submissionLink);
		setFormErrors(errors);
		setIsAdding(true);
		try {
			const submissionfile = {
				ID: ID,
				link: submissionLink,
			};
			console.log("hoahedgru", props.LabId);
			const results = await axios.post(
				`${ENDPOINT}/api/user/dashboard/mycourses/${cid}/lab/${props.LabId}/submission`,
				submissionfile,
				{
					headers: { "Content-Type": "application/json" },
					withCredentials: true,
				}
			);


			toast.success("Submission successful!");
		} catch (error) {
			// toast.warning("Submission failed!");
			
		} finally {
			setIsAdding(false);
		}


	};


	let Api = `${ENDPOINT}/api/user/profdashboard/mycourses/${cid}/lab/${props.LabId}`;
	if (role === "faculty") {
		const fetchApiData = async () => {
			try {
				const response = await axios.get(Api);
				console.log(response.data);

                setSubmissions(response.data?.Submissions);

				// const results = await axios.get(
				// 	`http://localhost:3001/api/user/dashboard/mycourses?ID=${S001}&Semester=${5}`
				// );
			} catch (error) {
				//   setError(error);
				console.log(error);
			}
		};
	}
	
	const handleCommentSubmit = () => {
		if (comments) {
			setCommentsList([...commentsList, comments]);
			setComments("");
		}
	};
	
	const handleToastClose = () => {
		setToast({ ...toast, open: false });
	};
	
	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		
		if (values.trim() === "") {
			errors.link = "Submission link is required";
		} else if (!regex.test(values)) {
			errors.link = "Invalid submission link";
		}

		return errors;
	};
	
	return (
		<Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
			<Paper elevation={3} sx={{ p: 4 }}>
				{/* Lab Overview Section */}
				<Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
					<InfoIcon color="primary" sx={{ mr: 1 }} />
					<Typography variant="h4">{props.title}</Typography>
				</Box>
				<Typography variant="body1" paragraph>
					{props.contect}
				</Typography>

				{/* Due Date */}
				<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<DateRangeIcon color="action" sx={{ mr: 1 }} />
					<Typography variant="body2" color="textSecondary">
						<strong>Due Date:</strong> {props.date}
					</Typography>
				</Box>

				{/* Resources */}
				<Typography variant="h6" gutterBottom>
					Resources
				</Typography>
				<List>
					<ListItem>
						<ListItemText
							primary="Lab PDF"
							secondary={
								<Link href="https://example.com/lab.pdf" target="_blank">
									Download Lab PDF
								</Link>
							}
						/>
						<IconButton href="https://example.com/lab.pdf" target="_blank">
							<DownloadIcon />
						</IconButton>
					</ListItem>
				</List>

				<Divider sx={{ my: 3 }} />

				{/* Submission Section */}
				<Typography variant="h6" gutterBottom>
					Submission
				</Typography>
				<Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
					<TextField
						fullWidth
						variant="outlined"
						label="Google Drive Link for Submission"
						value={submissionLink}
						onChange={(e) => setSubmissionLink(e.target.value)}
						sx={{ mr: 2 }}
					/>
					<Button
						disabled={role === "faculty" ? true : false}
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						endIcon={<SendIcon />}
						style={{
							backgroundColor: "#1976d2",
							color: "#fff",
							padding: "10px 20px",
							fontSize: "16px",
							borderRadius: "8px",
							transition: "background-color 0.3s ease, transform 0.3s ease",
							boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
						}}
						onMouseDown={(e) => {
							e.currentTarget.style.backgroundColor = "#1565c0";
							e.currentTarget.style.transform = "scale(0.98)";
						}}
						onMouseUp={(e) => {
							e.currentTarget.style.backgroundColor = "#1976d2";
							e.currentTarget.style.transform = "scale(1)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "#1976d2";
							e.currentTarget.style.transform = "scale(1)";
						}}
					>
						{isAdding ? <CircularProgress size={20} /> : "Submit"}
					</Button>
				</Box>

				{submissions.length === 0 ? (
					role === "faculty" ? (
						<Typography variant="body1" color="textSecondary">
							No submissions yet
						</Typography>
					) : (
						<Typography variant="body1" color="textSecondary">
							You have not submitted anything yet
						</Typography>
					)
				) : (
					submissions.map((submission, index) => (
						<div key={index} style={{ padding: "5px", margin: "5px" }}>
							<SubmissionList
								lab_id={submissions.lab_id}
								sid={submissionLink.sid}
								submissionLink={submissions.submission}
								submissionTime={submissions.submission_time}
							/>
						</div>
					))
				)}
			</Paper>

		
		</Container>
	);
};

export default LabDetails;
