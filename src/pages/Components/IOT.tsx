// SensorFeedPage.tsx
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the SensorData interface
interface SensorData {
  sensor1: number | null; // Distance for sensor 1
  sensor2: number | null; // Distance for sensor 2
  sensor3: number | null; // Distance for sensor 3
}

const SensorFeedPage: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData>({
    sensor1: null,
    sensor2: null,
    sensor3: null,
  });

  const fetchSensorData = async () => {
    try {
      const response = await fetch('/api/sensors'); // Fetch data from the updated API
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`); // Handle non-200 responses
      }
      const data: SensorData = await response.json(); // Expect data in the correct format
      setSensorData(data);
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      setSensorData({ sensor1: null, sensor2: null, sensor3: null }); // Reset to nulls on error
    }
  };

  useEffect(() => {
    // Fetch data immediately on component mount and then every 5 seconds
    fetchSensorData(); // Fetch immediately on mount
    const interval = setInterval(fetchSensorData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Create a sensors array for rendering
const sensors = [
  { id: 1, name: "Plastic", distance: sensorData.sensor1, maxDepth: 11.94 },
  { id: 2, name: "Paper", distance: sensorData.sensor2, maxDepth: 11.51 },
  { id: 3, name: "Metal", distance: sensorData.sensor3, maxDepth: 12.18 },
];


  return (
    <div className="bg-green-500 p-4 overflow-hidden font-burh">
      <header className="text-center py-3 border-b-2 border-t-2 border-white text-white text-4xl my-10">
        IoT Sensor Data
      </header>

      <div className="flex flex-col my-12 md:flex-row justify-around mt-4 space-y-4 md:space-y-0 md:space-x-4">
        {sensors.map((sensor) => {
          // Calculate fill percentage: higher distance means lower fill percentage
          const fillPercentage = sensor.distance !== null
  ? Math.max(0, Math.min(100, ((sensor.maxDepth - sensor.distance) / sensor.maxDepth) * 100))
  : 0;


          // Determine colors based on the `filled` value
          const isCritical = fillPercentage >= 80; // Define critical fill level
          const pieColors = isCritical
            ? ["#FF7043", "#FFCCBC"] // Red theme
            : ["#4DB6AC", "#E0E0E0"]; // Green theme
          const barColor = isCritical ? "bg-red-500" : "bg-green-500";
          const textColor = isCritical ? "text-red-700" : "text-green-700";

          return (
            <div
              key={sensor.id}
              className="bg-white shadow-md rounded-md space-y-5 p-3 w-full md:w-1/3"
            >
              <h2 className={`text-2xl text-center font-semibold ${textColor}`}>
                Box {sensor.id} ({sensor.name})
              </h2>

              <div className="h-60">
                <Pie
                  data={{
                    labels: ["Filled", "Unoccupied"],
                    datasets: [
                      {
                        data: [fillPercentage, 100 - fillPercentage],
                        backgroundColor: pieColors,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                  }}
                />
              </div>

              {/* Color Legend */}
              <div className="flex justify-end space-x-5 mt-2 text-s">
                <div className="flex items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mr-1`}
                    style={{ backgroundColor: pieColors[0] }}
                  ></div>
                  <span>Filled</span>
                </div>
                <div className="flex items-center">
                  <div
                    className={`w-2.5 h-2.5 rounded-full mr-1`}
                    style={{ backgroundColor: pieColors[1] }}
                  ></div>
                  <span>Unoccupied</span>
                </div>
              </div>

              {/* Distance and Progress Bar */}
              <div className="mt-2">
                <p className="text-s">Distance: {sensor.distance ? `${sensor.distance} cm` : "No data"}</p>
                <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div
                    className={`h-4 rounded-full ${barColor} transition-all duration-300`}
                    style={{ width: `${fillPercentage}%` }} // Use fillPercentage for the width
                  />
                </div>
                <p className={`text-right ${textColor} text-s mt-1`}>
                  {sensor.distance !== null ? `${fillPercentage.toFixed(1)}%` : "No data"} {/* Display fill percentage */}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SensorFeedPage;
