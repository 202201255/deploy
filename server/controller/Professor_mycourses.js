const { json } = require("express");
const pool = require("../config/db");

const professor_mycourses = async (req,res)=>{

    const ProfessorID = req.query.ID;
    const current_date = new Date();
    const current_year = current_date.getFullYear().toString();
    const current_month = current_date.getMonth() + 1;
    let semester_period;

    if(current_month >= 1 && current_month <=6)
      semester_period = 'Winter';
    else 
      semester_period = 'Autumn';

      try {
        const courses = await pool.query(`SELECT cid , course_code FROM course 
            WHERE prof_id = $1 AND YEAR = $2 AND semester = $3 `,[ProfessorID,current_year,semester_period]);

        if(courses.rows.length === 0){
           res.status(200).json({message : "No courses assigned this year to professor"})
           return;
        }
    
        res.json({mycourses : courses.rows})
        
      } catch (error) {
        console.error("Error: An error occured while listing courses from database",error);
        res.status(500).json({Error : "An error occured while listing courses from database"});
      } 

}

const listenrolled_students = async(req,res)=>{

    const CID = req.params.CourseId;
    try {
        
        const students = await pool.query(`SELECT sid FROM course_enrolled_list WHERE cid = $1`,[parseInt(CID)]);

        if(students.rows.length === 0){
          res.status(200).json({message : "No student enrolled to this course yet!"})
          return;
       }
        res.json({students : students.rows});
        
    } catch (error) {
        console.error("Error: An error occured while listing students from database",error);
        res.status(500).json({ Error: "An error occured while listing students from database" });
        
    }
   
}

module.exports = {professor_mycourses,listenrolled_students}