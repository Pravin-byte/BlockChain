import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai"; // react icon for info

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 hover:from-blue-300 hover:to-green-300 transition-all duration-300"
            >
              Blockchain
            </Link>
          </div>

          {/* Desktop Navigation + Tooltip */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === "/"
                  ? "text-green-400 bg-gray-800"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                }`}
            >
              Landing
            </Link>
            <Link
              to="/home"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === "/home"
                  ? "text-green-400 bg-gray-800"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                }`}
            >
              Home
            </Link>
            <Link
              to="/puzzle"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === "/puzzle"
                  ? "text-green-400 bg-gray-800"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                }`}
            >
              Puzzle
            </Link>
            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === "/about"
                  ? "text-green-400 bg-gray-800"
                  : "text-gray-300 hover:text-green-400 hover:bg-gray-800"
                }`}
            >
              About
            </Link>

            {/* Tooltip icon aligned with nav links */}
            <div className="relative group">
              <AiOutlineInfoCircle className="text-gray-400 cursor-pointer" size={20} />
              <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-56 bg-gray-700 text-gray-200 text-sm rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-center z-50">
                This is just a simulation based on real blockchain mining. Real mining requires huge computing power!
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
            >
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-gray-800 border-t border-gray-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${location.pathname === "/"
                ? "text-green-400 bg-gray-700"
                : "text-gray-300 hover:text-green-400 hover:bg-gray-700"
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Landing
          </Link>
          <Link
            to="/home"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${location.pathname === "/home"
                ? "text-green-400 bg-gray-700"
                : "text-gray-300 hover:text-green-400 hover:bg-gray-700"
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/puzzle"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${location.pathname === "/puzzle"
                ? "text-green-400 bg-gray-700"
                : "text-gray-300 hover:text-green-400 hover:bg-gray-700"
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Puzzle
          </Link>
          <Link
            to="/about"
            className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${location.pathname === "/about"
                ? "text-green-400 bg-gray-700"
                : "text-gray-300 hover:text-green-400 hover:bg-gray-700"
              }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
