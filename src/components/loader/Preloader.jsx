import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader() {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
  const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

  const curveTransition = {
    duration: 0.8,
    delay: 1.5,
    ease: [0.76, 0, 0.24, 1]
  };

  return (
    <motion.div
      initial={{ top: 0 }}
      animate={{ top: "-100vh" }}
      transition={{ ...curveTransition, delay: 1.7 }} // Delay slightly after the path animation
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-transparent"
    >
      {dimension.width > 0 && (
        <>
          {/* Mint Green SVG Loader with Rounded/Curved Bottom */}
          <svg className="absolute top-0 w-full h-[calc(100%+300px)]">
            <motion.path
              initial={{ d: initialPath }}
              animate={{ d: targetPath }}
              transition={curveTransition}
              fill="#B2F5EA"
            />
          </svg>

          {/* Centered Logo Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 text-black font-bold text-4xl tracking-tighter"
          >
            Saikat Kumar Mondal
          </motion.div>
        </>
      )}
    </motion.div>
  );
}