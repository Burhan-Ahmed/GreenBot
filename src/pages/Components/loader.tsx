import { motion } from 'framer-motion';

export default function Loader() {
    const triangleVertices = [
        { x: 0, y: -50 },
        { x: -50, y: 50 },
        { x: 50, y: 50 },
    ];

    const duration = 1.7;

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            {triangleVertices.map((_, index) => (
                <motion.div
                    key={index}
                    className="w-5 h-5 bg-green-500 rounded-full absolute"
                    initial={{ x: triangleVertices[index].x, y: triangleVertices[index].y }}
                    animate={{
                        x: [
                            triangleVertices[index].x,
                            triangleVertices[(index + 1) % 3].x,
                            triangleVertices[(index + 2) % 3].x,
                            triangleVertices[index].x,
                        ],
                        y: [
                            triangleVertices[index].y,
                            triangleVertices[(index + 1) % 3].y,
                            triangleVertices[(index + 2) % 3].y,
                            triangleVertices[index].y,
                        ],
                    }}
                    transition={{
                        duration: duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
