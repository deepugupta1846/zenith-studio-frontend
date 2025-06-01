import React from "react";
import { Carousel } from "@mantine/carousel";
import { motion } from "framer-motion";
import "@mantine/carousel/styles.css";

const products = [
  {
    title: "Wedding Album",
    subtitle: "Premium quality glossy paper album",
    image: "/images/wedding.jpg",
  },
  {
    title: "Event Coverage",
    subtitle: "Best for birthdays, parties, and concerts",
    image: "/images/event.jpg",
  },
  {
    title: "Photo Frames",
    subtitle: "Custom framed memories to cherish",
    image: "/images/frame.jpg",
  },
  {
    title: "ID Cards",
    subtitle: "Printed and laminated office/school ID cards",
    image: "/images/idcard.jpg",
  },
];

export default function ProductShowcase() {
  return (
    <div className="min-h-screen bg-[#fdf8f1] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-red-600 mb-4"
        >
          Explore Our Creations
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 mb-12"
        >
          From stunning wedding albums to stylish photo frames — discover what we can do!
        </motion.p>

        <Carousel
          withIndicators
          controlSize={40}
          controlsOffset="xs"
          slideSize="33.333333%"
          slideGap="xl"
          loop
          align="start"
          breakpoints={[
            { maxWidth: "md", slideSize: "50%" },
            { maxWidth: "sm", slideSize: "100%" },
          ]}
          className="rounded-xl"
        >
          {products.map((product, index) => (
            <Carousel.Slide key={index}>
              <div className="shadow-lg rounded-xl overflow-hidden bg-white dark:bg-neutral transition duration-300 hover:shadow-xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-red-500">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 mb-4">
                    {product.subtitle}
                  </p>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-lg transition duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
