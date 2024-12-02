import React, { useState, useEffect } from 'react';
import FeePayments from '../Components/FeesPayment/FeePayments';
import InformationDetails from '../Components/FeesPayment/InformationDetails';
import Loader from '../Pages/Loding'; // Import the Loader component

const FeePays = () => {
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
    <div style={{ backgroundColor: '#f0f4f8' }}>
      {/* <InformationDetails /> */}
      <FeePayments />
    </div>
  );
};

export default FeePays;