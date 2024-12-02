const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const userRoutes = require("./Routes/userRoutes");
const dotenv = require("dotenv");
const pool = require("./config/db");
const authUser = require("./controller/authUser");
const groupChatRoutes = require("./Routes/chatRoutes");
const adminRoutes = require("./Routes/adminRoutes");
dotenv.config();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type","Authorization"],
		credentials: true,
	},
});

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Content-Type","Authorization"],
		credentials: true,
	})
);
app.use(express.json());

app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/api/user", userRoutes);
app.use("/api/groupChat", groupChatRoutes);
app.use("/api/admin", adminRoutes);

io.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);
	socket.on("joinCourse", (courseId) => {
		socket.join(courseId);
		console.log(`User joined course room: ${courseId}`);
	});

	socket.on("sendMessage", (messageData) => {
		const { content, senderId, courseId } = messageData;
		io.to(courseId).emit("messageReceived", messageData);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected");
	});
});

const port = 3001;
app.listen(port, () => {
	console.log(`Server is running on ${port}`);
});
