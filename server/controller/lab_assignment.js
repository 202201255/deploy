const { json } = require("express");
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const lab_assignment = async (req, res) => {
	const ID = String(req.body.ID);
	// console.log("ID", ID);
	console.log(req.body);
	console.log("ok");
	const CID = req.params.CourseId;
	const lab_link = req.body.link;
	const title = req.body.title;
	const description = req.body.description;
	const due_time = req.body.due_time;

	const current_time = new Date();
	const assign_time = current_time
		.toLocaleString("sv-SE", { hour12: false })
		.replace("T", " ");
	console.log([
		parseInt(CID),
		title,
		description,
		assign_time,
		due_time,
		lab_link,
	]);

	try {
		const assignment = await pool.query(
			`INSERT INTO Lab (CID, title, Description, Assign_Time, Due_Time, assignment_link)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING Lab_ID;`,
			[parseInt(CID), title, description, assign_time, due_time, lab_link]
		);

		const Lab_ID = assignment.rows[0].lab_id;

		console.log(Lab_ID, Lab_ID);
		res.status(201).json({
			message: "Lab assignment created successfully",
			Lab_ID: Lab_ID,
		});
	} catch (error) {
		await pool.query("ROLLBACK");
		if (error.code === "23503" || error.code === "23505") {
			console.log("first", error);
			res.status(400).json({ error: "Error due to wrong input!!" });
		} else {
			console.log("second", error);
			res.status(500).json({ error: "Internal Server Error!!" });
		}
	}
};

const lab_submission = async (req, res) => {
	const ID = String(req.body.ID);
	if (ID.startsWith("S")) {
		const StudentID = ID;
		const submission_link = req.body.link;
		const Lab_ID = req.params.Lab_ID;

		const current_time = new Date();
		const submission_time = current_time
			.toLocaleString("sv-SE", { hour12: false })
			.replace("T", " ");

		try {
			console.log([parseInt(Lab_ID), ID, submission_link, submission_time]);

			const assignment = await pool.query(
				`INSERT INTO Attended_Lab (Lab_ID, SID, submission, submission_time)
            VALUES ($1, $2, $3, $4);`,
				[parseInt(Lab_ID), ID, submission_link, submission_time]
			);

			res.status(201).json({
				message: "Lab submitted successfully",
			});
		} catch (error) {
			// await pool.query("ROLLBACK");
			if (error.code === "23503" || error.code === "23505") {
				res.status(400).json({ error: "Error due to wrong input!!" });
			} else {
				res.status(500).json({ error: "Internal Server Error!!" });
			}
		}
	}
};

const listlabs = async (req, res) => {
	const CID = req.params.CourseId;
	console.log(CID);

	try {
		const allLabs = await pool.query(
			`
        SELECT l.lab_id,l.title,l.due_time,l.assignment_link,c.course_code,c.prof_id,l.description FROM (course AS c JOIN lab AS l on c.cid = l.cid) 
        WHERE c.cid = $1`,
			[parseInt(CID)]
		);

		if (allLabs.rows.length === 0) {
			return res.status(200).json({ message: "No lab has been assigned yet!" });
		}

		return res.json({ Labs: allLabs.rows });
	} catch (error) {
		console.error("Error : fetching labs from database", error);
		return res
			.status(500)
			.json({ Error: "An error occured while fetching data for assigned lab" });
	}
};

const listsubmissions = async (req, res) => {
	
		const CID = req.params.CourseId;
		const Lab_ID = req.params.Lab_ID;

		try {
			const submission = await pool.query(
				`SELECT lab_id,sid,submission,submission_time FROM attended_lab 
          WHERE lab_id = $1`,
				[Lab_ID]
			);

			if (submission.rows.length === 0) {
				res.status(200).json({ message: "No submission has been done yet!" });
			}

			res.json({ Submissions: submission.rows });
		} catch (error) {
			console.error("Error : fetching labs from database", error);
			res
				.status(500)
				.json({
					Error: "An error occured while fetching data for submitted lab",
				});
		}
	
};
module.exports = { lab_assignment, lab_submission, listlabs, listsubmissions };
