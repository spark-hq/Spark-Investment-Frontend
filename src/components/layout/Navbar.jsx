import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, X, ChevronDown, Calculator, Settings, Target, CreditCard, TrendingUp, Bell, User } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreDropdownOpen(false);
    setIsProfileDropdownOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMoreDropdown = () => {
    setIsMoreDropdownOpen(!isMoreDropdownOpen);
    setIsProfileDropdownOpen(false);
  };

  const closeMoreDropdown = () => {
    setIsMoreDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsMoreDropdownOpen(false);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMoreDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMobileMenu();
  }, [location.pathname]);

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
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-gray-100 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group py-4"
            onClick={closeMobileMenu}
          >
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-2.5 rounded-xl group-hover:scale-110 transition-all duration-300 shadow-md group-hover:shadow-lg">
              <Sparkles className="text-white" size={22} />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Spark Investment
              </span>
              <span className="bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md text-xs font-bold shadow-sm">
                AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-1 items-center">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center`}
            >
              Dashboard
            </Link>
            <Link
              to="/investments"
              className={`${
                isActive("/investments")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center`}
            >
              Investments
            </Link>
            <Link
              to="/live-trading"
              className={`${
                isActive("/live-trading")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center space-x-1`}
            >
              <span>🎯</span>
              <span>Trading</span>
            </Link>
            <Link
              to="/ai-analysis"
              className={`${
                isActive("/ai-analysis")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center space-x-1`}
            >
              <span>AI Analysis</span>
            </Link>

            {/* More Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={toggleMoreDropdown}
                className={`${
                  isMoreDropdownOpen
                    ? "text-indigo-600 bg-indigo-50 shadow-sm"
                    : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                } px-4 py-2.5 rounded-xl transition-all duration-200 font-semibold text-sm flex items-center space-x-1`}
              >
                <span>More</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isMoreDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Menu with improved animation */}
              {isMoreDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-3 z-50 transform transition-all duration-200 origin-top-right animate-fadeIn">
                  <div className="px-4 py-2 border-b-2 border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                    <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center space-x-2">
                      <Sparkles size={14} />
                      <span>More Features</span>
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
                        } flex items-start space-x-3 px-4 py-3.5 transition-all duration-200 group`}
                      >
                        <div
                          className={`${
                            isActive(item.path)
                              ? "bg-indigo-600 text-white shadow-md"
                              : "bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                          } p-2.5 rounded-xl transition-all duration-200`}
                        >
                          <Icon size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2.5 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all duration-200">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={toggleProfileDropdown}
                className="flex items-center space-x-2 p-2 pr-3 hover:bg-indigo-50 rounded-xl transition-all duration-200 group"
              >
                <div className="w-9 h-9 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-all duration-200">
                  <User size={18} />
                </div>
                <ChevronDown
                  size={16}
                  className={`text-gray-600 transition-transform duration-300 ${
                    isProfileDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 py-2 z-50 animate-fadeIn">
                  <div className="px-4 py-3 border-b-2 border-gray-100">
                    <p className="text-sm font-bold text-gray-900">Demo User</p>
                    <p className="text-xs text-gray-500 mt-0.5">demo@sparkinvest.ai</p>
                  </div>
                  <Link
                    to="/settings"
                    onClick={closeProfileDropdown}
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200"
                  >
                    <Settings size={18} />
                    <span className="text-sm font-semibold">Settings</span>
                  </Link>
                  <button
                    className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <X size={18} />
                    <span className="text-sm font-semibold">Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-2 text-sm"
            >
              <span>Get Started</span>
              <Sparkles size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 hover:text-indigo-600 transition-colors p-2.5 hover:bg-indigo-50 rounded-xl active:scale-95"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 space-y-2 animate-fadeIn border-t border-gray-100 mt-2">
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } transition-all duration-200 font-semibold px-4 py-3 min-h-[48px] rounded-xl flex items-center active:scale-95`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`${
                isActive("/dashboard")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } transition-all duration-200 font-semibold px-4 py-3 min-h-[48px] rounded-xl flex items-center active:scale-95`}
              onClick={closeMobileMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/investments"
              className={`${
                isActive("/investments")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } transition-all duration-200 font-semibold px-4 py-3 min-h-[48px] rounded-xl flex items-center active:scale-95`}
              onClick={closeMobileMenu}
            >
              My Investments
            </Link>
            <Link
              to="/live-trading"
              className={`${
                isActive("/live-trading")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } transition-all duration-200 font-semibold px-4 py-3 min-h-[48px] rounded-xl flex items-center active:scale-95`}
              onClick={closeMobileMenu}
            >
              🎯 Live Trading
            </Link>
            <Link
              to="/ai-analysis"
              className={`${
                isActive("/ai-analysis")
                  ? "text-indigo-600 bg-indigo-50 shadow-sm"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
              } transition-all duration-200 font-semibold px-4 py-3 min-h-[48px] rounded-xl flex items-center active:scale-95`}
              onClick={closeMobileMenu}
            >
              AI Analysis
            </Link>

            {/* Mobile More Section */}
            <div className="border-t-2 border-gray-100 pt-3 mt-3">
              <p className="px-4 py-2 text-xs font-bold text-indigo-600 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles size={14} />
                <span>More Features</span>
              </p>
              {moreItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${
                      isActive(item.path)
                        ? "text-indigo-600 bg-indigo-50 shadow-sm"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-indigo-50"
                    } transition-all duration-200 font-semibold px-4 py-3 min-h-[48px] rounded-xl flex items-center space-x-3 active:scale-95`}
                    onClick={closeMobileMenu}
                  >
                    <Icon size={20} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <Link
              to="/dashboard"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3.5 min-h-[48px] rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-bold text-center shadow-lg flex items-center justify-center space-x-2 mt-4 active:scale-95"
              onClick={closeMobileMenu}
            >
              <span>Get Started</span>
              <Sparkles size={18} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
