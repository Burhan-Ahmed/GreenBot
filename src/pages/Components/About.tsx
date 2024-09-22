import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

export default function About() {
  return (
    <motion.div
      className="bg-green-100 min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-burh text-2xl mt-12 text-center text-black">
        About Our Robotic Arm Project
      </div>
      <div className="mt-6 text-lg text-gray-800 max-w-4xl mx-auto">
        <p>
          Our project revolves around an innovative robotic arm designed to classify solid waste, including plastics, paper, and metals, using Arduino and advanced computer vision techniques. This technology not only improves recycling efficiency but also helps promote sustainable waste management practices.
        </p>
        <p className="mt-4">
          Additionally, our site provides real-time data on the levels of waste in bins, ensuring efficient waste collection and monitoring. By leveraging IoT and computer vision, we aim to make waste classification easier and more effective for communities.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/path/to/robot-image.jpg"
          alt="Robotic Arm"
          className="rounded-lg shadow-lg max-w-xs w-full"
        />
      </div>

      <div className="mt-12 text-lg text-gray-800 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mt-8">Purpose</h2>
        <p>
          The primary purpose of our robotic arm is to enhance recycling efforts by accurately classifying different types of waste materials. This will help in reducing landfill waste and promoting a circular economy.
        </p>

        <h2 className="text-xl font-semibold mt-8">Hardware Specifications</h2>
        <ul className="list-disc list-inside">
          <li>Arduino UNO</li>
          <li>MG996R Servo Motors</li>
          <li>Camera Module for Computer Vision</li>
          <li>IR Sensors for Obstacle Detection</li>
          <li>Chassis and Arm Structure</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Software Specifications</h2>
        <ul className="list-disc list-inside">
          <li>Arduino IDE for Embedded Programming</li>
          <li>OpenCV for Image Processing</li>
          <li>Python for Data Analysis</li>
          <li>NextJs for Web Application</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-center">Contributors</h2>
        <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto mt-4">
          {['Muhammad Burhan Ahmed', 'Javeria Razzaq', 'Muhammad Ali Raza'].map((name, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4 m-2 flex-1 flex flex-col items-center">
              <FaUserCircle className="w-24 h-24 text-gray-400 mb-2" />
              <h3 className="font-semibold">{name}</h3>
              <p>Role: {index === 2 ? 'None' : (index === 0 ? 'Software Specialist' : 'Hardware Specialist')}</p>
              <p>Expertise in programming Lorem simply dummy the electronic remaining essentially unchanged.</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-12 bg-green-200 p-4">
        <div className="text-center text-black">
          <p className="font-semibold">Stay Connected</p>
          <p>Contact us for more information about our project.</p>
        </div>
      </footer>
    </motion.div>
  );
}
