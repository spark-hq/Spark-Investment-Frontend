// src/components/auto-invest/BacktestResults.jsx

import { TrendingUp, TrendingDown, Target, Activity, AlertTriangle, CheckCircle2, Award, BarChart3 } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BacktestResults = ({ backtest }) => {
  if (!backtest) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 border-2 border-gray-100 text-center">
        <div className="text-6xl mb-4">📊</div>
        <p className="text-lg font-semibold text-gray-700 mb-2">Select a plan to view backtest results</p>
        <p className="text-sm text-gray-500">Historical performance data will be displayed here</p>
      </div>
    );
  }

  const profitLoss = backtest.finalValue - backtest.initialInvestment;
  const isProfitable = profitLoss > 0;

  return (
    <div className="bg-white rounded-xl shadow-md border-2 border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-2">
          <Activity className="text-white" size={28} />
          <h3 className="text-2xl font-bold">Backtest Results</h3>
        </div>
        <p className="text-purple-100">{backtest.period}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
            <p className="text-xs text-gray-600 mb-1 font-medium">Initial Investment</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(backtest.initialInvestment)}</p>
          </div>
          <div className={`bg-gradient-to-br ${isProfitable ? 'from-green-50 to-emerald-50 border-green-100' : 'from-red-50 to-rose-50 border-red-100'} p-4 rounded-lg border`}>
            <p className="text-xs text-gray-600 mb-1 font-medium">Final Value</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(backtest.finalValue)}</p>
          </div>
          <div className={`bg-gradient-to-br ${isProfitable ? 'from-green-50 to-emerald-50 border-green-100' : 'from-red-50 to-rose-50 border-red-100'} p-4 rounded-lg border`}>
            <p className="text-xs text-gray-600 mb-1 font-medium">Total Return</p>
            <p className={`text-xl font-bold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? '+' : ''}{backtest.totalReturn.toFixed(2)}%
            </p>
            <p className={`text-xs font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
              {isProfitable ? '+' : ''}{formatCurrency(profitLoss)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
            <p className="text-xs text-gray-600 mb-1 font-medium">Annualized Return</p>
            <p className="text-xl font-bold text-purple-600">{backtest.annualizedReturn.toFixed(2)}%</p>
          </div>
        </div>

        {/* Trading Statistics */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <Target className="text-indigo-600" size={18} />
            <span>Trading Statistics</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Trades</p>
              <p className="text-2xl font-bold text-gray-900">{backtest.totalTransactions}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Successful</p>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="text-green-600" size={18} />
                <p className="text-2xl font-bold text-green-600">{backtest.successfulTrades}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Failed</p>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="text-red-600" size={18} />
                <p className="text-2xl font-bold text-red-600">{backtest.failedTrades}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Win Rate</p>
              <div className="flex items-center space-x-2">
                <Award className="text-yellow-600" size={18} />
                <p className="text-2xl font-bold text-yellow-600">{backtest.winRate.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-yellow-600" size={18} />
              <p className="text-xs text-gray-700 font-semibold">Max Drawdown</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{backtest.maxDrawdown}%</p>
            <p className="text-xs text-gray-600 mt-1">Largest peak-to-trough decline</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-green-600" size={18} />
              <p className="text-xs text-gray-700 font-semibold">Best Year</p>
            </div>
            <p className="text-2xl font-bold text-green-600">+{backtest.bestYear.return}%</p>
            <p className="text-xs text-gray-600 mt-1">{backtest.bestYear.year}</p>
          </div>

          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="text-red-600" size={18} />
              <p className="text-xs text-gray-700 font-semibold">Worst Year</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{backtest.worstYear.return}%</p>
            <p className="text-xs text-gray-600 mt-1">{backtest.worstYear.year}</p>
          </div>
        </div>

        {/* Monthly Returns Chart */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center space-x-2">
            <BarChart3 className="text-indigo-600" size={18} />
            <span>Recent Monthly Returns</span>
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={backtest.monthlyReturns}>
              <defs>
                <linearGradient id="colorPositive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="colorNegative" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0.3} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b7280' }} />
              <YAxis
                tickFormatter={(value) => `${value}%`}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <Tooltip
                formatter={(value) => `${value.toFixed(2)}%`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar
                dataKey="return"
                radius={[4, 4, 0, 0]}
              >
                {backtest.monthlyReturns.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.return >= 0 ? '#10b981' : '#ef4444'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Summary */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
          <div className="flex items-center space-x-2 mb-3">
            <Activity className="text-indigo-600" size={20} />
            <h4 className="text-sm font-bold text-gray-900">Performance Summary</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Initial Investment:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(backtest.initialInvestment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Final Value:</span>
              <span className="font-semibold text-gray-900">{formatCurrency(backtest.finalValue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Total Gain/Loss:</span>
              <span className={`font-semibold ${isProfitable ? 'text-green-600' : 'text-red-600'}`}>
                {isProfitable ? '+' : ''}{formatCurrency(profitLoss)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Annualized Return:</span>
              <span className="font-semibold text-purple-600">{backtest.annualizedReturn.toFixed(2)}% p.a.</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
            <div>
              <p className="text-xs font-semibold text-yellow-800 mb-1">Important Disclaimer</p>
              <p className="text-xs text-yellow-700">
                Past performance does not guarantee future results. Backtesting uses historical data and may not reflect actual trading conditions, fees, or market impacts. Actual results may vary significantly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BacktestResults;
