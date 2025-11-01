import Card from '../ui/Card';
import { formatCurrency } from '../../utils/calculations';

const PortfolioSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Investment */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white hover-lift">
        <div>
          <p className="text-blue-100 text-sm mb-2">Total Invested</p>
          <h3 className="text-3xl font-bold mb-1">
            {formatCurrency(summary.totalInvested)}
          </h3>
          <p className="text-blue-100 text-sm">
            Across {summary.activePlatforms} platforms
          </p>
        </div>
      </Card>

      {/* Current Value */}
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white hover-lift">
        <div>
          <p className="text-green-100 text-sm mb-2">Current Value</p>
          <h3 className="text-3xl font-bold mb-1">
            {formatCurrency(summary.currentValue)}
          </h3>
          <div className="flex items-center text-sm">
            <span className="text-green-100">Today: </span>
            <span className={`ml-2 font-semibold ${summary.dayChange >= 0 ? 'text-green-100' : 'text-red-100'}`}>
              {summary.dayChange >= 0 ? '+' : ''}{formatCurrency(summary.dayChange)} 
              ({summary.dayChangePercentage >= 0 ? '+' : ''}{summary.dayChangePercentage}%)
            </span>
          </div>
        </div>
      </Card>

      {/* Total Returns */}
      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white hover-lift">
        <div>
          <p className="text-purple-100 text-sm mb-2">Total Returns</p>
          <h3 className="text-3xl font-bold mb-1">
            {formatCurrency(summary.totalReturns)}
          </h3>
          <p className="text-purple-100 text-sm">
            +{summary.returnPercentage}% overall
          </p>
        </div>
      </Card>

      {/* Total Investments */}
      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white hover-lift">
        <div>
          <p className="text-orange-100 text-sm mb-2">Active Investments</p>
          <h3 className="text-3xl font-bold mb-1">
            {summary.totalInvestments}
          </h3>
          <p className="text-orange-100 text-sm">
            Holdings across all platforms
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PortfolioSummary;