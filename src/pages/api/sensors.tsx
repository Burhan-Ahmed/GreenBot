import type { NextApiRequest, NextApiResponse } from 'next';

let currentDistance: number = 0; // Store the latest distance reading

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { distance } = req.body;
    currentDistance = distance; // Update the stored distance
    return res.status(200).json({ message: 'Distance updated' });
  } else if (req.method === 'GET') {
    return res.status(200).json({ distance: currentDistance }); // Send the latest distance
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
