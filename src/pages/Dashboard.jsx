import { useState, useEffect } from 'react';
import PortfolioSummary from '../components/dashboard/PortfolioSummary';
import PlatformCards from '../components/dashboard/PlatformCards';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  portfolioSummary, 
  connectedPlatforms, 
  performanceData,
  assetAllocation,
  topPerformers,
  recentActivity 
} from '../data/portfolioData';
import { formatCurrency } from '../utils/calculations';
import { 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

const Dashboard = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const getActivityIcon = (type) => {
    switch(type) {
      case 'buy': return '📈';
      case 'sell': return '📉';
      case 'sip': return '🔄';
      default: return '💰';
    }
  };

  const getActivityColor = (type) => {
    switch(type) {
      case 'buy': return 'text-green-600 bg-green-50';
      case 'sell': return 'text-red-600 bg-red-50';
      case 'sip': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {greeting}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Here's your investment portfolio overview
          </p>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="mb-8 animate-fadeIn">
          <PortfolioSummary summary={portfolioSummary} />
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 animate-fadeIn">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Quick Actions</h3>
              <p className="text-gray-600 text-sm">Manage your investments efficiently</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/investments">
                <Button variant="primary" className="hover-lift">
                  📊 View All Investments
                </Button>
              </Link>
              <Link to="/live-trading">
                <Button variant="success" className="hover-lift">
                  🤖 Start Live Trading
                </Button>
              </Link>
              <Link to="/ai-analysis">
                <Button variant="outline" className="hover-lift">
                  🧠 AI Analysis
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Platform Cards */}
        <div className="mb-8 animate-fadeIn">
          <PlatformCards platforms={connectedPlatforms} />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Performance Chart */}
          <Card title="Portfolio Performance" subtitle="Last 12 months" className="animate-fadeIn hover-lift">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="invested" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  name="Invested"
                  dot={{ r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Current Value"
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Asset Allocation */}
          <Card title="Asset Allocation" subtitle="Investment distribution" className="animate-fadeIn hover-lift">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetAllocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetAllocation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Top Performers - Takes 2 columns */}
          <Card title="Top Performers" subtitle="Best performing investments" className="lg:col-span-2 animate-fadeIn hover-lift">
            <div className="space-y-4">
              {topPerformers.map((investment) => (
                <div 
                  key={investment.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{investment.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-gray-600">{investment.platform}</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {investment.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(investment.current)}
                    </p>
                    <p className="text-sm text-green-600 font-medium">
                      +{formatCurrency(investment.returns)} (+{investment.returnPercentage}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/investments">
                <Button variant="outline" size="sm">
                  View All Investments →
                </Button>
              </Link>
            </div>
          </Card>

          {/* Recent Activity - Takes 1 column */}
          <Card title="Recent Activity" subtitle="Latest transactions" className="animate-fadeIn hover-lift">
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                    <span className="text-xl">{getActivityIcon(activity.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 truncate">
                      {activity.asset}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {activity.platform}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(activity.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/transactions">
                <Button variant="outline" size="sm" fullWidth>
                  View All Transactions →
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* AI Insights Teaser */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 animate-fadeIn hover-lift">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🤖</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  AI-Powered Investment Insights
                </h3>
                <p className="text-gray-600">
                  Get personalized analysis, predictions, and recommendations for your portfolio
                </p>
              </div>
            </div>
            <Link to="/ai-analysis">
              <Button size="lg" variant="primary" className="hover-lift whitespace-nowrap">
                View AI Insights →
              </Button>
            </Link>
          </div>
        </Card>

        {/* Smart Trading Teaser */}
        <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 animate-fadeIn hover-lift">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl">📊</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Live Smart Trading
                </h3>
                <p className="text-gray-600">
                  Trade with AI assistance - Get real-time insights, recommendations, and automated trading
                </p>
              </div>
            </div>
            <Link to="/live-trading">
              <Button size="lg" variant="success" className="hover-lift whitespace-nowrap">
                Start Trading →
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;