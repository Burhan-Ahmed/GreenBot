import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.body.style.backgroundImage =
      'url("/LandingPage/jozsef-hocza-mzovOU99uSI-unsplash.jpg")';
    document.body.style.backgroundSize = "cover"; // Ensures the image covers the entire background
    document.body.style.backgroundPosition = "center"; // Centers the background image
    document.body.style.backgroundRepeat = "no-repeat"; // Prevents the image from repeating
    document.body.style.backgroundAttachment = "fixed"; // Makes the background fixed

    // Set visibility after a short delay to trigger the fade-in
    const timer = setTimeout(() => setIsVisible(true), 5); // Adjust the delay as needed

    return () => {
      document.body.style.backgroundImage = "none"; // Clean up the style on unmount
      clearTimeout(timer); // Clear timer on unmount
    };
  }, []);

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="ms-64 font-burh mt-52 flex flex-col text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Green Revolution!</h1>
        <p className="text-lg md:text-xl mb-6 w-1/3">
          Greenbot is an innovative robotic solution designed to classify solid waste
          and monitor bin levels in real time. With cutting-edge technology, we aim to
          enhance recycling efforts and promote a cleaner, greener environment.
        </p>
        <button className="bg-green-500 w-fit hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          <Link href="./Components/About">Learn More</Link>
        </button>
      </div>
    </div>
  );
}
