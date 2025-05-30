import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div
      className={clsx(
        "navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled
          ? "bg-white/90 dark:bg-gray-900 shadow border-b border-base-300"
          : "bg-transparent dark:bg-transparent"
      )}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-base-100 dark:bg-gray-800 rounded-box w-52"
          >
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/order">Order</NavLink></li>
            <li><NavLink to="/status">Check Status</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost text-xl font-bold text-brand"
        >
          Zenith Studio
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/order">Order</NavLink></li>
          <li><NavLink to="/status">Check Status</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </div>

      <div className="navbar-end gap-2 pr-4">
        {/* <button
          onClick={() => setDarkMode(!darkMode)}
          className="btn btn-sm"
        >
          {darkMode ? "☀️" : "🌙"}
        </button> */}
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login" className="btn btn-primary btn-sm">
          Login
        </NavLink>
      </div>
    </div>
  );
}
