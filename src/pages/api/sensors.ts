import type { NextApiRequest, NextApiResponse } from 'next';

interface SensorData {
  distance: number; // Change this to only have distance if that's what you're sending
}

// Array to store distance readings
let distanceData: SensorData[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST request to receive new sensor readings
  if (req.method === 'POST') {
    const { distance }: { distance: number } = req.body;

    // Check if distance data already exists
    if (distance !== undefined) {
      // Store the distance value (you can store multiple readings, if needed)
      distanceData.push({ distance });

      // Respond with success message
      return res.status(200).json({ message: 'Distance data received successfully' });
    } else {
      return res.status(400).json({ message: 'Distance value is required' });
    }
  } 

  // Handle GET request to return the current distance readings
  if (req.method === 'GET') {
    return res.status(200).json(distanceData);
  }

  // If the method is not allowed
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
