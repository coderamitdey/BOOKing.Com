import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Banner = () => {
  const slides = [
    {
      id: 1,
      img: "https://i.ibb.co/qYPDfV4x/room.jpg",
      title: "Luxury Rooms",
      text: "Experience comfort and elegance in our premium suites.",
    },
    {
      id: 2,
      img: "https://i.ibb.co/RGbJHs4S/dining.jpg",
      title: "Fine Dining",
      text: "Savor gourmet dishes at our exclusive restaurant.",
    },
    {
      id: 3,
      img: "https://i.ibb.co/qLHt3jcS/spa.jpg",
      title: "Spa & Wellness",
      text: "Relax and rejuvenate in our world-class spa facilities.",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${slides[current].img})` }}
        ></motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white p-4">
        <motion.h2
          key={slides[current].title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg"
        >
          {slides[current].title}
        </motion.h2>

        <motion.p
          key={slides[current].text}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-md md:max-w-lg  drop-shadow-md"
        >
          {slides[current].text}
        </motion.p>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              current === index
                ? "bg-orange-500"
                : "bg-gray-400 hover:bg-orange-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;
