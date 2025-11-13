# Spark Investment Frontend

A modern, AI-powered investment portfolio management platform built with React. Track investments across multiple Indian trading platforms, get AI-driven insights, and manage your portfolio with intelligent automation.

## Features

- **Unified Portfolio Dashboard** - Aggregate investments from Zerodha, Groww, Upstox, and Binance
- **AI-Powered Analysis** - Intelligent buy/sell recommendations with confidence scores
- **Live Market Data** - Real-time price updates and interactive charts
- **Auto-Invest Strategies** - AI-curated investment plans with backtesting
- **Multi-Platform Trading** - Execute trades across connected platforms
- **Transaction History** - Comprehensive transaction tracking and analytics
- **Investment Calculators** - SIP, Lumpsum, and Step-up SIP calculators

## Tech Stack

- **Frontend:** React 19, Vite 7
- **Routing:** React Router 7
- **Styling:** Tailwind CSS 3
- **Charts:** Recharts 3
- **Icons:** Lucide React
- **State Management:** React Query, Zustand
- **Real-time:** WebSocket (Socket.io client)

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/spark-hq/Spark-Investment-Frontend.git

# Navigate to project directory
cd Spark-Investment-Frontend

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── pages/              # Route-level components
│   ├── auth/           # Authentication pages (Login, Signup)
│   ├── legal/          # Legal pages (Terms, Privacy)
│   └── ...
├── components/         # Reusable UI components
│   ├── ai-analysis/    # AI insights components
│   ├── auto-invest/    # Automated investment features
│   ├── dashboard/      # Portfolio overview components
│   ├── investments/    # Investment tracking
│   ├── layout/         # Layout components (Navbar, Footer)
│   ├── live-trading/   # Real-time trading interface
│   ├── settings/       # User preferences
│   ├── trading/        # Trading components
│   ├── transactions/   # Transaction history
│   └── ui/             # Reusable UI components
├── data/               # Mock data and state
├── hooks/              # Custom React hooks
├── services/           # API and WebSocket services
├── store/              # Global state management
└── utils/              # Helper functions
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Mock mode (development without backend)
VITE_MOCK_MODE=true

# API Configuration
VITE_API_BASE_URL=http://localhost:5000/api

# Debug mode
VITE_DEBUG_MODE=false
```

## Features in Detail

### Dashboard
- Portfolio summary with total value and returns
- Performance charts (12-month historical data)
- Connected platforms status
- Asset allocation breakdown
- Recent transactions
- Quick actions

### AI Analysis
- Investment health scores
- Buy/Sell/Hold recommendations
- Risk assessment
- Target price predictions
- Sector analysis
- Benchmark comparisons

### Live Trading
- Real-time market data updates
- AI-powered trading signals
- Interactive price charts
- Order execution (Market & Limit orders)
- Position tracking
- Auto-trading settings

### Auto-Invest
- 4 AI-curated investment strategies
- Historical backtesting (5-year data)
- Performance metrics (CAGR, Sharpe ratio, drawdown)
- Strategy comparison tools
- Custom rule builder

### Accessibility
- WCAG 2.1 AA compliant
- Full keyboard navigation
- ARIA labels and roles
- Screen reader optimized
- High contrast mode support

## Development Status

- ✅ Core features implemented
- ✅ Authentication system
- ✅ Live trading interface
- ✅ AI analysis integration
- ✅ Accessibility improvements
- ✅ Mobile responsive design
- ⏳ Backend API integration (in progress)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Links

- [Documentation](./docs/)
- [Accessibility Guide](./ACCESSIBILITY.md)
- [Issues](https://github.com/spark-hq/Spark-Investment-Frontend/issues)
