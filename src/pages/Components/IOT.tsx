import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define the structure of distance data
interface DistanceData {
  distance: number; // Distance value received from the API
}

const maxRange = 20; // Maximum sensor range in cm

export default function IOT() {
  const [distanceData, setDistanceData] = useState<DistanceData[]>([]); // Initialize as an empty array

  // Fetch distance data from API every 2 seconds
  useEffect(() => {
    const fetchDistanceData = async () => {
      try {
        const response = await fetch('/api/sensors'); // Adjust endpoint as necessary
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: DistanceData[] = await response.json();
        setDistanceData(data);
      } catch (error) {
        console.error('Failed to fetch distance data:', error);
      }
    };

    const interval = setInterval(fetchDistanceData, 2000); // Fetch data every 2 seconds
    fetchDistanceData(); // Fetch data immediately on mount
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-gradient-to-b from-green-500 to-green-800 p-6 rounded-lg shadow-lg">
      <div className="font-bold text-2xl mb-4 text-white">IoT Distance Sensor Data</div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {distanceData.length > 0 ? (
          distanceData.map((sensor, index) => {
            const chartData = {
              labels: ['Measured Distance', 'Remaining Distance'],
              datasets: [
                {
                  label: `Sensor ${index + 1}`,
                  data: [sensor.distance, maxRange - sensor.distance],
                  backgroundColor: [
                    'rgba(75, 192, 192, 0.6)', // Measured distance color
                    'rgba(211, 211, 211, 0.6)', // Remaining distance color
                  ],
                  borderColor: 'rgba(255, 255, 255, 1)',
                  borderWidth: 2,
                },
              ],
            };

            return (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center h-full"
              >
                <h2 className="text-lg font-semibold text-green-700">Distance Sensor {index + 1}</h2>
                <div className="mt-2 text-gray-600">Measured Distance: {sensor.distance} cm</div>
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
                <div className="mt-1 h-4 bg-gray-300 rounded-full overflow-hidden w-full">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${(sensor.distance / maxRange) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-green-600 w-full text-right">
                  {(sensor.distance / maxRange * 100).toFixed(1)}%
                </span>
              </div>
            );
          })
        ) : (
          <div className="text-center text-white">No distance data available</div>
        )}
      </div>
    </div>
  );
}
