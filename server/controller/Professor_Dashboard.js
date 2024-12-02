const { json } = require("express");
const pool = require("../config/db");
const fs = require('fs');
const path = require('path');
const { error } = require("console");

const professor_dashboard = async (req,res)=>{ 
    
    const upcoming_events_data = await upcoming_events(req,res);
    const time_table_data = await time_table(req,res);

    res.status(200).json({
        success : true,
        upcoming_events_data: upcoming_events_data,
        time_table_data : time_table_data
    })
        
}

const upcoming_events = async (req, res) => {
    const events_path = path.join(__dirname, './upcoming_events.json');
     
    return new Promise((resolve,reject)=>{
        fs.readFile(events_path,'utf8',(err,data)=>{

            if(err)
                return reject(err)

            try {
              events = JSON.parse(data)
              resolve(events)
                
            } catch (ParseError) {
                console.error('Error parsing JSON:', ParseError);
                reject('Error parsing events data');
            }
        });
    });
};

const time_table = (req,res)=>{

    time_table_path = path.join(__dirname,"./time_table.json")

    return new Promise((resolve,reject)=>{
        fs.readFile(time_table_path,'utf8',(err,data)=>{

            try {

                if (err) {
                    reject(err)
                }
                timetable = JSON.parse(data)
                resolve(timetable);
                
            } catch (ParseErr) {

                console.error('Error parsing JSON:', ParseErr);
                reject('Error parsing events data');     
            }

        });
    });
}
  
module.exports = {professor_dashboard,upcoming_events,time_table};