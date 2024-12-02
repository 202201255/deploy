import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import DashCards from '../Components/Dashboard/DashCards2';
import Loader from './Loding';

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate a data fetch with a timeout
        const fetchData = async () => {
            setIsLoading(true);
            // Simulate a delay for fetching data
            await new Promise(resolve => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <Loader />; // Display the Loader component when loading
    }

    return (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
            {/* <Navbar /> */}
            <DashCards />
        </Box>
    );
}

export default Dashboard;