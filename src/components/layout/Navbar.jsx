import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold text-blue-600">
              Spark Investment
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive("/") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600 transition-colors duration-200 font-medium`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`${
                isActive("/dashboard") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600 transition-colors duration-200 font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/investments"
              className={`${
                isActive("/investments") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600 transition-colors duration-200 font-medium`}
            >
              Investments
            </Link>
            <Link
              to="/calculator"
              className={`${
                isActive("/calculator") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600 transition-colors duration-200 font-medium`}
            >
              Calculator
            </Link>
            <Link
              to="/results"
              className={`${
                isActive("/results") ? "text-blue-600" : "text-gray-700"
              } hover:text-blue-600 transition-colors duration-200 font-medium`}
            >
              Results
            </Link>
            
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/calculator"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium hover-lift"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className={`${
                  isActive("/") ? "text-blue-600 bg-blue-50" : "text-gray-700"
                } hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`${
                  isActive("/dashboard")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700"
                } hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/calculator"
                className={`${
                  isActive("/calculator")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700"
                } hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Calculator
              </Link>
              <Link
                to="/results"
                className={`${
                  isActive("/results")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700"
                } hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Results
              </Link>
              <Link
                to="/calculator"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-center"
                onClick={closeMobileMenu}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
