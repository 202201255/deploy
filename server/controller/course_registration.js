const express = require('express');
const router = express.Router();
const {allocationBatch} = require('../controller/courseAllotmentController');
const pool = require("../config/db");

async function registerStudentPreferences(req, res) {
  const { studentId, courses } = req.body;
  const sid = studentId;
  const pre1 = courses[0], pre2 = courses[1], pre3 = courses[2], pre4 = courses[3], pre5 = courses[4];
  if( !sid || !pre1 || !pre2 || !pre3 || !pre4 || !pre5){
    res.status(400).json({'message' : 'Bad request!'});
    return ; 
  }
  const sidCheckQuery = 'SELECT * FROM login WHERE sid = $1';
    const sidCheckResult = await pool.query(sidCheckQuery, [sid]);
    if (sidCheckResult.rows.length === 0) {
      res.status(404).json({ message: "Student not found" });
      return ; 
    }
    if( (pre1 === pre2 )|| (pre1 === pre3 )|| (pre1 === pre4 )|| (pre1 === pre5 )||
    (pre2 === pre3 )|| (pre2 === pre4 )|| (pre2 === pre5 )|| 
    (pre3 === pre4 )|| (pre3 === pre5 )||  
    (pre4 === pre5 )   
    ){
      console.log(pre1, pre2, pre3, pre4, pre5);
    res.status(400).json({ message: "All courses are not distinct." });
    return ;
      }


  try {
    // Check if the table exists
    const tableCheckQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'stud_pref'
      );
    `;
    const tableCheckResult = await pool.query(tableCheckQuery);

    // If the table doesn't exist, create it
    if (!tableCheckResult.rows[0].exists) {
      const createTableQuery = `
        CREATE TABLE stud_pref (
          sid VARCHAR(50) PRIMARY KEY,
          pref1 VARCHAR(50),
          pref2 VARCHAR(50),
          pref3 VARCHAR(50),
          pref4 VARCHAR(50),
          pref5 VARCHAR(50)
        );
      `;
      await pool.query(createTableQuery);
    }

    // Insert the student preferences
    const insertQuery = `
      INSERT INTO stud_pref (sid, pref1, pref2, pref3, pref4, pref5)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (sid) DO UPDATE SET
        pref1 = EXCLUDED.pref1,
        pref2 = EXCLUDED.pref2,
        pref3 = EXCLUDED.pref3,
        pref4 = EXCLUDED.pref4,
        pref5 = EXCLUDED.pref5;
    `;
    await pool.query(insertQuery, [sid, pre1, pre2, pre3, pre4, pre5]);

    res.status(200).send({ message: 'Preferences registered successfully' });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while registering preferences' });
  }
}

async function getCourseRegistrationList(req, res) {
    if(!req.query.sid){
      res.status(400).json({'message': 'wrong parameter, require sid'});
    }
    
    const sid = req.query.sid;
    // console.log(sid);
  try {
    // Fetch student information
    const studentQuery = `
      SELECT sid, year FROM student_academic WHERE sid = $1;
    `;
    const studentResult = await pool.query(studentQuery, [sid]);
      // console.log(studentResult);
      if (studentResult.rows.length === 0) {
        return res.status(404).send({ error: 'Student not found' });
      }
      const studentInfo = studentResult.rows[0];

   
//     console.log(studentInfo);
    // Calculate current semester
    const currentYear = new Date().getFullYear();
    const currentSemester = (currentYear - studentInfo.year) * 2 + (new Date().getMonth() >= 6 ? 1 : 0);
//     console.log(sid, currentSemester);
    // Fetch courses offered in the current semester

    const coursesQuery = `
      SELECT * FROM course WHERE offered_semester = $1;
    `;
    const coursesResult = await pool.query(coursesQuery, [currentSemester]);
    const courses = coursesResult.rows;
//     console.log(allocationBatch);
    let allocationStatus = true;
    if( allocationBatch == null || allocationBatch !== currentSemester){
        allocationStatus = false;
    }
    res.status(200).send({ studentInfo,courses,allocationStatus });
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while fetching course registration list' });
  }
}


module.exports = {
  // ...existing code...
  registerStudentPreferences,
  getCourseRegistrationList,
};


