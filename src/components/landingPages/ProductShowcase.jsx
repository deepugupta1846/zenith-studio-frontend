import React from "react";
import { Carousel } from "@mantine/carousel";
import { motion } from "framer-motion";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import "@mantine/carousel/styles.css";

const products = [
  {
    title: "Wedding Album",
    subtitle: "Premium quality glossy paper album",
    image: "/images/BRIDE IMAGE/jpg/arto-suraj1.jpg",
  },
  {
    title: "Event Coverage",
    subtitle: "Best for birthdays, parties, and concerts",
    image: "/images/cover/01.jpg",
  },
  {
    title: "Photo Frames",
    subtitle: "Custom framed memories to cherish",
    image: "/images/cover/02.jpg",
  },
  {
    title: "MUG",
    subtitle: "Printed and laminated office/school ID cards",
    image: "/images/MUG/01.jpg",
  },
];

export default function ProductShowcase() {
  return (
    <div className="min-h-screen bg-[#fdf8f1] py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center relative">
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

        <div className="relative">
          <Carousel
            withIndicators
            slideGap="xl" // Gaps between the slides
            slideSize="33.333333%"
            align="start"
            loop
            breakpoints={[
              { maxWidth: "md", slideSize: "50%" },
              { maxWidth: "sm", slideSize: "100%" },
            ]}
            controlSize={50}
            nextControlIcon={<IconChevronRight size={30} />}
            previousControlIcon={<IconChevronLeft size={30} />}
            styles={{
              control: {
                backgroundColor: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                color: "#e11d48",
                borderRadius: "9999px",
                border: "1px solid #e5e7eb",
              },
              controls: {
                top: "50%",
                transform: "translateY(-50%)",
              },
            }}
          >
            {products.map((product, index) => (
              <Carousel.Slide key={index}>
                <div className="group shadow-xl rounded-2xl overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.05] mx-2">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-5 text-left">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-500 transition duration-200">
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1 mb-4">{product.subtitle}</p>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-200">
                      Learn More
                    </button>
                  </div>
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
