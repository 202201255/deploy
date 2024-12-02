const express = require('express');
const protect=require("../middleWare/authMiddleware");
const { sendMessage, getMessages,courseList,professorCourseList } = require('../controller/chatController');

const router = express.Router();
router.route('/send').post(protect,sendMessage);
router.route('/messages').post(protect,getMessages);
router.route('/courses').post(courseList);
router.route('/profcourses').post(protect,professorCourseList);

module.exports = router;
