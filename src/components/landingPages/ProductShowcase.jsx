import React from "react";
import Slider from "react-slick";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { motion } from "framer-motion";

// Product data
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

const ProductShowcase = () => {
  const settings = {
    infinite: true,
    centerMode: true,
    
    centerPadding: "10%", // This creates space between slides
    slidesToShow: 3,  // Show 3 slides by default on larger screens
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2, // Show 2 slides on tablets
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 1, // Show 1 slide on mobile
          centerMode: false, // Disable center mode on mobile for better layout
        },
      },
    ],
    prevArrow: <IconChevronLeft size={30} className="slick-prev" />,
    nextArrow: <IconChevronRight size={30} className="slick-next" />,
  };

  return (
    <div className="min-h-screen bg-[#fdf8f1] py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto text-center relative">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-red-600 mb-4"
        >
          Explore Our Creations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 mb-12"
        >
          From stunning wedding albums to stylish photo frames — discover what we can do!
        </motion.p>

        <Slider {...settings}>
          {products.map((product, index) => (
            <div key={index} style={{marginLeft: index === 0 ? '0' : '20px'}}>
              <div className="group shadow-xl rounded-2xl overflow-hidden bg-white transition-transform duration-300 hover:scale-[1.05] mx-2 w-full ms-[20px]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="p-4 sm:p-5 text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-red-500 transition duration-200">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 mb-4">{product.subtitle}</p>
                  <button className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm sm:text-base px-4 py-2 rounded-lg shadow-md transition duration-200">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductShowcase;
