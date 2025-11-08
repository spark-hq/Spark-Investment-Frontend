import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
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
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import NotificationSystem from "./components/ui/NotificationSystem";
import websocketService from "./services/websocket";
import "./App.css";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 30000, // 30 seconds
    },
  },
});

function AppContent() {
  // Initialize WebSocket connection
  useEffect(() => {
    websocketService.connect();

    return () => {
      websocketService.disconnect();
    };
  }, []);

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

          {/* Legal Pages */}
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <NotificationSystem />
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
