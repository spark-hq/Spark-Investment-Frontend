import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency, formatNumber } from '../utils/calculations';

const Results = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Get calculation result from sessionStorage
    const savedResult = sessionStorage.getItem('calculationResult');
    
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else {
      // If no result found, redirect to calculator
      navigate('/calculator');
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  // Prepare data for pie chart
  const pieData = [
    { name: 'Total Investment', value: result.totalInvestment, color: '#3B82F6' },
    { name: 'Estimated Returns', value: result.estimatedReturns, color: '#10B981' }
  ];

  // Get investment type label
  const getInvestmentTypeLabel = (type) => {
    const labels = {
      sip: 'SIP (Systematic Investment Plan)',
      lumpsum: 'Lumpsum Investment',
      stepup: 'Step-up SIP'
    };
    return labels[type] || type;
  };

  const handleRecalculate = () => {
    navigate('/calculator');
  };

  const handleDownloadReport = () => {
    alert('Download feature will be implemented with backend!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Investment Results
          </h1>
          <p className="text-xl text-gray-600">
            Here's your detailed investment projection
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-center">
              <p className="text-blue-100 mb-2">Total Investment</p>
              <h3 className="text-3xl font-bold mb-1">
                {formatCurrency(result.totalInvestment)}
              </h3>
              <p className="text-sm text-blue-100">
                {result.investmentType === 'lumpsum' 
                  ? 'One-time investment'
                  : `₹${formatNumber(result.amount)}/month for ${result.timePeriod} years`
                }
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-center">
              <p className="text-green-100 mb-2">Estimated Returns</p>
              <h3 className="text-3xl font-bold mb-1">
                {formatCurrency(result.estimatedReturns)}
              </h3>
              <p className="text-sm text-green-100">
                @ {result.expectedReturn}% annual return
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-center">
              <p className="text-purple-100 mb-2">Total Value</p>
              <h3 className="text-3xl font-bold mb-1">
                {formatCurrency(result.totalValue)}
              </h3>
              <p className="text-sm text-purple-100">
                After {result.timePeriod} years
              </p>
            </div>
          </Card>
        </div>

        {/* Investment Details */}
        <Card title="Investment Details" className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Investment Type:</span>
                  <span className="font-semibold text-gray-900">
                    {getInvestmentTypeLabel(result.investmentType)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">
                    {result.investmentType === 'lumpsum' ? 'Investment Amount:' : 'Monthly Investment:'}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(result.amount)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Time Period:</span>
                  <span className="font-semibold text-gray-900">
                    {result.timePeriod} Years
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Expected Return:</span>
                  <span className="font-semibold text-gray-900">
                    {result.expectedReturn}% per annum
                  </span>
                </div>
                {result.investmentType === 'stepup' && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Annual Step-up:</span>
                    <span className="font-semibold text-gray-900">
                      {result.stepUpPercentage}%
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Wealth Gain:</span>
                  <span className="font-semibold text-green-600">
                    {((result.estimatedReturns / result.totalInvestment) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Charts Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Pie Chart */}
          <Card title="Investment Breakdown" className="h-full">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
                  <span className="text-gray-600">Total Investment</span>
                </div>
                <span className="font-semibold">{formatCurrency(result.totalInvestment)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
                  <span className="text-gray-600">Estimated Returns</span>
                </div>
                <span className="font-semibold">{formatCurrency(result.estimatedReturns)}</span>
              </div>
            </div>
          </Card>

          {/* Line Chart */}
          <Card title="Growth Over Time" className="h-full">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={result.yearlyBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="year" 
                  label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Invested Amount"
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Total Value"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bar Chart - Yearly Breakdown */}
        <Card title="Year-wise Analysis" className="mb-8">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={result.yearlyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
              <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={(label) => `Year ${label}`}
              />
              <Legend />
              <Bar dataKey="invested" fill="#3B82F6" name="Invested Amount" />
              <Bar dataKey="returns" fill="#10B981" name="Returns" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Detailed Breakdown Table */}
        <Card title="Detailed Year-wise Breakdown" className="mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invested Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Returns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {result.yearlyBreakdown.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {formatCurrency(row.invested)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {formatCurrency(row.returns)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                      {formatCurrency(row.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handleRecalculate}>
            ← Recalculate
          </Button>
          <Button size="lg" variant="success" onClick={handleDownloadReport}>
            📥 Download Report
          </Button>
        </div>

        {/* Disclaimer */}
        <Card className="mt-8 bg-yellow-50 border border-yellow-200">
          <div className="flex items-start">
            <span className="text-2xl mr-3">⚠️</span>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Disclaimer</h4>
              <p className="text-sm text-gray-600">
                These calculations are for illustrative purposes only and do not represent actual returns. 
                Actual investment returns may vary based on market conditions, fund performance, and other factors. 
                Please consult with a financial advisor before making investment decisions.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Results;