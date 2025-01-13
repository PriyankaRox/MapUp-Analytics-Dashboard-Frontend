import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts';
import './App.css';

type VehicleData = {
  Make: string;
  Model: string;
  Year: string;
  Country: string;
  Model_Year: string;
};

const Dashboard: React.FC = () => {
  const [vehicleData, setVehicleData] = useState<VehicleData[]>([]);

  // Fetch and parse CSV data
  useEffect(() => {
    Papa.parse('/Electric_Vehicle_Population_Data.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("data", result.data);
        setVehicleData(result.data as VehicleData[]);
      },
    });
 }, []);

 useEffect(() => {
    console.log("Updated vehicleData", vehicleData);
  }, [vehicleData]);

  return (
    <div className="dashboard">
      <h1>Electric Vehicle Population Dashboard</h1>

      {/* Display Summary Statistics */}
      <section>
        <h2>Summary Metrics</h2>
        <p>Total Vehicles: {vehicleData.length === 0 ? "Loading Data":vehicleData.length}</p>
      </section>

      {/* Bar Chart: Vehicles by Year */}
      <section>
        <h2>Vehicle Registrations Over Years</h2>
        <BarChart width={800} height={500} data={vehicleData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Model" fill="#82ca9d" />
        </BarChart>
      </section>

      {/* Line Chart Example */}
      <section>
        <h2>Battery Capacity Trends</h2>
        <LineChart width={600} height={300} data={vehicleData}>
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="Model_Year" stroke="#8884d8" />
        </LineChart>
      </section>
    </div>
  );
};

export default Dashboard;
