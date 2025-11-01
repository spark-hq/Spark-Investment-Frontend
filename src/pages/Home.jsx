import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-shadow">
            Smart Investment
            <span className="text-blue-600"> Calculator</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Plan your financial future with precision. Calculate SIP, Lumpsum, and Step-up investments with real-time projections and insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button size="lg" className="hover-lift">
                Start Calculating
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="hover-lift">
              Learn More
            </Button>
          </div>
        </div>

        {/* Hero Image/Illustration */}
        <div className="mt-16 relative animate-scaleIn">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-2xl p-8 text-white animate-gradient">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="animate-fadeIn">
                <div className="text-4xl mb-2">📈</div>
                <h3 className="text-2xl font-bold mb-2">Track Growth</h3>
                <p className="text-blue-100">Visualize your investment journey</p>
              </div>
              <div className="animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <div className="text-4xl mb-2">💰</div>
                <h3 className="text-2xl font-bold mb-2">Smart Planning</h3>
                <p className="text-blue-100">Calculate returns accurately</p>
              </div>
              <div className="animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="text-2xl font-bold mb-2">Reach Goals</h3>
                <p className="text-blue-100">Plan your financial milestones</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Spark Investment?
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to make informed investment decisions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-animation">
          <Card hover className="text-center animate-fadeIn hover-lift">
            <div className="text-5xl mb-4">🔄</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">SIP Calculator</h3>
            <p className="text-gray-600">
              Calculate your Systematic Investment Plan returns with monthly contributions and compound interest.
            </p>
          </Card>

          <Card hover className="text-center animate-fadeIn hover-lift">
            <div className="text-5xl mb-4">💵</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lumpsum Calculator</h3>
            <p className="text-gray-600">
              Evaluate one-time investment returns and see how your money grows over time.
            </p>
          </Card>

          <Card hover className="text-center animate-fadeIn hover-lift">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Step-up SIP</h3>
            <p className="text-gray-600">
              Plan investments with annual increments to match your growing income.
            </p>
          </Card>

          <Card hover className="text-center animate-fadeIn hover-lift">
            <div className="text-5xl mb-4">📈</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Visual Charts</h3>
            <p className="text-gray-600">
              Interactive charts and graphs to visualize your investment growth over time.
            </p>
          </Card>

          <Card hover className="text-center animate-fadeIn hover-lift">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Goal Tracking</h3>
            <p className="text-gray-600">
              Set financial goals and track your progress towards achieving them.
            </p>
          </Card>

          <Card hover className="text-center animate-fadeIn hover-lift">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">100% Secure</h3>
            <p className="text-gray-600">
              Your data is private and secure. All calculations happen locally.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fadeIn">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to calculate your investment returns
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 stagger-animation">
            <div className="text-center animate-fadeIn">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-lift">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose Type</h3>
              <p className="text-gray-600">Select SIP, Lumpsum, or Step-up SIP</p>
            </div>

            <div className="text-center animate-fadeIn">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-lift">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Enter Details</h3>
              <p className="text-gray-600">Input amount, duration, and expected returns</p>
            </div>

            <div className="text-center animate-fadeIn">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-lift">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Get Results</h3>
              <p className="text-gray-600">View detailed calculations instantly</p>
            </div>

            <div className="text-center animate-fadeIn">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 hover-lift">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Ahead</h3>
              <p className="text-gray-600">Make informed investment decisions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-12 text-white animate-scaleIn hover-lift">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-blue-100">Calculations Made</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">₹500Cr+</div>
              <p className="text-blue-100">Investment Planned</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <p className="text-blue-100">Happy Users</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-blue-100">Accurate Results</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="text-center bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 animate-fadeIn hover-lift">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Get started with our investment calculator and take control of your financial future today.
            </p>
            <Link to="/calculator">
              <Button size="lg" className="hover-lift">
                Calculate Now →
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;