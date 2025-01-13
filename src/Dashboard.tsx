import React, { useEffect, useState, useMemo } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import './App.css';

type VehicleData = {
  Make: string;
  Model: string;
  Model_Year: string;
  State: string;
  Country: string;
  Electric_Range: string;
};

const Dashboard: React.FC = () => {
  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to load CSV data in chunks (optimized)
  const loadCSVData = (url: string, chunkSize: number) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      chunk: (results) => {
        setVehicleData((prevData) => [...prevData, ...(results.data as VehicleData[])]);
      },
      complete: () => setLoading(false),
    });
  };

  // useEffect to load CSV data
  useEffect(() => {
    loadCSVData('/Electric_Vehicle_Population_Data.csv', 1000); // Load in chunks of 1000 rows
  }, []);

  // Memoize charts to prevent re-renders on every data change
  const barChart = useMemo(() => {
    return (
      <BarChart width={900} height={500} data={vehicleData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Model_Year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Model" fill="#82ca9d" />
      </BarChart>
    );
  }, [vehicleData]);

  const lineChart = useMemo(() => {
    return (
      <LineChart width={900} height={300} data={vehicleData}>
        <XAxis dataKey="Model_Year" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Electric_Range" stroke="#8884d8" />
      </LineChart>
    );
  }, [vehicleData]);

  return (
    <div className="dashboard">
      <h1>Electric Vehicle Population Dashboard</h1>

      {/* Display Summary Statistics */}
      <section>
        <h2>Summary Metrics</h2>
        <p>Total Vehicles: {loading ? "Loading Data..." : vehicleData.length}</p>
      </section>

      {/* Bar Chart: Vehicles by Year */}
      <section>
        <h2>Vehicle Registrations Over Years</h2>
        {barChart}
      </section>

      {/* Line Chart Example */}
      <section>
        <h2>Battery Capacity Trends</h2>
        {lineChart}
      </section>
    </div>
  );
};

export default Dashboard;
