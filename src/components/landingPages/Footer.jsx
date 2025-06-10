import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-gray-800 dark:text-gray-200 border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-red-600">Zenith Studio</h2>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Capturing your best moments with creativity and clarity. We specialize in weddings, events, portraits and more.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-600">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-red-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-red-500 transition">About</a></li>
            <li><a href="/services" className="hover:text-red-500 transition">Services</a></li>
            <li><a href="/contact" className="hover:text-red-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-600">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhone className="text-red-500" /> +91 7761011403
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-red-500" /> contact@zenithstudio.com
            </li>
            <li>
              Near head post office, Gewalbigha, Gaya, Bihar 823001
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-600">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-red-500 hover:text-red-600"><FaFacebookF /></a>
            <a href="#" className="text-red-500 hover:text-red-600"><FaInstagram /></a>
            <a href="#" className="text-red-500 hover:text-red-600"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-base-300 text-center py-4 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Zenith Studio. All rights reserved.
      </div>
    </footer>
  );
}
