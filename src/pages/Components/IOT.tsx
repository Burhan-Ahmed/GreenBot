import { useEffect, useState } from 'react';

const LatestNumberDisplay = () => {
    const [latestNumber, setLatestNumber] = useState<number | null>(null);

    useEffect(() => {
        const fetchLatestNumber = async () => {
            const response = await fetch('/api/sensors');
            const data = await response.json();
            setLatestNumber(data.latestNumber);
        };

        // Fetch the latest number every 5 seconds
        const interval = setInterval(fetchLatestNumber, 5000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div>
            <h1>Latest Number: {latestNumber}</h1>
        </div>
    );
};

export default LatestNumberDisplay;
