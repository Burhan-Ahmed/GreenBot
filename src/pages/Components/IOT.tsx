import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the structure of sensor data
interface SensorData {
  name: string;
  reading: number;
  count: number;
}

const maxRange = 20; // Maximum sensor range in cm

export default function IOT() {
  const [sensorData, setSensorData] = useState<SensorData[]>([
    { name: "Box 1 (Plastic)", reading: 0, count: 0 },
    { name: "Box 2 (Paper)", reading: 0, count: 0 },
    { name: "Box 3 (Metal)", reading: 0, count: 0 },
  ]);

  // Fetch sensor data from API every 2 seconds
  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch('/api/sensors');
        const data: SensorData[] = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      }
    };

    const interval = setInterval(fetchSensorData, 2000); // Fetch data every 2 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-500 to-green-800 p-6 rounded-lg shadow-lg">
      <div className="font-bold text-2xl mb-4 text-white">IoT Sensor Data</div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sensorData.map((sensor) => {
          const chartData = {
            labels: ['Filled', 'Unoccupied'],
            datasets: [
              {
                label: sensor.name,
                data: [sensor.reading, maxRange - sensor.reading], // Display remaining range
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)', // Sensor reading color
                  'rgba(211, 211, 211, 0.6)', // Remaining range color
                ],
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 2,
              },
            ],
          };

          return (
            <div
              key={sensor.name}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center h-full"
            >
              <h2 className="text-lg font-semibold text-green-700">{sensor.name}</h2>
              <div className="mt-2 text-gray-600">Items in Bin: {sensor.count}</div>
              <div className="mt-4 h-36 w-full flex justify-center items-center">
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                        labels: { color: '#333' },
                      },
                      tooltip: {
                        callbacks: {
                          label: (context) => {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            return `${label}: ${value} cm`;
                          },
                        },
                      },
                    },
                  }}
                  height={200}
                />
              </div>
              <div className="mt-2 flex justify-between w-full">
                <span className="text-gray-700">Reading:</span>
                <span className="text-green-600">{sensor.reading} cm</span>
              </div>
              <div className="mt-1 h-4 bg-gray-300 rounded-full overflow-hidden w-full">
                <div
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ width: `${(sensor.reading / maxRange) * 100}%` }}
                />
              </div>
              <span className="text-xs text-green-600 w-full text-right">
                {(sensor.reading / maxRange * 100).toFixed(1)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
