// pages/api/sensors.ts

import type { NextApiRequest, NextApiResponse } from 'next';

let latestNumber: number | null = null;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body; // Access the body of the request
        latestNumber = data.number; // Log the number
        console.log("Received number:", latestNumber);
        return res.status(200).json({ success: true });
    } else if (req.method === 'GET') {
        // For GET request, you could return the latest number if needed
        return res.status(200).json({ latestNumber });
    } else {
        // Handle any other HTTP method
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
