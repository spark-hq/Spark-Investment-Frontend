import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { formatCurrency } from '../../utils/calculations';

const PlatformCards = ({ platforms }) => {
  return (
    <Card title="Connected Platforms" className="mb-8">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`border-2 rounded-xl p-6 transition-all hover:shadow-lg ${
              platform.connected
                ? 'border-green-200 bg-green-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{platform.logo}</span>
                <h3 className="font-bold text-lg text-gray-900">
                  {platform.name}
                </h3>
              </div>
              {platform.connected && (
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Connected
                </span>
              )}
            </div>

            {platform.connected ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Invested:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(platform.totalInvested)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(platform.currentValue)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Returns:</span>
                  <span className={`font-semibold ${platform.returns >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {platform.returns >= 0 ? '+' : ''}{formatCurrency(platform.returns)} 
                    ({platform.returnPercentage >= 0 ? '+' : ''}{platform.returnPercentage}%)
                  </span>
                </div>
                <div className="pt-2 mt-2 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Last synced: {new Date(platform.lastSync).toLocaleString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 text-sm mb-4">
                  Connect to track investments
                </p>
                <Button size="sm" fullWidth>
                  Connect Platform
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PlatformCards;