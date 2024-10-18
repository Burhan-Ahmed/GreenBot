import type { NextApiRequest, NextApiResponse } from 'next';

// Store the latest sensor readings
interface SensorData {
  sensor1: number | null;
  sensor2: number | null;
  sensor3: number | null;
}

let latestReadings: SensorData = { sensor1: null, sensor2: null, sensor3: null };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { sensor1, sensor2, sensor3 } = req.body; // Destructure the sensor data

        // Validate incoming data
        if (typeof sensor1 === 'number' && typeof sensor2 === 'number' && typeof sensor3 === 'number') {
            // Store the latest readings
            latestReadings = { sensor1, sensor2, sensor3 };
            console.log("Received data:", latestReadings);

            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ error: "Invalid data format" });
        }
    } else if (req.method === 'GET') {
        // Return the latest sensor readings
        return res.status(200).json(latestReadings);
    } else {
        // Handle any other HTTP method
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
