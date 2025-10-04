import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/assets/space-apps-logo.png"
            alt="WeatherApp Logo"
            className="w-full h-[55px] object-cover"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 font-semibold text-lg">
          <Link
            to="/"
            className="text-gray-100 hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-100 hover:text-gray-300 transition-colors"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}
