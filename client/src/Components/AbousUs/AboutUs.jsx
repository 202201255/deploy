import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../CSS/AboutUs.css";
// import { avatars } from "../utils/avatar";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { IconButton } from "@mui/material";
// import avatar from '../utils/avatar.js'; // Or `.ts`, `.jsx`, etc.
import Features from "./Feature";
import UpcomingFeatures from "./UpcomingFeature";
import Footer from "../Footer/Footer.jsx";

import aastha from "../../Images/aastha.jpg";
import Nishtha from "../../Images/Nishtha.jpg";
import Jaimin from "../../Images/Jaimin.jpg";
import Vrund from "../../Images/Vrund.jpg";
import Aryan from "../../Images/Aryan.jpg";
import Smit from "../../Images/Smit.jpg";
import Jay from "../../Images/Jay.jpg";
import Rhythm from "../../Images/Rytham.jpg";
import Jenil from "../../Images/Jenil.jpg";
import { FaNode } from "react-icons/fa";
import { FaReact } from "react-icons/fa6";
import { FaBootstrap } from "react-icons/fa6";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiExpress } from "react-icons/si";
import { SiMui } from "react-icons/si";
import { SiMocha } from "react-icons/si";
import { GiJesterHat } from "react-icons/gi";
import { SiApache } from "react-icons/si";
import { SiSelenium } from "react-icons/si";
const img = "https://wallpapercave.com/wp/wp7313761.jpg";

const teamMembers = [
	{
		name: "Vrund Leuva",
		id: "202201199",
		photo: Vrund,
		github: "https://github.com/vrund1307",
		linkedin:
			"https://www.linkedin.com/in/vrund-leuva-8a10a2253?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
	},
	{
		name: "Nishtha Patel",
		id: "202201209",
		photo: Nishtha,
		github: "https://github.com/202201209",
		linkedin: "https://www.linkedin.com/in/nishtha-patel-4bb6952a0/",
	},
	{
		name: "Jaimin Prajapati",
		id: "202201228",
		photo: Jaimin,
		github: "https://github.com/202201228",
		linkedin: "https://www.linkedin.com/in/jaimin-prajapati-2016a6267/",
	},
	{
		name: "Rhythm Panchal",
		id: "202201230",
		photo: Rhythm,
		github: "https://github.com/alwaysinmy-rhythm",
		linkedin: "https://www.linkedin.com/in/smit-fefar-competitive-programmer/",
	},
	{
		name: "Aryan Solanki",
		id: "202201239",
		photo: Aryan,
		github: "https://github.com/202201239",
		linkedin:
			"https://www.linkedin.com/in/solanki-aryan-3ab739314?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
	},
	{
		name: "Jenil Goswami",
		id: "202201247",
		photo: Jenil,
		github: "https://github.com/Jenil247",
		linkedin: "https://www.linkedin.com/in/jenilgoswami/",
	},
	{
		name: "Smit Fefar",
		id: "202201253",
		photo: Smit,
		github: "https://github.com/FEFAR-SMIT",
		linkedin: "https://www.linkedin.com/in/smit-fefar-competitive-programmer/",
	},
	{
		name: "Jay Rathod",
		id: "202201255",
		photo: Jay,
		github: "https://github.com/202201255/",
		linkedin: "https://www.linkedin.com/in/jay-rathod-54333b253/",
	},
	{
		name: "Aastha Bhavsar",
		id: "202201259",
		photo: aastha,
		github: "https://github.com/aas1tha",
		linkedin: "https://www.linkedin.com/in/aasthabhavsar/",
	},
];

function AboutUS() {
	const [shuffledMembers, setShuffledMembers] = useState([]);

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: "ease-in-out",
			once: true,
		});

		// Shuffle the team members
		const shuffleArray = (array) => {
			const shuffled = [...array];
			for (let i = shuffled.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
			}
			return shuffled;
		};

		setShuffledMembers(shuffleArray(teamMembers));
	}, []);

	return (
		<div data-aos="fade-up">
			<section className="section services-section" id="services">
				<div className="container">
					<div
						className="row justify-content-center"
						style={{ margin: "50px 0" }}
					>
						<div className="col-lg-8 text-center">
							<div style={{ marginBottom: "50px" }}>
								<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
									About Us
								</h1>
								<p
									style={{
										fontFamily: "Quicksand",
										fontSize: "1.2rem",
										lineHeight: "1.8",
										color: "#555",
									}}
								>
									Our Student Management ERP simplifies academic processes,
									empowering educators and enhancing the student experience with
									a modern, digital solution.
								</p>
							</div>
							<div>
								<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
									Motivation for Undertaking This Project
								</h1>
								<p
									style={{
										fontFamily: "Quicksand",
										fontSize: "1.2rem",
										lineHeight: "1.8",
										color: "#555",
									}}
								>
									In today's fast-paced education system, we developed a modern
									Student Management ERP to replace outdated methods, saving
									time and resources while improving tasks for educators and the
									learning experience for students.
								</p>
							</div>
						</div>
					</div>
					<Features />
					<UpcomingFeatures />
					{/* Tech Stack */}

					<div className="row">
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
								marginTop: "50px",
							}}
						>
							<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
								Technologies We Use
							</h1>
						</div>
						{/* Technology Boxes */}
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									// style={{ backgroundColor: "white", color: "black" }}
								>
									<i className="fa-brands fa-node-js">
										<FaReact />
									</i>
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>React</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									// style={{ backgroundColor: "white", color: "black" }}
								>
									{/* <i className="fa-brands fa-node-js">FaNode</i> */}
									<FaNode />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Node JS</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									style={{ backgroundColor: "white", color: "black" }}
								>
									{/* <i className="fa-solid fa-database"></i> */}
									<BiLogoPostgresql />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>PostgreSQL</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									// style={{ backgroundColor: "white", color: "black" }}
								>
									{/* <i className="fa-brands fa-node-js"></i> */}
									<SiExpress />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Express</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div
									className="icon"
									style={{ backgroundColor: "white", color: "black" }}
								>
									{/* <i className="fa-brands fa-uikit"></i> */}
									<SiMui />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Material UI</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div className="icon">
									{/* <i className="fa-brands fa-bootstrap"></i> */}
									<FaBootstrap />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>Bootstrap</h5>
								</div>
							</div>
						</div>
						{/* //new----icnon left */}
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div className="icon">
									{/* <i className="fa-brands fa-bootstrap"></i> */}
									<SiMocha />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>mocha chai</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div className="icon">
									{/* <i className="fa-brands fa-bootstrap">jest</i> */}
									<GiJesterHat />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>jest</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div className="icon">
									{/* <i className="fa-brands fa-bootstrap">A</i> */}
									<SiApache />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>apache</h5>
								</div>
							</div>
						</div>
						<div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
							<div className="feature-box-1">
								<div className="icon">
									{/* <i className="fa-brands fa-bootstrap"></i> */}
									<SiSelenium />
								</div>
								<div className="feature-content">
									<h5 style={{ fontFamily: "Quicksand" }}>selenium</h5>
								</div>
							</div>
						</div>
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "100%",
							}}
						>
							<h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
								Meet our Team Members
							</h1>
						</div>
						{/* Profile Boxes */}
						{shuffledMembers.map((member, index) => (
							<div
								key={index}
								className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
							>
								<div className="feature-box-1 profile-card">
									<div
										className="profile-content"
										style={{
											display: "flex",
											flexDirection: "column",
											justifyContent: "center",
											alignItems: "center",
											padding: "1rem",
										}}
									>
										<img
											src={member.photo}
											alt="profile"
											className="profile-img"
										/>
										<h5 className="profile-name">{member.name}</h5>
										<h5 className="profile-name">{member.id}</h5>

										<div className="profile-icons">
											<IconButton
												sx={{ mx: "2px" }}
												onClick={() => window.open(member.github, "_blank")}
												className="icon-button"
											>
												<GitHubIcon sx={{ color: "#333333" }} />
											</IconButton>
											<IconButton
												sx={{ mx: "2px" }}
												onClick={() => window.open(member.linkedin, "_blank")}
												className="icon-button"
											>
												<LinkedInIcon sx={{ color: "#333333" }} />
											</IconButton>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
}

export default AboutUS;
