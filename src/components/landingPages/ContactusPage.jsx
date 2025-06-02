import React from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-16">
      <div className="max-w-5xl mx-auto bg-white dark:bg-neutral rounded-2xl shadow-xl p-8 md:p-12">
        <motion.h2
          className="text-4xl font-bold text-center text-red-600 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Have a question or want to work with us? Fill out the form and we'll get back to you as soon as possible.
        </motion.p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label" htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label className="label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div>
            <label className="label" htmlFor="subject">Subject</label>
            <input
              id="subject"
              type="text"
              placeholder="How can we help you?"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label" htmlFor="message">Message</label>
            <textarea
              id="message"
              rows="5"
              placeholder="Write your message here..."
              className="textarea textarea-bordered w-full"
            ></textarea>
          </div>

          <div className="text-center pt-4">
            <button
              type="submit"
              className="btn bg-red-600 hover:bg-red-700 text-white px-6"
            >
              Send Message
            </button>
          </div>
        </form>

       
      </div>
    </div>
  );
}
