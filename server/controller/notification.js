const pool = require("../config/db");

//creating a function which add notification to the table
//this function takes the following format for the request : 
//    sid: 'S002',
//    note_title: ' Second Test',
//    note_description: 'This notification is sent using node js function for testing.'
//please note that if you want to add notification to multiple student call function multiple times 
const addNotification = async(req)=>{
  const noteTime = new Date();
  const query = `
    INSERT INTO notification (sid, note_time, note_title, note_description)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [req.sid, noteTime, req.note_title, req.note_description];

  try {
    const res = await pool.query(query, values);
    console.log('Notification added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding notification:', err);
  }
}; 

//for a perticular student ,
//get all the notifications. 
// for this function req follows as {sid}
const getNotifications = async( req, res )=>{
    const SID = req.body.SID; 
    const userNotifications = await pool.query(
        `select * from notification where SID = '${SID}'`
    )
    try { 
        res.status(200).json(userNotifications.rows); 
    }
    catch{
        console.log('Error during the finding the notification from the database');
        res.status(500).json({message : 'Internal server error occurred!'}); 
    }
}; 

module.exports = {
    addNotification , 
    getNotifications , 
}