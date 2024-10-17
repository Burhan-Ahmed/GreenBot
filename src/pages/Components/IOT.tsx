import { useEffect, useState } from 'react';

const DisplayNumber = () => {
    const [number, setNumber] = useState(null);

    const fetchNumber = async () => {
        const response = await fetch('/Components/IOT');
        const data = await response.json();
        setNumber(data.latestNumber);
    };

    useEffect(() => {
        // Fetch number every 5 seconds
        const interval = setInterval(() => {
            fetchNumber();
        }, 5000);

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
