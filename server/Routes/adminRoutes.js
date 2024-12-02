const express = require('express');
const router = express.Router();
const {startAllocation ,courseAllotmentController, approveCourseAllotment } = require('../controller/courseAllotmentController');


router.route('/start-course-allocation').get(startAllocation);
router.route('/allocate-courses').post(courseAllotmentController);
router.route('/approve-course-allotment').post(approveCourseAllotment);

module.exports = router;