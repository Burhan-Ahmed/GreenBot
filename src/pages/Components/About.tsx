import { motion } from 'framer-motion';
import { FaUserCircle, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function About() {
  const contributors = [
    {
      name: 'Muhammad Burhan Ahmed',
      role: 'Software Specialist',
      expertise: 'Expert in programming and electronics, focusing on improving efficiency.',
      github: 'https://github.com/your-github-username1',
      linkedin: 'https://linkedin.com/in/your-linkedin-username1',
      twitter: 'https://twitter.com/your-twitter-username1',
    },
    {
      name: 'Javeria Razzaq',
      role: 'Hardware Specialist',
      expertise: 'Expert in electronics and robotics.',
      github: 'https://github.com/your-github-username2',
      linkedin: 'https://linkedin.com/in/your-linkedin-username2',
      twitter: 'https://twitter.com/your-twitter-username2',
    },
    {
      name: 'Muhammad Ali Raza',
      role: 'None',
      expertise: 'General contributor with various skills.',
      github: 'https://github.com/your-github-username3',
      linkedin: 'https://linkedin.com/in/your-linkedin-username3',
      twitter: 'https://twitter.com/your-twitter-username3',
    },
  ];

  return (
    <motion.div
      className="bg-gradient-to-b from-green-500 to-green-800 min-h-screen px-4 md:px-8 lg:px-16" // Added responsive padding
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="pt-5 font-bold text-4xl text-center text-white">
        About Our Robotic Arm Project
      </div>
      <div className="mt-6 text-lg text-gray-100 max-w-4xl mx-auto">
        <p>
          Our project revolves around an innovative robotic arm designed to classify solid waste, including plastics, paper, and metals, using Arduino and advanced computer vision techniques. This technology not only improves recycling efficiency but also helps promote sustainable waste management practices.
        </p>
        <p className="mt-4">
          Additionally, our site provides real-time data on the levels of waste in bins, ensuring efficient waste collection and monitoring. By leveraging IoT and computer vision, we aim to make waste classification easier and more effective for communities.
        </p>
      </div>
      <div className="mt-8 flex justify-center">
        <img
          src="/About/Robot.png"
          alt="Robotic Arm"
          className="rounded-md shadow-lg max-w-lg w-full h-auto"
        />
      </div>

      <div className="mt-12 text-lg text-gray-100 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mt-8">Purpose</h2>
        <p>
          The primary purpose of our robotic arm is to enhance recycling efforts by accurately classifying different types of waste materials. This will help in reducing landfill waste and promoting a circular economy.
        </p>

        <h2 className="text-xl font-semibold mt-8">Hardware Specifications</h2>
        <ul className="list-disc list-inside text-gray-100">
          <li>Arduino UNO</li>
          <li>MG996R Servo Motors</li>
          <li>Camera Module for Computer Vision</li>
          <li>IR Sensors for Obstacle Detection</li>
          <li>Chassis and Arm Structure</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8">Software Specifications</h2>
        <ul className="list-disc list-inside text-gray-100">
          <li>Arduino IDE for Embedded Programming</li>
          <li>OpenCV for Image Processing</li>
          <li>Python for Data Analysis</li>
          <li>NextJs for Web Application</li>
        </ul>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-center text-white">Contributors</h2>
        <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto mt-4">
          {contributors.map((member, index) => (
            <div key={index} className="bg-black rounded-lg shadow-md p-4 m-2 flex-1 flex flex-col items-center text-white">
              <FaUserCircle className="w-24 h-24 text-gray-400" />
              <h3 className="font-semibold">{member.name}</h3>
              <p>Role: {member.role}</p>
              <p className="text-sm text-gray-300">{member.expertise}</p>
              <div className="flex space-x-4 mt-2">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                  <FaGithub />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-12 bg-white">
        <div className="text-center text-black">
          <p className="font-semibold">Stay Connected</p>
          <p>Contact us for more information about our project.</p>
        </div>
      </footer>
    </motion.div>
  );
}
