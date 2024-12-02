import React from "react";

const UpcomingFeatures = () => {
	const upcomingFeatures = [
		{
			title: "AI-Driven Insights",
			description:
				"Leverage AI to analyze student performance and provide actionable insights.",
		},
		{
			title: "Mobile App Integration",
			description:
				"Access the platform on-the-go with seamless mobile app support.",
		},
		{
			title: "E-Library with Integrated Search",
			description:
				"Adds a digital library that includes books, research papers, and reference materials with advanced search and filtering capabilities.",
		},
		{
			title: "Internship and Career Guidance Portal",
			description:
				"Helps students find internships, job opportunities, and career counseling resources based on their academic progress and interests.",
		},
		{
			title: "Integrated Online Examination System",
			description:
				"Develops a secure and scalable module for conducting online exams with automated proctoring and instant result generation.",
		},
		{
			title: "Mobile Application Development",
			description:
				"Extends the platform to a mobile app with offline features like downloading notes or submitting assignments without internet access.",
		},
	];

	const styles = {
		container: {
			textAlign: "center",
			padding: "4rem 2rem",
			backgroundColor: "#eaf6fc", // Subtle light blue shade
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
			gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", // Flexible grid
			gap: "2rem",
			maxWidth: "1200px",
			margin: "0 auto",
		},
		card: {
			backgroundColor: "48cae4",
			padding: "1rem", // Reduced padding for smaller screens
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
			fontSize: "1.3rem", // Smaller title for smaller cards
			fontWeight: "600",
			color: "#d47700", // Highlighted color for upcoming features
			marginBottom: "0.8rem",
		},
		description: {
			fontSize: "0.95rem", // Smaller font size for description
			color: "#555",
			lineHeight: "1.5",
		},
	};

	return (
		<div style={styles.container}>
			<h2 style={styles.title}>Upcoming Features</h2>
			<div style={styles.grid}>
				{upcomingFeatures.map((feature, index) => (
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

export default UpcomingFeatures;
