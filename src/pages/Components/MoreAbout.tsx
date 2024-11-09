import { motion } from 'framer-motion';
import Head from 'next/head';

export default function MoreAbout() {

    return (
        <>
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
                    About Our Pick and Place Robotic Arm Project
                </div>

                <div className="mt-6 text-lg text-gray-100 max-w-4xl mx-auto">
                    <p>
                        Our project focuses on the development of a highly efficient and versatile robotic arm capable of classifying and picking up various types of waste materials for recycling purposes. The robotic arm uses advanced deep learning techniques in combination with computer vision to identify different materials such as plastics, paper, and metals. The main objective is to enhance recycling efforts and contribute to sustainable waste management by automating the waste classification process.
                    </p>
                    <p className="mt-4">
                        The project integrates several key aspects, including mechanical design, electrical assembly, deep learning model development, and data wrangling. We have used state-of-the-art hardware components, including an Arduino, NEMA 17 stepper motor, servo motors, and various sensors, to ensure smooth and precise operation. Our deep learning model, trained using Python and Jupyter Notebook, aids in the waste material classification process.
                    </p>
                    <p className="mt-4">
                        Furthermore, the robotic arm is integrated with a real-time waste tracking system using IoT sensors, providing data on waste levels in bins. This helps ensure timely and efficient waste collection. Our web application, built with Next.js, TypeScript, and Tailwind CSS, displays this data and provides a user-friendly interface for monitoring and controlling the robotic arm.
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

                    <h2 className="text-xl font-semibold mt-8">Mechanical and Electrical Assembly</h2>
                    <p>
                        Our robotic arm is built using high-quality materials and components to ensure precision and durability. The mechanical assembly includes a combination of 2020 profile extrusions, L-shaped corner brackets, and various screws and nuts to form a sturdy frame. The arm's mechanical movement is powered by a combination of NEMA 17 stepper motors for horizontal and vertical motion, along with MG996R and SG90R servo motors for fine control.
                    </p>
                    <ul className="list-disc list-inside text-gray-100 mt-4">
                        <li>2020 Profile Extrusions and L-shaped Corner Brackets</li>
                        <li>Linear Shaft Rods and Aluminum Rods for Arm Support</li>
                        <li>20 Teeth 5mm Bore Timing Belt with Idler and Pulley</li>
                        <li>PLA+ Material for 3D Printing the Robotic Arm Parts</li>
                        <li>M2 Screws, Nuts, and M3, M4 Screws with T-Nuts</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8">Deep Learning and Data Wrangling</h2>
                    <p>
                        For waste material classification, we have trained a deep learning model using advanced techniques. We used Python and Jupyter Notebook for model training, leveraging datasets of labeled waste images. The model was trained to accurately classify different materials based on visual features, using object detection algorithms to identify the waste in real time. The data wrangling process involved cleaning and augmenting the data for improved accuracy and generalization of the model.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">Training Tools and Annotation</h2>
                    <p>
                        The dataset was annotated using tools like LabelImg, CVAT, and Roboflow, allowing us to label various objects in the images, including plastics, paper, and metal waste. These annotated images were used to train the object detection model, which was fine-tuned using hyperparameter optimization for better accuracy and performance.
                    </p>

                    <h2 className="text-xl font-semibold mt-8">Software Specifications</h2>
                    <ul className="list-disc list-inside text-gray-100">
                        <li>Python and Jupyter Notebook for Deep Learning Model Development</li>
                        <li>OpenCV for Image Processing and Computer Vision</li>
                        <li>TensorFlow/PyTorch for Object Detection Model</li>
                        <li>Next.js and TypeScript for Web Application Development</li>
                        <li>Tailwind CSS and Material UI for Frontend Styling</li>
                        <li>Framer Motion for Interactive UI Animations</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8">Hardware Specifications</h2>
                    <ul className="list-disc list-inside text-gray-100">
                        <li>Arduino UNO with CNC Shield for Motor Control</li>
                        <li>NEMA 17 Stepper Motor for Precise Movement</li>
                        <li>MG996R and SG90R Servo Motors for Arm Rotation</li>
                        <li>Aukey 1080p Camera for Real-Time Image Capture</li>
                        <li>IR Sensors for Obstacle Detection and Avoidance</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-8">Robotic Arm Design</h2>
                    <p>
                        The design of the robotic arm itself is a combination of 3D-printed PLA+ parts, along with aluminum rods for extra support. The arm is capable of precise movement, which allows it to pick up and place waste materials into the appropriate bins. The use of PLA+ for 3D printing ensures that the arm is both lightweight and strong, making it suitable for handling the typical waste materials in our project.
                    </p>
                </div>
            </motion.div>
        </>
    );
}
