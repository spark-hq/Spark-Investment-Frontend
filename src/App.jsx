import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Calculator from './pages/Calculator';
import Results from './pages/Results';
import Investments from './pages/Investments';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
          <Route path="/investments" element={<Investments />} />
          
          {/* Placeholder routes for future pages */}
          <Route path="/ai-analysis" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-blue-600">AI Analysis Page</h1>
              <p className="mt-4 text-gray-600">Coming soon...</p>
            </div>
          } />
          
          <Route path="/transactions" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-blue-600">Transactions Page</h1>
              <p className="mt-4 text-gray-600">Coming soon...</p>
            </div>
          } />
          
          <Route path="/live-trading" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-blue-600">Live Trading Page</h1>
              <p className="mt-4 text-gray-600">Coming soon...</p>
            </div>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;