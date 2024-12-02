import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import TimeTable from './TimeTable';
import Events from './Events';
import ProgressBar from './ProgressBar';
import '../../CSS/DashCards.css';
import DashCourse from './DashCourse';
import axios from 'axios';

 
 const ENDPOINT = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

export default function DashCards() {
  const SID=JSON.parse(localStorage.getItem("userInfo")).SID;


  const Api = `${ENDPOINT}/api/user/dashboard?SID=${SID}`;
  const [attendance , setattendance] = useState(100);
  const [notice , setnotice] = useState("");
  const [event, setevent] = useState("");
  const [TableData, setTableData] = useState([]);
  const [error, setError] = useState(null);

  
  const fetchApiData = async () => {
    const SID=JSON.parse(localStorage.getItem("userInfo")).SID;
    const role=JSON.parse(localStorage.getItem("userInfo")).role;
    console.log(SID);
    console.log(role);
    try {
      const response = await axios.get(Api,{
        SID:SID,
        role:role
      });
      console.log(response.data);
      setattendance(response.data?.attendance_data?.Overall_attendance);
      setnotice(response.data?.notice_board_data);
      setevent(response.data?.upcoming_events_data);
      setTableData(response.data?.time_table_data);
    } 
    catch (e) {
      setError(e);
      console.log(error);
    }
    

  }

  useEffect(() => {
    fetchApiData();
  }, []);
  


  return (
    <Box>
                {/* <p>{notice}</p> */}

      <Grid container>
        <h1>Welcome, Students</h1>
        <Grid container spacing={2} sx={{ marginTop: '16px' }}>
          <Grid item md={4} xs={12}>
            <Paper sx={{ marginTop: '16px', borderRadius:'20px',padding:'10px' }}>
              <DashCourse />
            </Paper>
            <Paper sx={{ marginTop: '20px', borderRadius:'20px' }}>
              <Events height={'320px'} event={event}/>
            </Paper>
          </Grid>
          <Grid item md={4} xs={12} sx={{ marginTop: '16px' }}>
            {attendance && <ProgressBar attendance={attendance} />}
            <TimeTable TableData={TableData}/>
          </Grid>
          <Grid item md={4} xs={12}>
            <Movable notice={notice}/>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}