import React from "react";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f0ff] to-[#f7f5ff] py-12 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Choose Your Printing Plan!</h1>
        <p className="text-gray-600 mb-8">
          Find the right pricing for your printing and design needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Only Printing */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Only Printing</h2>
            <p className="text-3xl font-bold mb-4">₹50 - ₹60/sheet</p>
            <ul className="text-left space-y-2">
              <li>Glossy Paper – ₹50 per sheet</li>
              <li>Ntr Paper – ₹60 per sheet</li>
              <li>Binding – ₹600</li>
              <li>Delivery Time – 2 Days</li>
            </ul>
            <button className="mt-6 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
              Get Started
            </button>
          </div>

          {/* Design & Printing */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-red-500">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Design & Printing</h2>
            <p className="text-3xl font-bold mb-4">₹150 - ₹200/sheet</p>
            <ul className="text-left space-y-2">
              <li>Glossy Paper – ₹150 per sheet</li>
              <li>Ntr Paper – ₹150 per sheet</li>
              <li>Binding – ₹600</li>
              <li>Delivery Time – 1 Week</li>
            </ul>
            <button className="mt-6 w-full py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">
              Get Started
            </button>
          </div>

          {/* Custom Bag Options */}
          <div className="bg-[#fdf6e3] border-2 border-red-300 rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold mb-2 text-red-500">Custom Bag Option</h2>
            <p className="text-lg font-medium mb-4">Let’s Discuss!</p>
            <ul className="text-left space-y-2">
              <li>Normal & 3D Bag Available</li>
              <li>Option to change to photo bag</li>
              <li>Price on request</li>
              <li>Custom packaging requests accepted</li>
            </ul>
            <button className="mt-6 w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
              Book a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
