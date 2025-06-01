import React from "react";
import Navbar from "./landingPages/Navbar";
import Footer from "./landingPages/Footer";

export default function Corprate({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navbar */}
     <Navbar/>

      {/* Main Content */}
      <main >
        {children}
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}
