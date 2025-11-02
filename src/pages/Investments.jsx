// src/pages/Investments.jsx

import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import InvestmentFilters from "../components/investments/InvestmentFilters";
import InvestmentTimeline from "../components/investments/InvestmentTimeline";
import InvestmentDetailModal from "../components/investments/InvestmentDetailModal";
import {
  investments as allInvestments,
  investmentSummary,
} from "../data/investmentData";

const Investments = () => {
  const navigate = useNavigate();
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    platform: "All",
    type: "All",
    status: "All",
    sector: "All",
    timeRange: "all",
    sortBy: "date-desc",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredInvestments, setFilteredInvestments] =
    useState(allInvestments);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle search change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Apply filters, search, and sort
  useEffect(() => {
    let result = [...allInvestments];

    // Apply platform filter
    if (filters.platform !== "All") {
      result = result.filter((inv) => inv.platform === filters.platform);
    }

    // Apply type filter
    if (filters.type !== "All") {
      result = result.filter((inv) => inv.type === filters.type);
    }

    // Apply status filter
    if (filters.status !== "All") {
      result = result.filter(
        (inv) => inv.status === filters.status.toLowerCase()
      );
    }

    // Apply sector filter
    if (filters.sector !== "All") {
      result = result.filter((inv) => inv.sector === filters.sector);
    }

    // Apply time range filter
    if (filters.timeRange !== "all") {
      const now = new Date();
      result = result.filter((inv) => {
        const investmentDate = new Date(inv.purchaseDate);
        const daysDiff = Math.floor(
          (now - investmentDate) / (1000 * 60 * 60 * 24)
        );

        switch (filters.timeRange) {
          case "1d":
            return daysDiff <= 1;
          case "7d":
            return daysDiff <= 7;
          case "30d":
            return daysDiff <= 30;
          case "3m":
            return daysDiff <= 90;
          case "6m":
            return daysDiff <= 180;
          case "1y":
            return daysDiff <= 365;
          case "2y":
            return daysDiff <= 730;
          case "5y":
            return daysDiff <= 1825;
          default:
            return true;
        }
      });
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (inv) =>
          inv.name.toLowerCase().includes(query) ||
          inv.symbol.toLowerCase().includes(query) ||
          inv.sector.toLowerCase().includes(query) ||
          inv.platform.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "date-desc":
          return new Date(b.purchaseDate) - new Date(a.purchaseDate);
        case "date-asc":
          return new Date(a.purchaseDate) - new Date(b.purchaseDate);
        case "returns-desc":
          return b.returns - a.returns;
        case "returns-asc":
          return a.returns - b.returns;
        case "value-desc":
          return b.currentValue - a.currentValue;
        case "value-asc":
          return a.currentValue - b.currentValue;
        default:
          return 0;
      }
    });

    setFilteredInvestments(result);
  }, [filters, searchQuery]);

  // Handle investment click (for detail view - will implement in next step)
  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
  };
  const handleCloseModal = () => {
    setSelectedInvestment(null);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-medium mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>

          {/* Page Title */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                My Investments
              </h1>
              <p className="text-gray-600">
                Track and manage all your investments in one place
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex items-center space-x-2 text-indigo-600">
                  <Package size={24} />
                  <span className="text-2xl font-bold">
                    {allInvestments.length}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Total Investments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Invested */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Total Invested
              </h3>
              <div className="bg-blue-100 p-2 rounded-lg">
                <DollarSign className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(investmentSummary.totalInvested)}
            </p>
          </div>

          {/* Current Value */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Current Value
              </h3>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {formatCurrency(investmentSummary.totalCurrentValue)}
            </p>
          </div>

          {/* Total Returns */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">
                Total Returns
              </h3>
              <div
                className={`${
                  investmentSummary.totalReturns >= 0
                    ? "bg-green-100"
                    : "bg-red-100"
                } p-2 rounded-lg`}
              >
                {investmentSummary.totalReturns >= 0 ? (
                  <TrendingUp className="text-green-600" size={20} />
                ) : (
                  <TrendingDown className="text-red-600" size={20} />
                )}
              </div>
            </div>
            <p
              className={`text-2xl font-bold ${
                investmentSummary.totalReturns >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {investmentSummary.totalReturns >= 0 ? "+" : ""}
              {formatCurrency(investmentSummary.totalReturns)}
            </p>
            <p
              className={`text-sm font-semibold mt-1 ${
                investmentSummary.totalReturns >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ({investmentSummary.totalReturns >= 0 ? "+" : ""}
              {investmentSummary.overallReturnsPercentage}%)
            </p>
          </div>

          {/* Performance Split */}
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-600 text-sm font-medium">Performance</h3>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Package className="text-purple-600" size={20} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-green-600">
                  {investmentSummary.profitableInvestments}
                </p>
                <p className="text-xs text-gray-500">Profitable</p>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div>
                <p className="text-lg font-bold text-red-600">
                  {investmentSummary.lossInvestments}
                </p>
                <p className="text-xs text-gray-500">Loss</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Component */}
        <InvestmentFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
          totalResults={filteredInvestments.length}
        />

        {/* Timeline Component */}
        <InvestmentTimeline
          investments={filteredInvestments}
          onInvestmentClick={handleInvestmentClick}
        />
        {/* Investment Detail Modal */}
        {selectedInvestment && (
          <InvestmentDetailModal
            investment={selectedInvestment}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export default Investments;
