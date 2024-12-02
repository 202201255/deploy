import React, { useState, useEffect } from 'react';
import DashCards from '../Components/Dashboard/ProfCards';
import Loader from '../Pages/Loding'; // Import the Loader component

function ProfDashboard() {
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
    <div>
      <DashCards />
    </div>
  );
}

export default ProfDashboard;