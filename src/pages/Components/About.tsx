import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from "next/link";
import { FaUserCircle, FaGithub, FaLinkedin } from 'react-icons/fa';

export default function About() {
  const contributors = [
    {
      name: 'Muhammad Burhan Ahmed',
      role: 'Lead Engineer and Deep Learning Specialist',
      expertise: 'Oversaw the mechanical and electrical assembly, handled deep learning model training, data wrangling, and integrated the robotics control systems to ensure smooth operation of the pick-and-place robot.',
      github: 'https://github.com/your-github-username1',
      linkedin: 'https://linkedin.com/in/your-linkedin-username1',
      twitter: 'https://twitter.com/your-twitter-username1',
    },
    {
      name: 'Javeria Razzaq',
      role: 'Robotic Modelling and Control Specialist',
      expertise: 'Developed the mathematical models for the robotic arm, designed control algorithms, and fine-tuned arm movements for precise pick-and-place functionality.',
      github: 'https://github.com/your-github-username2',
      linkedin: 'https://linkedin.com/in/your-linkedin-username2',
      twitter: 'https://twitter.com/your-twitter-username2',
    },
    {
      name: 'Muhammad Ali Raza',
      role: 'Motivational Speaker',
      expertise: 'Provided emotional support when needed',
      github: 'https://github.com/your-github-username3',
      linkedin: 'https://linkedin.com/in/your-linkedin-username3',
      twitter: 'https://twitter.com/your-twitter-username3',
    },
  ];

  return (
    <div className="font-burh">
      <Head>
        <title>About.</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <motion.div
        className="bg-gradient-to-b from-green-500 to-green-800 min-h-screen px-4 md:px-8 lg:px-16" // Added responsive padding
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="pt-5 font-bold text-4xl text-center text-white">
          Pick and Place Robot
        </div>
        <div className="mt-6 text-lg text-gray-100 max-w-4xl mx-auto">
          <p>
            Our project focuses on the development of a highly efficient and versatile robotic arm capable of classifying and picking up various types of waste materials for recycling purposes. The robotic arm uses advanced deep learning techniques in combination with computer vision to identify different materials such as plastics, paper, and metals. The main objective is to enhance recycling efforts and contribute to sustainable waste management by automating the waste classification process.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src="/About/Robot.PNG"
            alt="Hardware and Robotic Arm"
            className="rounded-md shadow-lg max-w-lg w-full h-auto"
          />
        </div>

        <div className="mt-12 text-lg text-gray-100 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mt-8">Project Purpose</h2>
          <p>
            The primary aim of our project is to design and implement a pick-and-place robotic arm capable of efficiently classifying waste materials such as plastics, paper, and metals for recycling. By automating this process, we strive to reduce landfill waste and promote a circular economy through more efficient waste sorting.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link href="/Components/MoreAbout" className="text-white bg-black px-6 py-3 rounded-lg hover:bg-white hover:text-black">
            Technical Details
          </Link>
        </div>
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-center text-white">Supervisors</h2>
          <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto mt-4">
            {/* Supervisor */}
            <div className="bg-black rounded-lg shadow-md p-4 m-2 flex-1 flex flex-col items-center text-white">
              <FaUserCircle className="w-24 h-24 text-gray-400" />
              <h3 className="font-semibold my-3">Dr. Ayesha Salman</h3>
              <p>Role: Supervisor</p>
              <div className="flex-grow"></div>
              <div className="flex space-x-4 justify-center items-center mt-4">
                <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                  <FaLinkedin />
                </a>
              </div>
            </div>

            <div className="bg-black rounded-lg shadow-md p-4 m-2 flex-1 flex flex-col items-center text-white">
              <FaUserCircle className="w-24 h-24 text-gray-400" />
              <h3 className="font-semibold my-3">Engr. Ayesha Sadiq</h3>
              <p>Role: Co-Supervisor</p>
              <div className="flex-grow"></div>
              <div className="flex space-x-4 justify-center items-center mt-4">
                <a href="https://github.com/janesmith" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/in/janesmith" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-200">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold text-center text-white">Contributors</h2>
          <div className="flex flex-col md:flex-row justify-around max-w-4xl mx-auto mt-4">
            {contributors.map((member, index) => (
              <div key={index} className="bg-black rounded-lg shadow-md p-4 m-2 flex-1 flex flex-col items-center text-white">
                <FaUserCircle className="w-24 h-24 text-gray-400" />
                <h3 className="font-semibold my-3">{member.name}</h3>
                <p>Role: {member.role}</p>
                <p className="text-sm text-gray-300 my-2">{member.expertise}</p>
                <div className="flex-grow"></div>
                <div className="flex space-x-4 justify-center items-center mt-4">
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

        <footer className="mt-12 bg-white rounded-b rounded-2xl">
          <div className="text-center text-black py-10 text-xl">
            <p className="font-bold">Stay Connected</p>
            <p>Contact us for more information about our project.</p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
