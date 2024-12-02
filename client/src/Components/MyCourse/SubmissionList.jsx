import React from "react";

const LabSubmissionList = ({ lab_id, sid, submissionLink, submissionTime }) => {
	return (
		<div className="lab-submission-list">
			<h2>Lab Submissions</h2>
			<table className="submission-table">
				<thead>
					<tr>
						<th>Student ID</th>
						<th>Lab ID</th>
						<th>Submission Time</th>
						<th>Submission Link</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>{sid}</td>
						<td>{lab_id}</td>
						<td>{new Date(submissionTime).toLocaleString()}</td>
						<td>
							<a
								href={submissionLink}
								target="_blank"
								rel="noopener noreferrer"
							>
								View Submission
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default LabSubmissionList;
