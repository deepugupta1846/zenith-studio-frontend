import React from "react";
import Navbar from "./landingPages/Navbar";

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
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>© 2025 Zenith Studio. All rights reserved.</p>
        </aside>
      </footer>
    </div>
  );
}
