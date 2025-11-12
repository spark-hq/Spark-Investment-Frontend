import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, lazy, Suspense } from "react";
import Layout from "./components/layout/Layout";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import NotificationSystem from "./components/ui/NotificationSystem";
import websocketService from "./services/websocket";
import "./App.css";

// Lazy load all page components for better code splitting
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Results = lazy(() => import("./pages/Results"));
const Investments = lazy(() => import("./pages/Investments"));
const AIAnalysis = lazy(() => import("./pages/AIAnalysis"));
const LiveTrading = lazy(() => import("./pages/LiveTrading"));
const Transactions = lazy(() => import("./pages/Transactions"));
const AutoInvest = lazy(() => import("./pages/AutoInvest"));
const Settings = lazy(() => import("./pages/Settings"));
const TermsOfService = lazy(() => import("./pages/legal/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
    <div className="text-center">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="text-lg font-semibold text-gray-700">Loading...</p>
      <p className="text-sm text-gray-500 mt-1">Please wait</p>
    </div>
  </div>
);

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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
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
