const express= require("express");
const protect=require("../middleWare/authMiddleware");
const {authUser,viewProfile,editProfile,authRole} = require("../controller/authUser");
const {dashboard} = require("../controller/dashboard");
const {mycourses} = require("../controller/mycourses");
const {professor_dashboard} = require("../controller/Professor_Dashboard");
const {professor_mycourses,listenrolled_students} = require("../controller/Professor_mycourses");
const {courseNotes} = require("../controller/courseNotes");
const {lab_assignment,lab_submission,listlabs,listsubmissions} = require("../controller/lab_assignment");
const {getCourseRegistrationList,registerStudentPreferences} = require("../controller/course_registration");
const {roleBasedDashboard} = require('../../server/middleWare/RoleVerifier'); 

const { getApplications, createApplication } = require("../controller/applicationController");

const { getFees , payFee , downloadReceipt } = require("../controller/feeController");

const router = express.Router();
router.route('/login').post(authUser);
router.route('/authRole').post(protect,authRole);
router.route('/viewprofile').get(viewProfile);
router.route('/editprofile').put(editProfile);

router.route('/dashboard/mycourses/:CID/notes').get(courseNotes);
router.route('/profdashboard/mycourses/:CID/notes').get(courseNotes);

router.route('/scholarship/applications').get(getApplications);
router.route('/scholarship/applications').post(createApplication);

router.route('/fees').get(getFees)
router.route('/pay').post(payFee)
router.route('/download-receipt/:studentId/:semester').get(downloadReceipt)




// router.route('/dashboard').get(protect,roleBasedDashboard(dashboard, professor_dashboard));
// router.route('/dashboard/mycourses').get(protect,roleBasedDashboard(mycourses, professor_mycourses));

router.route('/dashboard').get(dashboard);
router.route('/dashboard/mycourses').get(mycourses);

// professor dashboard routes
router.route('/profdashboard').get(professor_dashboard);
router.route('/profdashboard/mycourses').get(professor_mycourses);
router.route('/profdashboard/mycourses/:CourseId').get(listenrolled_students);

router.route('/lab_assignment').get(lab_assignment);
router.route('/course_registration').get(getCourseRegistrationList);
router.route('/course_registration').post(registerStudentPreferences);


router.route('/dashboard/mycourses/:CourseId/lab/:Lab_ID/submission').post(lab_submission);

router.route('/dashboard/mycourses/:CourseId/lab').get(listlabs);   // listing lab to both roles
router.route('/profdashboard/mycourses/:CourseId/lab').get(listlabs);   // listing lab to both roles

router.route('/profdashboard/mycourses/:CourseId/lab/assignment').post(lab_assignment);
router.route('/profdashboard/mycourses/:CourseId/lab/:Lab_ID').get(listsubmissions);

module.exports=router;  
 