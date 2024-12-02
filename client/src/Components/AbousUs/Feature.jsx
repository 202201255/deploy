import React from "react";

const Features = () => {
	const featureData = [
		{
			title: "Secure User Authentication and Account Management",
			description:
				"Implements robust user authentication mechanisms with session handling, allowing users to securely log in, manage their accounts, and update profile or password details.",
		},
		{
			title: "Comprehensive Course Enrollment and Tracking",
			description:
				"Facilitates efficient course registration with automated validation of prerequisites, seat availability checks, and comprehensive course tracking.",
		},
		{
			title: "Integrated Financial Transaction System",
			description:
				"Provides a seamless payment gateway for fee processing, ensuring secure and efficient financial transactions.",
		},
		{
			title: "Scholarship Management and Application Tracking",
			description:
				"Offers a dedicated portal for students to submit scholarship applications, view eligibility criteria, and monitor application status in real-time.",
		},
		{
			title: "Attendance Monitoring and Analytics",
			description:
				"Enables students to access detailed attendance records and analytics for academic performance tracking.",
		},
		{
			title: "Centralized Academic Resource Repository",
			description:
				"Establishes a centralized platform where students can access, view, and download course materials and academic resources uploaded by instructors.",
		},
		{
			title: "Digital Assignment Submission Platform",
			description:
				"Features a streamlined file submission system for assignments, providing submission status tracking and confirmation.",
		},
		{
			title: "Performance Evaluation and Reporting Module",
			description:
				"Offers tools for students to access test schedules and results while empowering administrators to generate detailed reports and manage course assignments effectively.",
		},
	];


	const styles = {
		container: {
			textAlign: "center",
			padding: "4rem 2rem",
			backgroundColor: "#eaf6fc", // Light blue background for consistency
			borderRadius: "8px",
			marginTop: "2rem",
		},
		title: {
			fontSize: "2.5rem",
			fontWeight: "bold",
			color: "#333",
			marginBottom: "2rem",
		},
		grid: {
			display: "grid",
			gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", // Reduced card size
			gap: "1.5rem", // Smaller gap between cards
			maxWidth: "1200px",
			margin: "0 auto",
		},
		card: {
			backgroundColor: "48cae4",
			padding: "1rem", // Reduced padding
			borderRadius: "10px", // Slightly smaller border radius
			boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
			transition:
				"transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
			textAlign: "center",
			// cursor: "pointer", // Add cursor pointer to indicate it's clickable
			transform: "scale(1)", // Initial scale
		},
		cardHover: {
			transform: "translateY(-10px) scale(1.05)", // Adjusted hover effect
			boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
			backgroundColor: "#f7f7f7", // Slightly lighter background on hover
		},
		featureTitle: {
			fontSize: "1.3rem", // Slightly smaller title
			fontWeight: "600",
			color: "#0078d4", // Highlighted color for titles
			marginBottom: "0.8rem",
		},
		description: {
			fontSize: "0.95rem", // Slightly smaller description font size
			color: "#555",
			lineHeight: "1.5",
		},
	};

	return (
		<div style={styles.container}>
			<h2 style={styles.title}>Features</h2>
			<div style={styles.grid}>
				{featureData.map((feature, index) => (
					<div
						key={index}
						style={styles.card}
						onMouseEnter={(e) =>
							Object.assign(e.currentTarget.style, styles.cardHover)
						}
						onMouseLeave={(e) =>
							Object.assign(e.currentTarget.style, styles.card)
						}
					>
						<h3 style={styles.featureTitle}>{feature.title}</h3>
						<p style={styles.description}>{feature.description}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Features;
