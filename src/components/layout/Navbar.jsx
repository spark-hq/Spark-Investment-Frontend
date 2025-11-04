import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, ChevronDown, Calculator, Settings, Target, CreditCard, TrendingUp } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
  };

  const closeMoreDropdown = () => {
    setIsMoreDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Additional features for dropdown
  const moreItems = [
    {
      name: "Calculator",
      path: "/calculator",
      icon: Calculator,
      description: "SIP & Investment calculators",
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: CreditCard,
      description: "View transaction history",
    },
    {
      name: "Auto-Invest",
      path: "/auto-invest",
      icon: TrendingUp,
      description: "Automated investing",
    },
    {
      name: "Goals",
      path: "/goals",
      icon: Target,
      description: "Financial goals tracker",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      description: "Account settings",
    },
  ];

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
          <div className="hidden md:flex space-x-1 items-center">
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
              My Investments
            </Link>
            <Link
              to="/live-trading"
              className={`${
                isActive("/live-trading")
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2 rounded-lg transition-all duration-200 font-medium`}
            >
              🎯 Live Trading
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
            </Link>

            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleMoreDropdown}
                className={`${
                  isMoreDropdownOpen
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } px-4 py-2 rounded-lg transition-all duration-200 font-medium flex items-center space-x-1`}
              >
                <span>More</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    isMoreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {isMoreDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border-2 border-gray-100 py-2 animate-fadeIn z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      More Features
                    </p>
                  </div>
                  {moreItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={closeMoreDropdown}
                        className={`${
                          isActive(item.path)
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        } flex items-start space-x-3 px-4 py-3 transition-all duration-200`}
                      >
                        <div
                          className={`${
                            isActive(item.path)
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-100 text-gray-600"
                          } p-2 rounded-lg transition-colors`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
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
                My Investments
              </Link>
              <Link
                to="/live-trading"
                className={`${
                  isActive("/live-trading")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                🎯 Live Trading
              </Link>
              <Link
                to="/ai-analysis"
                className={`${
                  isActive("/ai-analysis")
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } transition-all duration-200 font-medium px-4 py-2 rounded-lg`}
                onClick={closeMobileMenu}
              >
                AI Analysis
              </Link>

              {/* Mobile More Section */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <p className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  More Features
                </p>
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`${
                        isActive(item.path)
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                      } transition-all duration-200 font-medium px-4 py-2 rounded-lg flex items-center space-x-3`}
                      onClick={closeMobileMenu}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-medium text-center shadow-lg flex items-center justify-center space-x-2 mt-2"
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