// src/pages/Transactions.jsx

import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Receipt, TrendingUp, DollarSign, AlertCircle, BarChart3, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionModal from '../components/transactions/TransactionModal';
import TransactionCharts from '../components/transactions/TransactionCharts';
import { transactions, transactionSummary } from '../data/transactionData';
import { formatCurrency } from '../utils/calculations';

const Transactions = () => {
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    platform: 'All',
    type: 'All',
    status: 'All',
    category: 'All',
    paymentMode: 'All',
    dateRange: 'all',
    amountRange: 'all',
    startDate: '',
    endDate: '',
  });

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          transaction.asset.toLowerCase().includes(query) ||
          transaction.symbol.toLowerCase().includes(query) ||
          transaction.orderId.toLowerCase().includes(query) ||
          transaction.platform.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Platform filter
      if (filters.platform !== 'All' && transaction.platform !== filters.platform) {
        return false;
      }

      // Type filter
      if (filters.type !== 'All' && transaction.type !== filters.type) {
        return false;
      }

      // Status filter
      if (filters.status !== 'All' && transaction.status !== filters.status) {
        return false;
      }

      // Category filter
      if (filters.category !== 'All' && transaction.category !== filters.category) {
        return false;
      }

      // Payment Mode filter
      if (filters.paymentMode !== 'All' && transaction.paymentMode !== filters.paymentMode) {
        return false;
      }

      // Date Range filter
      if (filters.dateRange !== 'all') {
        const transactionDate = new Date(transaction.date);
        const now = new Date();

        if (filters.dateRange === 'custom') {
          if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            if (transactionDate < startDate) return false;
          }
          if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            endDate.setHours(23, 59, 59, 999);
            if (transactionDate > endDate) return false;
          }
        } else {
          const daysMap = {
            '1d': 1,
            '7d': 7,
            '30d': 30,
            '3m': 90,
            '6m': 180,
            '1y': 365,
          };
          const days = daysMap[filters.dateRange];
          if (days) {
            const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
            if (transactionDate < cutoffDate) return false;
          }
        }
      }

      // Amount Range filter
      if (filters.amountRange !== 'all') {
        const amount = transaction.totalAmount;
        const ranges = {
          '0-10000': [0, 10000],
          '10000-50000': [10000, 50000],
          '50000-100000': [50000, 100000],
          '100000+': [100000, Infinity],
        };
        const range = ranges[filters.amountRange];
        if (range && (amount < range[0] || amount >= range[1])) {
          return false;
        }
      }

      return true;
    });
  }, [transactions, searchQuery, filters]);

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

  // Handle transaction click
  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Close modal
  const closeModal = () => {
    setSelectedTransaction(null);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'Date',
      'Type',
      'Asset',
      'Symbol',
      'Platform',
      'Quantity',
      'Price',
      'Amount',
      'Fees',
      'Tax',
      'Total Amount',
      'Status',
      'Order ID',
      'Payment Mode',
    ];

    const csvData = filteredTransactions.map((t) => [
      new Date(t.date).toLocaleString('en-IN'),
      t.type,
      t.asset,
      t.symbol,
      t.platform,
      t.quantity,
      t.price,
      t.amount,
      t.fees,
      t.tax,
      t.totalAmount,
      t.status,
      t.orderId,
      t.paymentMode,
    ]);

    const csvContent = [headers, ...csvData].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Export to PDF (placeholder)
  const handleExportPDF = () => {
    alert('PDF export functionality will be implemented in the next phase. For now, please use CSV export.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-600 hover:text-indigo-700 font-medium mb-4 flex items-center space-x-2 transition-colors"
          >
            <span>ê Back</span>
          </button>

          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-2xl shadow-lg">
              <Receipt className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Transaction History</h1>
              <p className="text-xl text-gray-600">Complete record of all your investments</p>
            </div>
            <Sparkles className="text-purple-600 animate-pulse" size={32} />
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fadeIn">
          {/* Total Transactions */}
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white hover-lift shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm w-12 h-12 flex items-center justify-center mb-3">
                <Receipt size={24} />
              </div>
              <p className="text-indigo-100 text-sm mb-2 font-medium">Total Transactions</p>
              <h3 className="text-3xl font-bold mb-2">{transactionSummary.totalTransactions}</h3>
              <p className="text-indigo-100 text-sm">
                {transactionSummary.completedTransactions} completed
              </p>
            </div>
          </Card>

          {/* Total Buy Amount */}
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white hover-lift shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm w-12 h-12 flex items-center justify-center mb-3">
                <TrendingUp size={24} />
              </div>
              <p className="text-green-100 text-sm mb-2 font-medium">Total Buy Amount</p>
              <h3 className="text-3xl font-bold mb-2">
                {formatCurrency(transactionSummary.totalBuyAmount)}
              </h3>
              <p className="text-green-100 text-sm">Including fees & taxes</p>
            </div>
          </Card>

          {/* Total Sell Amount */}
          <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white hover-lift shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm w-12 h-12 flex items-center justify-center mb-3">
                <DollarSign size={24} />
              </div>
              <p className="text-orange-100 text-sm mb-2 font-medium">Total Sell Amount</p>
              <h3 className="text-3xl font-bold mb-2">
                {formatCurrency(transactionSummary.totalSellAmount)}
              </h3>
              <p className="text-orange-100 text-sm">After deductions</p>
            </div>
          </Card>

          {/* Pending/Failed */}
          <Card className="bg-gradient-to-br from-yellow-600 to-amber-600 text-white hover-lift shadow-xl border-0 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <div className="relative z-10">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm w-12 h-12 flex items-center justify-center mb-3">
                <AlertCircle size={24} />
              </div>
              <p className="text-yellow-100 text-sm mb-2 font-medium">Pending/Failed</p>
              <h3 className="text-3xl font-bold mb-2">
                {transactionSummary.pendingTransactions + transactionSummary.failedTransactions}
              </h3>
              <p className="text-yellow-100 text-sm">
                {transactionSummary.pendingTransactions}P / {transactionSummary.failedTransactions}F
              </p>
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="mb-8 animate-fadeIn">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="text-indigo-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
          </div>
          <TransactionCharts />
        </div>

        {/* Filters */}
        <div className="animate-fadeIn">
          <TransactionFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchChange={handleSearchChange}
            totalResults={filteredTransactions.length}
            onExportCSV={handleExportCSV}
            onExportPDF={handleExportPDF}
          />
        </div>

        {/* Transaction Table */}
        <div className="animate-fadeIn">
          <TransactionTable
            transactions={filteredTransactions}
            onTransactionClick={handleTransactionClick}
          />
        </div>

        {/* Modal */}
        {selectedTransaction && (
          <TransactionModal transaction={selectedTransaction} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Transactions;
