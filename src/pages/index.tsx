import { useEffect, useState } from "react";
import Link from "next/link";
import Head from 'next/head';
export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  // Use useEffect to trigger the fade-in effect when the component mounts
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 300); // Adjust delay for smooth fade-in
  }, []);

  return (
    <>
      <Head>
        <title>GreenBot.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Prevent scrollbar on body */}
      <style jsx global>{`
        body {
          margin: 0; /* Remove default margin */
          overflow: hidden; /* Prevent scrolling */
        }
      `}</style>

      {/* Main content area */}
      <div
        className={`h-screen font-burh transition-opacity duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"} 
          flex justify-center items-center bg-gradient-to-b from-green-500 to-green-800`}
      >
        <div className="max-w-4xl text-center px-4 py-10 md:px-6">
          {/* Main content wrapper */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Green Revolution!
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
            Greenbot is an innovative robotic solution designed to classify solid
            waste and monitor bin levels in real-time. With cutting-edge
            technology, we aim to enhance recycling efforts and promote a cleaner,
            greener environment.
          </p>
          {/* Call to Action Button */}
          <Link href="/Components/About">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
