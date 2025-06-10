import React from "react";
import { motion } from "framer-motion";

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-base-200 py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold text-red-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Visit Our Studio
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Drop by our studio for consultations, bookings, or just to say hi. We’d love to meet you!
        </motion.p>

        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
          <iframe
            title="Zenith Studio Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.7552939090863!2d72.82143447511206!3d19.075983682129946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce303d0a5f1d%3A0x7fdf4d3af9ad54b9!2sZenith%20Studio!5e0!3m2!1sen!2sin!4v1716371000000"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[450px] border-0"
          ></iframe>
        </div>

        <div className="mt-10 text-gray-700 dark:text-gray-300">
          <h3 className="text-xl font-semibold text-red-600 mb-2">Studio Address</h3>
          <p>Zenith Studio, Near head post office, Gewalbigha, Gaya, Bihar 823001</p>
          <p>Phone: +91 7761011403</p>
          <p>Email: contact@zenithstudio.com</p>
        </div>
      </div>
    </div>
  );
}
