import React, { useState, useEffect } from 'react';
import ScholarshipDetails from '../Components/Scholarship/ScholarshipDetails';
import Loader from '../Pages/Loding'; // Import the Loader component

const Scholarship = () => {
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
    <ScholarshipDetails />
  );
};

export default Scholarship;