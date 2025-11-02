import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X } from "lucide-react";

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
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group"
            onClick={closeMobileMenu}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Spark Investment
            </span>
            <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded text-xs font-semibold">
              AI
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-1">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2 rounded-lg transition-all duration-200 font-medium`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2 rounded-lg transition-all duration-200 font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/investments"
              className={`${
                isActive("/investments")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2 rounded-lg transition-all duration-200 font-medium`}
            >
              Investments
            </Link>
            <Link
              to="/calculator"
              className={`${
                isActive("/calculator")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2 rounded-lg transition-all duration-200 font-medium`}
            >
              Calculator
            </Link>
            <Link
              to="/ai-analysis"
              className={`${
                isActive("/ai-analysis")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center space-x-1`}
            >
              <span>AI Analysis</span>
              <span className="bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded text-xs font-bold">
                NEW
              </span>
            </Link>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2"
            >
              <span>Get Started</span>
              <Sparkles size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors p-2 hover:bg-indigo-50 rounded-lg"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`${
                  isActive("/dashboard")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/investments"
                className={`${
                  isActive("/investments")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Investments
              </Link>
              <Link
                to="/calculator"
                className={`${
                  isActive("/calculator")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                Calculator
              </Link>
              <Link
                to="/ai-analysis"
                className={`${
                  isActive("/ai-analysis")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg flex items-center justify-between`}
                onClick={closeMobileMenu}
              >
                <span>AI Analysis</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-xs font-bold">
                  NEW
                </span>
              </Link>
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-center shadow-lg flex items-center justify-center space-x-2"
                onClick={closeMobileMenu}
              >
                <span>Get Started</span>
                <Sparkles size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;