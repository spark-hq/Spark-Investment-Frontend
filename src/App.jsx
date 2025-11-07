import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Calculator from "./pages/Calculator";
import Results from "./pages/Results";
import Investments from "./pages/Investments";
import AIAnalysis from "./pages/AIAnalysis";
import LiveTrading from "./pages/LiveTrading";
import Transactions from "./pages/Transactions";
import AutoInvest from "./pages/AutoInvest";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import "./App.css";
function App() {
  return (
    <Router basename="/Spark-Investment-Frontend">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
          <Route path="/live-trading" element={<LiveTrading />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/auto-invest" element={<AutoInvest />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
