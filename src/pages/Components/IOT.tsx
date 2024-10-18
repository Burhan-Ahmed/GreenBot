import { useEffect, useState } from 'react';

interface SensorData {
    sensor1: number | null;
    sensor2: number | null;
    sensor3: number | null;
}

const DisplaySensors = () => {
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
        // Fetch data every 5 seconds
        const interval = setInterval(fetchSensorData, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Latest Sensor Readings</h1>
            <p>Sensor 1: {sensorData.sensor1 !== null ? `${sensorData.sensor1} cm` : "No data"}</p>
            <p>Sensor 2: {sensorData.sensor2 !== null ? `${sensorData.sensor2} cm` : "No data"}</p>
            <p>Sensor 3: {sensorData.sensor3 !== null ? `${sensorData.sensor3} cm` : "No data"}</p>
        </div>
    );
};

export default DisplaySensors;
