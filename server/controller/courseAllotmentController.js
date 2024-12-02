const express= require("express");
const pool = require("../config/db");
const router = express.Router();
const { spawn } = require('child_process');

let allocationBatch = null; //this variable defines whether the allocation is on or off

//when admin starts course allotment process for one batch 
const startAllocation = async (req, res) => {
    //there is global variable allocationBatch which is used to check whether the allocation is already in process or not.
    if(allocationBatch !== null){
        await pool.query('');
        res.status(201).json({ message: `Allocation of batch ${allocationBatch} already in process`});
        return ;
    }
    //if allocation is not in process then admin can start the allocation process
    allocationBatch = req.query.batch;
    console.log(allocationBatch);
    res.status(200).json({ message: "Allocation started" });
}
//when admin approves the allocation of courses to students then this function is called
//this function inserts the courses to the student's course_enrolled table and deletes the preferences from student_preference table
//on approval of courses course-allotment process is completed
const approveCourseAllotment = async (req, res) => {
    const studentCourses = req.body;
    console.log(req.body);
    for (const [sid, courses] of Object.entries(studentCourses)) {
        if (!sid || !Array.isArray(courses) || courses.length !== 2) {
            return res.status(400).json({ message: "Invalid request data" });
        }
    }
    
    const client = await pool.connect();
    try {
        const insertCourse1 = 'INSERT INTO course_enrolled (sid, course_id) VALUES ($1, $2)';
        const insertCourse2 = 'INSERT INTO course_enrolled (sid, course_id) VALUES ($1, $2)';
        await client.query(insertCourse1, [sid, courses[0]]);
        await client.query(insertCourse2, [sid, courses[1]]);

        // const deletePreferences = 'DELETE FROM student_preference WHERE sid = $1';
        // await client.query(deletePreferences, [sid]);
        allocationBatch = null;
        res.status(200).json({ message: "Courses approved and preferences deleted" });
    } catch (error) {
        // await client.query('ROLLBACK');
        res.status(500).json({ message: error.message });
    } finally {
        client.release();
    }
};


//this is courseAllotmentController function which is called from server/Routes/adminRoutes.js
//when admin have all student's prefernces and he wants to allocate courses to students he calls this function
//response is the allocation of courses to students

const courseAllotmentController = async (req, res) => {

    const student_pref = await pool.query(
        'select * from studentPreference'
    );

    let preferenceList = {};
   
    console.log(student_pref.rows.length);
    for( let i =0 ; i< student_pref.rows.length ; i++){
        console.log(student_pref.rows[i]); 
        preferenceList[student_pref.rows[i].sid] = [
            student_pref.rows[i].preference1,
            student_pref.rows[i].preference2,
            student_pref.rows[i].preference3,
            student_pref.rows[i].preference4,
            student_pref.rows[i].preference5
        ];
    }
    console.log(preferenceList);
    const preferenceData = {student_preferences:preferenceList , courseLimit : req.body.courseLimit , numberOfAllocations : req.body.numberOfAllocations};
    console.log(preferenceData);
    if (!preferenceData.student_preferences) {
        return res.status(400).json({ message: "preference list is not provided" });
    }

    try {
        const result = await runILPmodel(preferenceData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

//this is function to run the python file to run pupl mode for distribution 
//this is called from courseAllotmentController
const runILPmodel = (preferenceData) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn('python', ['./Controller/ILP.py'], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        let stdoutData = '';
        let stderrData = '';

        pythonProcess.stdin.write(JSON.stringify(preferenceData));
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', (data) => { stdoutData += data.toString(); });
        pythonProcess.stderr.on('data', (data) => { stderrData += data.toString(); });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                return reject(new Error(`Python script error (${code}): ${stderrData}`));
            }
            try {
                resolve(JSON.parse(stdoutData));
            } catch (error) {
                reject(new Error(`Failed to parse Python output: ${error.message}\n Output was: ${stdoutData}`));
            }
        });

        pythonProcess.on('error', (error) => reject(error));
    });
};


module.exports = { courseAllotmentController, allocationBatch, approveCourseAllotment ,startAllocation};