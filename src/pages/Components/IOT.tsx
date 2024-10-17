import { useEffect, useState } from 'react';

const DisplayNumber = () => {
    const [number, setNumber] = useState<number | null>(null); // Explicitly define the type

    const fetchNumber = async () => {
        try {
            const response = await fetch('/api/sensors'); // Change the endpoint to the correct API route
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`); // Handle non-200 responses
            }
            const data = await response.json();
            setNumber(data.latestNumber);
        } catch (error) {
            console.error('Error fetching number:', error);
            setNumber(null); // Reset to null if there's an error
        }
    };

    useEffect(() => {
        // Fetch number every 5 seconds
        const interval = setInterval(() => {
            fetchNumber();
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Latest Number from ESP32</h1>
            <p>{number !== null ? number : "No data received yet."}</p>
        </div>
    );
};

export default DisplayNumber;
